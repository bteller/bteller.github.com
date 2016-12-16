---
layout: post
title: Numbers Only Please
exclude: true
published: false
---

A few weeks ago now, I had to limit the characters entered into a textbox on a site to numeric characters only. This was simple enough I thought, and figured that I’d be able to Google the requirement and find a solution rather quickly, but this proved not to be the case. What I ended up using is this code snippet below, which I hope you find helpful.

``` js
function numericOnly() {
 
    // deal with unicode character sets
    var unicode = event.charCode ? event.charCode : event.keyCode;
 
    // if the key is backspace, tab, or numeric
    if (unicode == 8 || unicode == 9 || (unicode >= 48 && unicode <= 57)) {
        // we allow the key press
        return true;
    }
    else {
        // otherwise we don't
        return false;
    }
}
```