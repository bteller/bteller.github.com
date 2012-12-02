---
layout: post
title: "Caching Part 2: Nulls and Expiration"
summary: "The next part in a mini-series of posts about caching in .Net. This time we'll be looking at how to handle null values in cache as well as make it possible to set custom expiration times for items in cache."
---

One of the problems with the [previous caching sample code](/2012/10/18/really-simple-caching) I posted is that it doesn't handle null results very well. If were to query a list and nothing was returned then we'd store null in the cache, which is fine, but the problem arises when we try and pull it back out of the cache. When we do this the value is still null, as it should be, but then we check to see if it is null before deciding if we should query the database again. This means that every request will hit the database, even though we really should already know at this point that nothing of interest is in there.

## Allowing for Nulls

To get around this limitation we could just check for the existence of the cache key in cache. Building on the LazyCache object from our previous example we'd just add in functionality that checks for the existence of the cache key.

{% highlight csharp %}
public static bool IsInCache(string key)
{
    return _cache.ContainsKey(key);
}
{% endhighlight %}

And then we'd modify the construct responsible for our query to utilize this new function to decide if we need to query the database again.

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

But this isn't perfect. The problem with this approach is that it doesn't allow us to set any cache expirations, and that is something any caching system should allow for. To get around this, instead of directly caching the result of the query we should really be storing a special cache object. We don't need all that functionality just yet though, so for now let's just keep it simple.

{% highlight csharp %}
public class LazyCacheItem
{
    public object Value { get; set; }
}
{% endhighlight %}

Now we can update LazyCache to use it.

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
        var cacheItem = new LazyCacheItem() { Value = value };
        _cache.Add(key, cacheItem);
    }

    public static T Retrieve<T>(string key)
    {
        return (T)((LazyCacheItem)_cache[key]).Value;
    }

    public static bool IsInCache(string key)
    {
        return _cache.ContainsKey(key);
    }
}
{% endhighlight %}

Now that by itself really isn't all that interesting. We could have just implemented .IsInCache() and we'd be all set. Where this really provides value is where cache expiration is concerned.

## Cache Expiration

Our caching strategy so far probably isn't all that effective. So far we've been setting things in cache and allowing them to live for as long as our application remains in memory. But what happens when our application lives for a very long time? We'd never update our cache, so if anything new was entered into the database, our application wouldn't become aware of it until we restarted it, which isn't very handy at all!

So let's modify the LazyCacheItem so we can set a cache expiration on things going into the cache.

{% highlight csharp %}
public class LazyCacheItem
{
    private DateTime _setInCacheAt;
    private TimeSpan? _ttl;

    public object Value { get; private set; }

    public LazyCacheItem(object value, TimeSpan? ttl)
    {
        this.Value = value;
        _setInCacheAt = DateTime.Now;
        _ttl = ttl;
    }

    public bool IsFresh()
    {
        if (_ttl == null) return true;
        return DateTime.Now - _setInCacheAt <= _ttl;
    }
}
{% endhighlight %}

Now we've got something we can work with. Notice that I've made the TTL value nullable, which we'll use to allow us to store something in cache that doesn't ever expire (by checking to see if this value is null).

We've got to modify LazyCache again to consume the new functionality.

{% highlight csharp %}
public class LazyCache
{
    private static Hashtable _cache;

    static LazyCache()
    {
        _cache = new Hashtable();
    }

    public static void Set<T>(string key, T value, TimeSpan? ttl)
    {
        var cacheItem = new LazyCacheItem(value, ttl);
        _cache.Add(key, cacheItem);
    }

    public static T Retrieve<T>(string key)
    {
        var item = (LazyCacheItem)_cache[key];
        return (T)item.Value;
    }

    public static bool IsInCache(string key)
    {
        return _cache.ContainsKey(key) && 
            ((LazyCacheItem)_cache[key]).IsFresh();
    }
}
{% endhighlight %}

Then we'll just make a quick change to one of the consumers of our cache like so.

{% highlight csharp %}
public static List<Hoozy> GetAll()
{
    if (!LazyCache.IsInCache("hoozies"))
    {
        LazyCache.Set<List<Hoozy>>("hoozies", FakeDatabase.Hoozies, null);
    }

    return LazyCache.Retrieve<List<Hoozy>>("hoozies");
}
{% endhighlight %}

I'm passing in a null TTL value here, but you could pass in whatever expiration you like and LazyCache will honor it. And that's about it! We've extended our simple cache example so that it now allows expiration of items in the cache and allows for null values so we can reduce that extra noise.

> The updated code is out on <a href="https://github.com/bteller/nestedcache" target="_blank">GitHub</a>.