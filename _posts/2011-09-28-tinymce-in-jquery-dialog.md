---
layout: post
title: TinyMCE in jQuery Dialog
---

I've been using TinyMCE lately as a WYSIWYG HTML editor and so far do not have any complaints. I did encounter an interesting problem the other day though that I was able to get resolved with the bit of code I'll include here. I hope it helps you out.

The problem was simple, I wanted to render the contents of a view through an AJAX call into a JQuery Dialog. This was necessary because the view I wanted to load might change based on the specific type of item I was displaying the form for, and I didn't want to handle all those conditional checks on the client-side so that I wouldn't overwhelm my user with unnecessary form fields. The challenge was that in certain cases I wanted the TinyMCE editor to display. The issue I encountered was that the textarea wasn't being TinyMCE'ified when the $.load() completed. The following bit of code should illustrate a way to get around this.

{% highlight javascript %}
function doTextEditor(contentType) {
  $('<div />').dialog({ width: 700, height: 300, modal: true }).load('/moduleinstance/createcontent', { contentType: contentType }, function () {
    tinyMCE.init({
      mode: 'none',
      theme: 'advanced',
      height: 300,
      width: 700,
      theme_advanced_buttons1: 'forecolor, |, justifyleft, justifyright, justifycenter, justifyfull, |, bold, italic, underline, |, bullist, numlist, |, code',
      theme_advanced_buttons2: '',
      theme_advanced_buttons3: '',
      plugins: 'paste'
    });

    tinyMCE.execCommand('mceAddControl', true, 'TextContent');
  });
}
{% endhighlight %}