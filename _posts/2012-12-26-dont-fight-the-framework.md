---
layout: post
title: "Don't Fight the Framework"
summary: "I've been doing it, and I'm not really proud of it. In this post I share some of my thoughts on why you shouldn't fight the framework machine."
---

> This is a little less organized than I would like, but I believe the brain dump is worthwhile.

In general I believe there are two types of people out there, those that embrace a framework, and those that fight against it. I've generally found myself in the fight against it camp. This post is about my never ending battle with the ASP.NET MVC framework in particular, what led up to it, and the events leading up to my final capitulation. 

## Why Fight?

These are a few of the reasons why I've generally fought against the framework:

- I jump around a lot between ASP.NET MVC, Express with Node.js and Ruby on Rails, and I'd like to reuse as much code as possible and follow consistent patterns.
- I might also decide to port my website or application over to one of these other frameworks part way through a project, and if that happens I want to rewrite as little as possible.
- I don't always care for the out of the box rendering or syntax.
- Isn't it always better to roll your own?

#### Form Elements

What is with the form sytax? Why are there div tags floating around all over the place? Why do we insist on displaying validation error messages inline with the form element instead of in a summary? 

This is an example of the output you might get by using `Html.EditorForModel()`.

{% highlight html %}
<form>
  <div class="editor-label">
    <label for="Name">Name</label>
  </div>
  <div class="editor-field">
    <input class="text-box single-line" id="Name" name="Name" type="text" value=""> 
  </div>

  <input type="submit" value="login">
</form>
{% endhighlight %}

What is the purpose of all these div's? Wouldn't it be better to customize standard HTML elements instead of having all these classes all over the place? I would personally rather layout my form like this instead of living in the div hell generated when you use `Html.EditorForModel()`. 

{% highlight html %}
<form>
  <fieldset>
    <p>
      <label>Name:</label>
      <input type="text" name="name" />
    </p>
    <p>
      <input type="submit" value="Save" />
    </p>
  </fieldset>
</form>
{% endhighlight %}

#### Summary

Some of these arguments may be valid, but more so when you are working on a project by yourself. They fall apart when you start working as part of a larger team though.

## Why Give In?

Yep, there are reasons why you shouldn't fight the framework as you might have guessed! Here are just a few:

- It is already written for you, so why not take advantage of it.
- Good, bad, or indifferent, at least it is consistent. 
- You can extend the framework in subtle ways without having to completely fight against it.

#### Consistency

Consistency is pretty key here. What happens when you are bringing new people into a project? Chances are they'll have experience with the standard features of the framework, but if you've deviated from these core standards and rolled your own functionality in many places then you hinder their ability to jump into a project and provide immediate value. Instead of hitting the ground running they end up having to learn "your way" of doing things.

To that end it is much easier to set certain standards within your organization on what you'll use and when you'll use it than to roll your own mini-framework on top of the framework.

#### Extension

I've written a great many extension methods in the past, particularly to extend HtmlHelper. Through the use of extension methods we can provide slight customizations without completely rocking the boat.

## Conclusion

While I sometimes still feel that I'd like to be more of a purist and hand-roll many of these things myself, at the end of the day I no longer feel it a worthwhile endeavor. Just make sure, as I will, that you standardize on the things that make sense to you. You might share my aversion to `Html.EditorForModel()`, but that doesn't mean you should turn your back on helper methods like `Html.BeginForm()` and `Html.TextBoxFor()`. 