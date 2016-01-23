---
layout: post
title: "Code Meaningfully"
summary: "Code really shouldn't be hard to understand. If yours is then I suggest you are doing something wrong!"
showImage: true
image: "/public/post_images/code-meaningfully.png"
imageStyle: "width: 50%;"
---

I see a lot of code like this.

{% highlight csharp %}
var p = repo.GetBy(personId);

if (p.Children.Count > 0 && p.Children.Where(c => c.Children.Count() > 0).Count() > 0)
{
    return "somebody old";
}
else
{
    return "maybe old, but maybe no kids";
}
{% endhighlight %}

What does this code do? Maybe in this case it jumps right out at you and you say "Oh! They are trying to find out if this person has any grandchildren" and that would be right. But there are problems with this code.

- What happens if your logic is more complex?
- What if you need to run this logic other places in your code?
- It took you some time to look over the code to find out exactly what it was doing, right?
- What happens if you were to change what it means to "have grandchildren"?

### Add Meaning

We can make this code much more readable, meaningful, and flexible, with a very simple refactor. Start by doing this.

{% highlight csharp %}
var p = repo.GetBy(personId);

if (p.HasGrandchildren())
{
    return "somebody old";
}
else
{
    return "maybe old, but maybe no kids";
}
{% endhighlight %}

And then push that logical check into *IsGrandparent()* off of *Person*.

{% highlight csharp %}
public bool HasGrandchildren()
{
    return this.Children.Count > 0 && this.Children.Where(c => c.Children.Count() > 0).Count() > 0;
}
{% endhighlight %}

Now we've taken what it means to have grandchildren and encapsulated it in a single function. So if we were to ever change this logic we only have to do so in one place. Not repeating yourself is great, especially in code, but there is another benefit.

### Code Readability

Unless we are working on a personal project that nobody else will ever use or modify we are sharing the source code with those we are working with today, and those who will come after us. Take some time when you write your code and make sure your code is readable. Everyone will benefit from the extra bit of effort.
