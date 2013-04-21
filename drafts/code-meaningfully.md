---
layout: post
title: "Code Meaningfully"
summary: "Code really shouldn't be hard to understand. If yours is then I suggest you are doing something wrong!"
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

Now we've taken what it means to be a grandparent and encapsulated it in a single function. So now if we were to ever change what the criteria for being a grandparent are, we only have to modify this in one place. 
