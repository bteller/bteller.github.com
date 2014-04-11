---
layout: post
title: Refactor Constantly
summary: "I don't know why everyone gets so scared by this term. Just do it already."
---

##Why?
You want to refactor for a number of reasons. 

- Make your code more unit testable.
- Adhere to design patterns.
- Make it more readable.
- Make it more maintainable.
- And so on ...

Does this violate the Open Closed Principle? Yes, I guess it does. The whole idea behind refactoring though is that you will eventually get your code to the point where additional refactorings are no longer needed. If you work in an environment like I do though, you are constantly adding new code, so there is constantly code to *improve*. 

##Have A Plan
It is important for you to look at the code and come up with a game plan for what you want to see changed. Make sure you know why you want that change too. I can't emphasize that enough. Don't rewrite code for the sake of rewriting it. There has to be a solid reason for doing so, otherwise you are just wasting the companies time, or your own. So, look at the code you want to rewrite, make notes along the way of all the things you'd like to improve, and write down why you feel those changes are necessary.

##Don't Start Right Away
Man, I am notorious for getting myself caught in this trap. I have an idea for something to improve, and then I just jump right in. Hell, a lot of the time it isn't a plan so much as it is a few ideas rolling around in my head. Sometimes that is the best way to get started coming up with a list of things to change... just don't commit those "I have an idea" changes until you've written them down and thought them over. 

I like to keep notes about what code to refactor in Evernote. Anything like that I'll add a ".refactor" tag too, as well as a ".todo" tag. The ".todo" tag lets me know that I want to revisit that note for one reason or another. With that note saved off I'm not worried about forgetting any of my fantastic ideas, and I can also sleep on it for a night, a week, or for however long it takes.

##Baby Steps
After you have your plan, take baby steps. Build on that plan and come up with a true plan of attack. You don't want to change everything at once. Hell, ideally you will have a few dozen commits that take place over a few weeks. That way you know your application isn't going to fail horribly in Production. 

This is another trap I fall into though... I start changing everything at once. It feels great too! I'll sit there and marvel at how productive I've been. It isn't worth it though, because you'll screw something up. Here is my advice.

- Take your time.
- Talk things over with your team, if you have one.
- Figure out which changes are the most important or impactful.
- Above all, make sure everybody on your team knows what is coming, and why.

##Conclusion
Refactor, and refactor often. It is well worth the exercise. You'll learn new things, reacquaint yourself with old code, find bugs you didn't realize were there, and overall improve the quality of your codebase. You need to do it slowly though, with an execution plan, and with the buy in from other members of your team.

Happy refactoring!