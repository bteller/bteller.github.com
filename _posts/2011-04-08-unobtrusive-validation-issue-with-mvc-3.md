---
layout: post
title: Unobtrusive Validation Issue with MVC 3
---

I've been using data annotations in conjunction with unobtrusive validation lately and really loving it. The other day I ran into a problem with it though, so I'll give you a quick work around in case you run into it yourselves. What I wanted to do was manually specify validation rules using $(element).validate(), since I didn't have an actual object I'd be binding to. I could have just created the model, specified the annotations, and I would have been good to go, but this site I was working on has these manual validations specified all over the place, so taking the "easy" way out wasn't an option. So here is what I did.

The problem is with the way Microsoft's validation library works on the client side, if you have the .js files to support this linked in via your master page, as well you probably should, they don't care that for a particular form you haven't enabled client validation using unobtrusive javascript, but instead it tries to wire itself up to every form it finds.

The solution was to modify the "parse" function of the jquery.validate.unobtrusive.js file, and add the line below as the first call. With this call in place, if you have forms you want to handle validation manually, you can just add a class of "ms-ignore" to them, and then everything will work as it used to.

{% highlight javascript %}
if($(this).hasClass('ms-ignore')) { return; }
{% endhighlight %}

The solution feels a little "hacky" to me, but I feel that way most of the time I'm working with some of the newer Microsoft technologies. I'm a huge fan of MVC, and I love the data annotation validations, but even the MVC 2 bolt ons required work arounds to get the correct behavior.