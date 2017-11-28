---
layout: post
title: "UnRegister: The UI Requirements"
---

This is going to be a little rough because I'm terrible with graphics applications, and I don't have a scanner, so that makes any sort of wire frame impossible. I searched around for something free that might help me get the job done and found a tool called [Pencil](http://www.evolus.vn/Pencil/Home.html), but I'm still facing some challenges with it. So to start with, unless I get more ambitious later in the day, this is primarily going to be a wire frame in text. I'll detail my core requirements for these pages in sections below.

## Landing Page

This is the home page, or index page, and there are a few things this page needs to do. First, it needs to identify the project name and what the project is all about. The "all about" I'd like communicated in a quick project mission statement, much like I've got up on the github repo today. We also need some log in capabilities, and I'd like that to be hidden inside a pull-down triggered from a button click. We'll need some way for new users to register to use the service, so we'll need some sort of link to the registration page. And then, maybe later on down the road once we've actually got this application doing something we could include a brief tutorial on how to use it.

At the end of the day this might look something like this.

![Home Image](/assets/images/posts/unregister-ui-requirements-1.png)

## The Other Pages

> That was the limit of my patience trying to draw things out using any sort of tool, so this will go pretty quick from here on out. I can't see spending hours putting together some drawings when I can get it done equally as fast using HTML and CSS directly.

The other pages we'll be needing are.

- **Login Page** - this will duplicate the drop down box from the landing page and will also provide some forgot password functionality
Registration Page - we need a place where users can sign up for the service, so that's what this will be for
- **Dashboard Page** - this is the main page for the user to interact with where they will see a quick summary of their accounts and have a quick add transaction option
- **Account Page** - this will consist of a list of transactions and allow for sorting and filtering within the current account, and of course will allow for adding, editing and deleting of associated transactions
- **Profile Page** - the user probably needs a place to change their password and edit other basic information about themselves, so this will be provided here

That should probably do it. I wish I had the patience to draw these all out, but this is generally why I don't go through this exercise. When I start working on a project, especially something like this where the requirements are coming from me, I generally have a loose idea in my head about what pages I'll need and the functionality they will provide, and that's about it. I don't have spelled out to the letter what everything is going to do, and I certainly don't have it drawn out. So why did I try and do it this way here? I really don't know. Now you have a little insight into my madness though.

## What's next?

I'm going to be using the [Bootstrap](http://twitter.github.com/bootstrap/) tools from Twitter to give this application its basic skin. So next for me is to start working on the page implementations. So that will likely be the topic for the next post.