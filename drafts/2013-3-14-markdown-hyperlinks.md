---
layout: post
title: Markdown Hyperlink Targets
---

With Markdown the syntax for a hyperlink looks like this:

```[Link Text](http://gotohere.com)```

It doesn't give you a way of specifying a target. To do that you'd have to introduce HTML markup into your Markdown, which looks a bit "messy", and involves more typing than I'd like.

A quick and easy way around this limitation, which works for me and may work for you, is bit of jQuery.

{% highlight javascript %}
$(function() {
  $('a').attr('target', '_blank');
});
{% endhighlight %}

, and the alternative would be to 