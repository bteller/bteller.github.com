---
layout: post
title: Markdown Hyperlink Targets
summary: "A quick alternative to messy hyperlinks in markdown."
exclude: true
published: false
---

With Markdown the syntax for a hyperlink looks like this:

{% highlight html %}
[Link Text](http://gotohere.com) 
{% endhighlight %}

It doesn't give you a way of specifying a target. To do that you'd have to introduce HTML markup into your Markdown, which looks a bit "messy", and involves more typing than I'd like.

A quick and easy way around this limitation, which works for me and may work for you, is bit of jQuery.

{% highlight javascript %}
$(function() {
  $('a', 'div.post-wrapper').attr('target', '_blank');
});
{% endhighlight %}

Now I don't have to remember to specify a target and I don't have to mix markup (not for this case anyway).