---
layout: post
title: "ASP.Net MVC Client Validation Woes"
---

I've posted in the past about problems with MVC validation and how it all works in Microsoft land when using data annotations and the like. Here are the past posts if you are interested, as uninformative as they might be.

- [Unobtrusive validation issue with MVC 3](http://blog.bradley-teller.me/2011/04/08/unobtrusive-validation-issue-with-mvc-3/)
- [jQuery UI Validation Summary](http://blog.bradley-teller.me/2010/05/11/jquery-ui-validation-summary/)
- [ASP.Net MVC 2 Client-Side Validation with JQuery Error](http://blog.bradley-teller.me/2011/01/12/asp-net-mvc-2-client-side-validation-with-jquery-error/)

So I was trying to do something similar to the JQuery UI validation summary with an extension method and started getting pissed off that things are so difficult. So I'm giving up for now in favor of a different approach.

Rather than fight the machine I thought I'd work around it. My goal, to get my validation summary to use the formatting from Twitter Bootstrap. The solution, pretty simple actually. Just add this bit of javascript in your some global.js or init.js type file, and link it up in your layout page.

``` js
$('.validation-summary-valid, .validation-summary-errors')
    .addClass('alert alert-error')
    .prepend('<p><strong>Validation Exceptions:</strong></p>');
```

And you also need to add some show/hide styles to your stylesheet. If you don't that thing will start showing up before you want it to.

``` css
.validation-summary-valid { display: none; }
.validation-summary-errors { display: block; }
```

Now, without having to do anything out of the ordinary you can have a from with an Html.ValidationSummary() inside of it, and when there are errors in the ModelState, or client validation violations you'll see something like this here.

> Sorry, I misplaced this image. I am trying to recover it.

Now we've got our validation errors displaying in a Twitter Bootstrap formatted alert container. To me this approach is much simpler than messing with the .js files provided by Microsoft.