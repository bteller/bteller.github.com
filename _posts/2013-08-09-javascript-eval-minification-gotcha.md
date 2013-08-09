---
layout: post
title: "A javascript eval gotcha when minifying javascript"
summary: "Here is a quick tip to work around a common issue."
---

Minifying your stylesheet and javascript assets for your site is a great idea, and something that nobody should likely not look into for speeding up their website. It brings with it a few challenges though, one of those being the use of *eval* in javascript.

If you have a code block like this that simply executes another function and passes in an argument to it.

{% highlight js %}
function runIIt(functionName, param) {
	eval(functionName + '(param)');
}
{% endhighlight %}

Provided minification isn't in place this will work just fine. But, as soon as you do minify this things will suddenly stop working. The reason for this is that minification tools are actually going through and shortening your variable and parameter names; which means you can't relay on *param* being the same. Luckily though the solution is quite simple because javascript provides us with an *arguments* array. 

{% highlight js %}
function runIIt(functionName, param) {
	eval(functionName + '(arguments[1])');
}
{% endhighlight %}

While I have seen so called safe modes built into minifiers that will try and address this problem I suggest this is a better pattern to follow, and not just because you've decided to minify your assets. Do yourself a favor and just make this a standard.