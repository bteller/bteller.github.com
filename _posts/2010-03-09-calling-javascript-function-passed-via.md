---
layout: post
title: "Calling JavaScript Function Passed via JSON"
---

I've had to spend a bit more time with javascript lately than I have in the past, and one of the things I found myself trying to accomplish was to call a javascript function passed into another javascript function via json.

As it turns out, this is very simple to do, as you can see from the example below.

{% highlight javascript %}
$(document).ready(function() {
    doPass();
});
 
function doPass() {
    takePass({
        onSuccess: function() { alert('i did it'); },
        onFailure: function() { alert('i messed it up'); }
    });
}
 
function takePass(o) {
    var i = true
 
    if (i) {
        o.onSuccess();
    }
    else {
        o.onFailure();
    }
}
{% endhighlight %}