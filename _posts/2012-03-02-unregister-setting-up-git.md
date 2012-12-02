---
layout: post
title: "UnRegister: Setting Up Git"
---

I have jumped on the git bandwagon for providing version control of any personal project I work on. The problem is that I don't really know how to make effective use of the tool. As a developer who spends the majority of my time in the Visual Studio IDE I don't have an overwhelming level of comfort for the command line, and because of this I've come to rely on GUI interfaces. My interface of choice when working with git is [TortoiseGit](http://code.google.com/p/tortoisegit/) which integrates very well into Windows Explorer and is fairly intuitive. What I'm still unsure about is if there is a recommended folder structure for a git repository.

Having used Subversion previously I was in the always in the habit of creating two folders, trunk and branch. When browsing GitHub though I don't see any real standards emerging for a folder structure with git. Some people seem to make use of some standard folder names such as "src" for code storage while others simply drop their code in the root folder of their repository and maybe a "tools" folder for storage of related assemblies. The projects for Code52 [employ](https://github.com/code52) this directory structure. Yet others don't use any nested folder structure at all, and until now this is the pattern I have been following without really knowing why. In fact my only reason for doing so has been simplicity.

I'm sad, and sort of surprised, that after googling different search terms and following many links I still do not have an answer. It appears there just isn't a standard directory structure recommendation that exists. I can see why Code 52 has created a "src" and a "tools" folder though, and it makes sense to me, so I think I'm going to adopt that as my new standard going forward, for .Net projects anyway. When dealing with a project written in Ruby this structure wouldn't make as much sense to me since the sole purpose of the "tools" folder is to contain dependencies the code has on third-party tools and their executables or assemblies, and the need for managing those disappears because of the Gemfile and bundler. Until Nuget matures and hopefully one day really provides the .Net community with their own version of gems, I think having a folder named tools is the way to go.

One other important thing when using git is to remember to add a .gitignore file at the root of your repository. I believe I remember reading somewhere that there may be a global location you could do this in, but in my case I prefer to do this on a project by project basis. I've found the following to work pretty well.

{% highlight javascript %}
obj
bin
deploy
deploy/*
_ReSharper.*
*.csproj.user
*.resharper.user
*.resharper
*.suo
*.cache
~$*
*.gitignore
packages
/packages
{% endhighlight %}

When you are setting up your repository on GitHub you are asked to name it, and then very kindly they provide you with a list of command line instructions to initialize your repository locally and establish the link with GitHub. One of those steps is to create a README file, but that is flat text and if you have seen other repositories out there you'll have noticed that they can contain a little bit more flare. This flare is often courtesy of a markdown file. In the spirit of open-source software, and as a follower of Code 52's efforts, I'm using a tool from them called [MarkPad](https://github.com/Code52/DownmarkerWPF).

With that, I'm now going to tackle creating a new git repository locally, and create the code skeleton for this project.