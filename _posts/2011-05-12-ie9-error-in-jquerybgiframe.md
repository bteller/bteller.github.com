---
layout: post
title: "IE9 Error in jquery.bgiFrame"
exclude: true
---

I just ran into a problem with the jQuery extension for .bgiFrame() where IE9 throws an error at this code block.

{% highlight javascript %}
return this.each(function () {
  if ($('> iframe.bgiframe', this).length == 0)
    this.insertBefore(document.createElement(html), this.firstChild);
});
{% endhighlight %}

To get around this, and this is a bit of a hack, at the top of the function I added the following, which gets the heck out of there for IE9.

{% highlight javascript %}
if ($.browser.msie && $.browser.version == "9.0") { return; }
{% endhighlight %}