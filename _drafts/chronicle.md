---
layout: post
title: Chronicle
---

For a while now I've wanted living requirements for our code base at work, and over the years we've tried a few different ways to achieve this. None of these have proven effective though. An idea I kind of liked is what [Storyteller](http://storyteller.github.io/) does, where you have a web interface to define your requirements, and that documentation grows whenever you add tests. What I don't like about this approach, is that you have to stub out your unit tests in such a way so that you can then use the interface to define the data under test. That feels wrong to me. What I would rather have is a set of tests, and have some system within the tests be responsible for updating the documentation. In this way we maintain everything in our unit test project, and simply output our documentation to a website that anyone can view. 

## Enter Chronicle

The concept here is simple. I want a webapp that has an API I can push requirements into. Each of these requirements will contain the following data:

- Name of the site
- Functional area of the site being tested
- Name of the test
- Description of what is being tested (the requirement)
- Did the test pass or not (sugar)

At work we've been using NUnit, so I can take advantage of that test framework to gather and push this data to Chronicle. First, we need a few attributes. These attributes are generic and could be used with any test framework.

The area attribute will cover the page name, but this could just as easily be some global construct, like a shared header or footer across the site. 

```csharp
public class ChronicleAreaAttribute : Attribute
{
    public string Area { get; private set; }

    public ChronicleAreaAttribute(string area)
    {
        Area = area;
    }
}
```

Now we need a way to define what is being tested, the requirement. 

```csharp
public class ChronicleDescriptionAttribute : Attribute
{
    public string Description { get; private set; }

    public ChronicleDescriptionAttribute(string description)
    {
        Description = description;
    }
}
```

Then we need a way to send this data to our API, so we'll write a quick static class and member to pull that off.

```csharp
public static class Chronicler
{
    public static void Chronicle(string site, string area, string testName, string description, bool passed)
    {
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri("http://localhost:8971/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var data = Newtonsoft.Json.JsonConvert.SerializeObject(new
            {
                siteName = site,
                areaName = area,
                testname = testName,
                description = description,
                passed = passed
            });
            var response = client.PostAsync("api/chronicle", new StringContent(data, Encoding.UTF8, "application/json")).Result;
        }
    }
}
```

With those things in place we get into some of the more NUnit specific coding bits, but you could easily learn from this code and write something that works with XUnit, MSTest, Fixie, or whatever your test framework of choice is. 

```csharp
public class TestBase
{
    private TestContext fixtureContext;
    public TestBase(string siteCode)
    {
        fixtureContext = TestContext.CurrentContext;
        fixtureContext.Test.Properties.Add("SiteCode", siteCode);
    }

    [TearDown]
    public void Down()
    {
        var context = TestContext.CurrentContext;
        var type = Type.GetType(context.Test.ClassName);
        var area = type.GetCustomAttributes(false).OfType<ChronicleAreaAttribute>().First().Area;
        var roughDescription = type.GetMethod(context.Test.MethodName).GetCustomAttributes(false).OfType<ChronicleDescriptionAttribute>().First().Description;
        var description = Regex.Replace(roughDescription.Replace(System.Environment.NewLine, ""), @"( )\1+", "$1");
        var arguments = new List<string>();
        var name = context.Test.Name;
        var index = context.Test.Name.IndexOf('(');

        if (index > -1)
        {
            var simpleName = name.Substring(index + 1, name.Length - index - 2).Replace("\"", "");
            arguments.AddRange(simpleName.Split(','));
        }

        var site = arguments[0].ToString();
        var logDescription = string.Format(description, arguments.ToArray());

        Chronicler.Chronicle(site, area, context.Test.MethodName, logDescription, context.Result.Outcome == ResultState.Success);
    }
}
```

That code might be a little confusing, but if you now take a look at the TestFixture, I think you'll see why.

```csharp
[ChronicleArea("Another Page")]
public class AnotherOne : TestBase
{
    public AnotherOne(string siteCode) : base(siteCode)
    {

    }

    [TestCase("My Site", "/somewhere.aspx")]
    [ChronicleDescription("Does something with another one.")]
    public void SomethingElse(string siteCode, string url)
    {
        Assert.IsTrue(false);
    }

    [TestCase("My Site", "/somewhere.aspx")]
    [ChronicleDescription("Navigate to URL {1} and then do something with another one.")]
    public void AnotherSomethingElse(string siteCode, string url)
    {
        Assert.IsTrue(false);
    }
}
```

If you are following this, I've got a page named "Another Page" that I'm testing. 

