---
layout: post
title: Twitter Bootstrap Tags
summary: "I'm definitely a fan of using Twitter Bootstrap to quickly scaffold together a UI. The current project I'm working on calls for a tagging system though, and I couldn't readily find anything out there to provide that functionality to me for Twitter Bootstrap, so I wrote a quick plugin for it myself."
---

I'm definitely a fan of using Twitter Bootstrap to quickly scaffold together a UI. The current project I'm working on calls for a tagging system though, and I couldn't readily find anything out there to provide that functionality to me for Twitter Bootstrap, so I wrote a quick plugin for it myself.

## Overview

While probably not all that fancy, I'm sure you can find ways to put some lipstick on this pig. If not then it will look a little something like this below. You can take a look at an [usable example](/demos/bootstrap-tags/index.html) as well if you like.

![tag example](/assets/images/posts/tags.png)

And using it couldn't be easier to use. Add references to Twitter Bootstrap and jQuery, and then in the markup for your page just drop in the following.

{% highlight html %}
<div id="example" class="tag"></div>
{% endhighlight %}

The plugin will automatically set itself up anywhere you have a div with a class of tag. Once it is on the page just click inside of it and start typing. These are the only rules.

- New tags will be created when you press ENTER or COMMA on the keyboard.
- Tags that are already in the list will not be added again.
- Pressing the BACKSPACE key while in the tag entry text box will remove the previous tag if the text box does not contain any text.
- Clicking on the "X" next to existing tags will remove them.

## Some Specifics

It's a short little plugin so you can probably glean what you need from the source itself, but just in case here are the highlights.

If you want to add a tag through javascript you would to this.

{% highlight javascript %}
$('#example').tag('addtag', 'add this tag');
{% endhighlight %}

You can also add a bunch of tags at once if you've got them in an array like so.

{% highlight javascript %}
var tags = ['happy', 'flippin', 'holiday'];
$('#example').tag('addtags', tags);
{% endhighlight %}

You can get back an array of tags currently in the list by running this.

{% highlight javascript %}
var tags = $('#example').tag('gettags');
{% endhighlight %}

And the other thing you could do is check to see if the list of tags already has a particular tag in it.

{% highlight javascript %}
var isItInThere = $('#example').tag('contains', 'hooray');
{% endhighlight %}

I designed this more with ajax in mind than anything else, so in general you'd just call into `gettags`, but you should be able to do something like this to intercept the post. 

{% highlight javascript %}
$(function() {
  $('#save').submit(function() {
    $('#ttt').val($('#example').tag('gettags').toString());
  });
});
{% endhighlight %}

## The Source

You can find the source code, as usual, up on [GitHub](https://github.com/bteller/bootstrap-tag). Please feel free to issue a pull request if you want to add in some functionality.