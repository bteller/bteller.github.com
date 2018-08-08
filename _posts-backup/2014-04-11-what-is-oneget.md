---
layout: post
title: "OneGet... What For?"
summary: "Do we really need another package manager? Probably not, but they are apparently creating one anyway."
---


## What Is It?
Honestly, I don't really know. I was just reading a blog post from Jeremy Miller who referenced [OneGet](https://groups.google.com/forum/#!topic/chocolatey/a8WdEoF-M58f) in it. If I'm understanding this correctly, I don't know what need we are trying to meet here. Hasn't this niche already been filled?

In that same post, which is [over here](http://jeremydmiller.com/2014/04/10/fubumvc-lessons-learned-fubu-new-standardization-and-polyglot-programming/) there are some remarks about the lack of a good ecosystem for .NET in terms of plug-ins and extensibility, and that the new kids on the block are way ahead when you consider *gem* and *npm*, and he is right. I don't know if this is the best response though. I don't need to use [Choclatey](https://chocolatey.org/) to install sofware. I really don't want to. Are we trying to turn Windows into the kind of platform where we make our users run commands like <code>apt-get install nodejs</code> to install things? I wouldn't think so.

I really happen to like being able to download an *exe* or *msi* file and install things on Windows. I don't want to be forced to the command line, or a powershell window, to install software. I'd rather not be forced to a powershell window at all to be honest. 

And even if that were okay...

## Reinvent the Wheel. Umm... why?
I guess I don't understand why we would want to reinvent the wheel on this one. There are a lot of really cool tools out there, again created by these new kids, that we should probably just consume as is.

Let's take a look.

* **bower** - quick installation of script packages like Twitter Bootstrap, jQuery, Angular, and so on.
* **yeoman** - a scaffolding tool for standing up sites and related assets.
* **grunt** - a task runner, great for dealing with builds.
* **npm** - install packages for Node.js
* **gem** - install Ruby gems.

Do we need to rewrite things in .NET before we'll use them for .NET projects? Why don't we just consume what is already there?

If we really want to help build an ecosystem, we should be building a software development ecosystem, and not one specially tailored for .NET, because there really isn't anything special we are doing. Let's spend our time adding better cross-platform support to some of these packages or package managers. 
