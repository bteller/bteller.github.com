---
layout: post
title: Node.js Express Helpers
---

What the hell Node.js community? I'm trying to create a simple helper to format data before rendering it out and I can't find a single example of how to accomplish this?

And here I thought there were problem in the .Net community. <<**sigh**>>

Okay, so my goal was to create a helper that would take a Date and write it out in the format of MM/DD/YYYY. Maybe there is something out there in JS land that already does this, but that is rather beside the point. The point here is that it was painful as hell to find out how to create a helper method for Express. The documentation I did find was from [DailyJS](http://dailyjs.com/2011/01/03/node-tutorial-8/), but that didn't work for me, although I'll say that there is a lot of great information in that series of posts. The other article I found that eluded to a solution was [here](http://nicolahibbert.com/migrating-to-expressjs-v3/) but alas again, no dice. It did point me to the Express migration from 2.x to 3.x [page on GitHub](https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x) but that again wasn
t very helpful. The only indication there was that app.dynamicHelpers has been removed, not deprecated but removed, and that I should use app.locals instead. Where are the examples? They have some example applications out there in their GitHub repo but I didn't find anything in there that resembled what I was trying to do. 

In the end I was able to get something to work. I arrived at this solution through trial and error and have no idea if this was the intended method for defining helpers, but based on how I understand the limited documentation that does exist I believe it is. So, this is how I defined my helper. As it turns out this appears to be the exact same format as when you were setting up dynamic helpers for Express.

{% highlight javascript %}
exports.helpers = {
  stringifyDate: function(d) {
    if (typeof d === "object" && d) {
      var result = "";

      result += d.getMonth() + 1 + "/";
      result += d.getDate() + "/";
      result += d.getFullYear();

      return result;
    }

    return "";    
  }
};
{% endhighlight %}

And this is the code to register the helper methods from my helpers.js file.

{% highlight javascript %}
app.locals = require('./helpers.js').helpers;
{% endhighlight %}

Now just in case you have the same thought I did, it does not seem to be possible to register helpers from an additional file in this manner, which means all your helpers must be contained in a single file. Please let me know if I am mistaken about that.