---
layout: post
title: Start Planning for Responsive Design, NOW!
---

Even if you aren't ready to jump in with both feet today, you should already be thinking about responsive design. At this point, despite the responsive versus adaptive design debate, it looks like this is indeed the future of the web. If you do try and wait until later, you'll end up with a lot of extra work that you could have easily avoided.

So, how does one go about applying responsive design techniques when working on a not-yet-responsive site?

## Never Use Inline Styles

This one should really go with out saying by now, but I'm saying it again, just in case. * Never use inline styles*. If you do use them today, you will end up having `!important` all over your style sheets when it comes time to make your site more responsive, and that is a bad practice by itself. 

## Use Percentages

This is an easy one that will help you immensely down the road. If you have a simple page.

```html
<html>
  <body>
    <div class="container">
      <div id="header">
        <div id="column-1">My Wonderful Site</div>
        <div id="column-2">Links Here</div>
        <div id="column-3">Welcome to You!</div>
      </div>
      <div id="content">
        And here is all my wonderful content.
      </div>
    </div>
  </body>
</html>
```

And a basic stylesheet that looks something like this.

```css
#container {
  width: 1000px;
  margin: 0 auto;
}

#column-1,
#column-3 {
  width: 200px;
}

#column-2 {
  width: 600px;
}
```

You end up with what you need, but lose flexibilty when you make this responsive later on. What you want instead is a stylesheet more like this.

```css
#container {
  width: 1000px;
  margin: 0 auto;
}

#column-1,
#column-3 {
  width: 20%;
}

#column-2 {
  width: 60%;
}
```

Now you have a fixed width parent container, but everything inside is percentage based. These percentages are easy to calculate though, and will look exactly the same the fixed width design.

## Use a Grid
This is an opinionated topic, but I think you will likely benefit from using a CSS Grid framework. You don't need Twitter Bootstrap necessarily, but perhaps something like Skeleton, which is much ligther weight than Twitter Bootstrap, will meet your needs. There is of course always "roll your own" option.

Regardless of which path you choose, you will want to make sure that your grid is something you must *explicitly* opt into. This is because most grid frameworks make use of `box-sizing` to help deal with odd behaviors of the CSS box model. The important ways this differs from traditional rendering is that borders and paddings are now considered as part of the width and height of the element.

Consider this wildcard application of the technique. 

```css
* {
  box-sizing: border-box;
}
```

The above rule has now been applied to all your elements, which means many bits of your page have shifted about, making things look a little nasty. Instead of applying this as a global wildcard, you can change this in one simple way to make it possible to opt into this behavior.

```css
.responsive * {
  box-sizing: border-box;
}
```

Now you've removed the global wildcard and you don't have to worry about things moving around your page until you actually start making a region more responsive. This allows you to very gradually move towards a more responsive design.

```html
<div class="responsive">
  <div class="col-xs-12">
    Your content here.
  </div>
</div>
```

### A Word of Warning
I want to share one final word of warning before you make the decision to use a framework. Generally speaking, even with a framework as light weight as Skeleton, you get more than just a grid. With the grid you also get opinionated styling of your buttons, forms, tables and typography. You probably don't want this, so just make sure and delete anything undesirable from the framework, or use this as an excuse to roll your own.