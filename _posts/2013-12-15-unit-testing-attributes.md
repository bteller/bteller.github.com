---
layout: post
title: "Unit testing attributes is easier than I thought"
summary: "One of the problems I have with attributes is the fact that they aren't easily unit testable. That is what I thought anyway, until now. It turns out this is very far from the truth."
---

I've been struggling with the unit testability of attributes for a while, and have wanted to abandon their use completely. The problem with that is, I'm working with ASP.Net MVC, and it can make pretty heavy, but effective, use of attributes. 

Take a simple attribute like this one.

{% highlight csharp %}
public class CheckAttribute : Attribute
{
  public bool CheckIt { get; set; }

  public CheckAttribute(bool checkIt = true)
  {
    this.CheckIt = checkIt;
  }
}
{% endhighlight %}

I want to use it to trigger some other operation to run later, like to enforce the value of the property is unique before inserting it into the database.

{% highlight csharp %}
public class Person
{
  [Check]
  public string Name { get; set; }

  [Check(false)]
  public string Kind { get; set; }
}
{% endhighlight %}

Testing this can actually be pretty simple. Instead of unit testing the expected behavior, just verify the attribute appears in code where you expect it to with a test like the one below.

{% highlight csharp %}
[TestMethod]
public void Person_WhenValidated_ChecksIt()
{
  var p = new Person();
  var c = (CheckAttribute) p.GetType().GetProperty("Name").GetCustomAttributes(typeof(CheckAttribute), false)[0];

  Assert.IsTrue(c.CheckIt);
}
{% endhighlight %}

The actual enforcement of the underlying business rule would be covered by one or more tests that verify the code that actually enforces this rule. All we really care about here is that the attribute appears where we expect it to.

I had thought this was an original idea of my own, but ended up finding something very similar in a post by [Brad Wilson](http://bradwilson.typepad.com/blog/2009/04/dataannotations-and-aspnet-mvc.html). 