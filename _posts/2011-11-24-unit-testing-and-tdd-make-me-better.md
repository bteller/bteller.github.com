---
layout: post
title: Unit Testing and TDD Make Me Better
---

That's right, and here I'll tell you why I'm saying this.

Yesterday I went through a massive refactoring of code and came out very concerned about the changes I made. To be perfectly honest it was a 4 or 5 hour hack fest, during which I slashed code in places, factored out interfaces, created extension methods in an effort to have very simple domain objects, and on and on. Then I removed my hands from the keyboard, wiped the sweat from my brow, and then began to panic. I started the project very strong in my convictions; the code was a mess and it needed to be corrected. That was yesterday.

A day later, a good nights sleep, and some deep reflection and I'm sure of two things. First, yeah, the code is a mess and that needs to be corrected. Second, I went about it entirely the wrong way. Here's why I say that.

Like I said, when I got done slashing and hacking away at the code yesterday I was already beginning to have my doubts. On the drive home the headaches that I potentially created started to loom in my thoughts. All that time I was cutting through the code and never once did I stop to check my work. Hell, it wasn't until the last 20 minutes of the effort that I was able to successfully compile the code, and as we know a successful build is not an indication of working code. So last night, more than a little concerned, I finally start looking at fixing up the unit tests.

Oh, hold on here a second. I should have told you that this entire effort was embarked upon in the interest of making the code more modular and testable. It was functional enough before I started making these changes, except that the design did not lend itself well to unit testing at all, and lately I'm all about writing more testable code. Isn't it ironic though that throughout this effort I didn't allow my tests to dictate my code refactoring. Let's just say lesson learned.

Perhaps that is the end of it for now. I'll leave things by apologizing to Stephen Covey, author of "The 7 Habits of Highly Effective People". One of those habits is to "begin with the end in mind". Well, I sort of did that. I knew what I wanted to accomplish, and I wanted to hit that goal as soon as possible. If I had bothered to think about it for even a few minutes I would most likely have done things differently. The second person I owe an apology to is Roy Osherove, author of "The Art of Unit Testing", which I have actually been reading lately. Man did I mess this one up.

What am I doing now? Well, I'm going to hit the undo button, literally, and back out all my changes. Then I'll start again, but this time I will allow the unit tests to drive the refactor. Oh, and yeah, I guess maybe I'll do a bit of integration testing along the way.