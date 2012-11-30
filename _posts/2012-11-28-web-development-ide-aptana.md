---
layout: post
title: Web Development IDE, Aptana
category : lessons
tags : [intro, beginner, jekyll, tutorial]
published: false
---

Last night I was looking once again into why I had abandoned my efforts to learn Ruby on Rails and began picking up the materials again. When I had been looking into it before, I had downloaded a few development tools to use, one of those being RadRails from Aptana. At the same time I've been making some modifications to my existing website which is presently just a small collection of html pages, so I thought I would try using Aptana for that rather than Visual Studio or just a simple text editor, and as it turns out, so far I am really enjoying it.

If you haven't already checked out Aptana's IDE, it is worth a look.

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}

## And this would be other text.

{% highlight csharp %}
public static List<Hoozy> GetAll()
{
    var result = LazyCache.Retrieve<List<Hoozy>>("hoozies");

    if (!LazyCache.IsInCache("hoozies"))
    {
        result = FakeDatabase.Hoozies;
        LazyCache.Set("hoozies", result);
    }
    
    return result;
}
{% endhighlight %}

> And this would be a block