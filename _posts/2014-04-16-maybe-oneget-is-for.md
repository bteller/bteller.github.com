---
layout: post
title: "Maybe I know what OneGet is For"
summary: "The other day I was asking about OneGet, and what exactly it might be for. My initial opinion was that there are a whole host of other tools already out there, with established user bases and ecosystems, that it hardly seems worth while to build another tool."
---

The other day I was asking about OneGet, and what exactly it might be for. My initial opinion was that there are a whole host of other tools already out there, with established user bases and ecosystems, that it hardly seems worth while to build another tool.

I have a thought though.

## A Possible Purpose

I've been using Vagrant more and more to stand up new virtual machines. In order to configure this box, you need to have a base image that gets cloned, and that is what Vagrant ends up managing. One of the configuration options in your *Vagrantfile* file is a provisioner. Among other options you can use a shell script, Chef, Puppet, and Docker. I think it is the growing popularity of such tools that could be leading the development of OneGet. 

Right now I think Microsoft Windows isn't getting that much love for the plain and simple fact that it is so damn easy to stand up and tear down instances of Linux. You want a clean install, no problem, destroy your local VM and <code>vagrant up</code> a new instance.

I could be wrong, but hat's what I'm thinking anyway.

## What about .MSI Automation

The only thing I don't quite understand though is, I thought it was possible to automate the installation of MSI packages. Searching around the interwebs it certainly seems possible. So, why wouldn't you just have a repository of MSIs out there, and have your provisioner download the version you specify, and allow for you to automate the installation of them? 

We'll see. 