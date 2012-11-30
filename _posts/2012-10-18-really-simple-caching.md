---
layout: post
title: Really Simple Caching
category : lessons
published: true
---

Caching is one of those fundamental best practices that any software developer should be aware of. There are plenty of options out there where caching is concerned including Redis and Memcached, just look at [Nuget](http://nuget.org/packages?q=cache). What I wanted to point out though is just how simple this code can be.

{% highlight csharp %}
public class LazyCache
{
    private static Hashtable _cache;

    static LazyCache()
    {
        _cache = new Hashtable();
    }

    public static void Set(string key, object value)
    {
        _cache.Add(key, value);
    }

    public static T Retrieve<T>(string key)
    {
        return (T)_cache[key];
    }
}
{% endhighlight %}

This is very simplistic but will provide you with an in-memory cache to decrease load on your database. You can then work with this really simple cache very simply like so.

{% highlight csharp %}
public static List<Hoozy> GetAll()
{
    var result = LazyCache.Retrieve<List<Hoozy>>("hoozies");

    if (result == null)
    {
        result = FakeDatabase.Hoozies;
        LazyCache.Set("hoozies", result);
    }

    return result;
}
{% endhighlight %}