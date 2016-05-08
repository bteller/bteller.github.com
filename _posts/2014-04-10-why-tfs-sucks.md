---
layout: post
title: Why TFS Sucks!
published: true
summary: "You hate it too, and you know it. This is why I'm not a big fan of TFS and related tools these days."
---

## What am I talking about?

The tools I've been having the bulk of my problems with are the:
- Automated Build System
- Version Control System

In quick defense of TFS, I really haven't had any problems with their Task Management System. These other two though, have been a huge thorn in my side for months now.

## Oh,the Horror...

It all started about a year ago, after upgrading from TFS 2010 to TFS2012. I didn't perform the upgrade myself, but we had all sorts of problems.
- Sharepoint portal projects wouldn't upgrade.
- Dead or broken links in Sharepoint projects.
- Build controller wouldn't start.
- Automated builds wouldn't run.

These were not good days.

Things slowly got a little better. The problems with Sharepoint were addressed by one of our engineers with some help from Microsoft support, and they also patched up the build controller so it would come online. They never did manage to get the automated build process to work. 

## Fast forward a few months

The automated build process still isn't working. Different people on the team looked at it, and all attempts to fix it failed. Then the calls to Microsoft started, and the best advice they can provide is "upgrade all of your projects to .Net 4.5 and see what happens". Seriously? That is all you've got? 

Well, that isn't what we ended up doing. To be honest, it has been so long now, and I was so pissed off my the whole thing, I don't know what I did to fix it. I finally hammered at the problem deep into the wee hours of the night, and I finally had some success with it. And by some I mean that, I finally got the build running and outputing some information to the log. I think, but don't quote me on it, that the problem was with the workspace target being set incorrectly. You'd really think Microsoft support would have backed things up a bit and looked at started from step one configuring an automated build. Nope, we got what I can only assumed is that canned response suggesting a framework update would miraculously solve all our problems.

Now, I said that it didn't resolve all of the build issues... the remaining issues apparently existed before the upgrade, so we were back to where we started.

## What is with all this XAML?
These other issues were related to some deployment tasks we were trying to run, so the next step was to figure out why they were failing. And so begins my first experience with the .xaml file that drives the build.

It took me hours to make any sense of what was going on what so ever. I tried opening the .xaml file up in Visual Studio, that sucks. What the hell does this shit mean?

![XAML Editor](/assets/images/posts/tfs-sucks.PNG)

I finally gave up on that view and opened the file up in a text editor. Not much of an improvement, but at least a few things make sense now. After a few more hours, and who knows how many commits later, things finally worked. 

> Things shouldn't be this hard.

I've said it before... and yet... there it is again. I don't understand why anybody dreamt up XAML in the first place. 

- It is code, represented as XML.
- Okay, it isn't really code, so maybe you don't need to be a developer to use it.
- The editor is useless. Really. Go open your build.xaml file and see how you like it.

## Things Get a Bit Better
To be honest, they really didn't. I thought they did though. We found out there were these Custom Build Process Template things you could do, [kinda like this](http://msdn.microsoft.com/en-us/library/dd647551.aspx). It was damn near impossible to track down all the dependencies before it actually worked, but when it was up and running, I was able to get a few custom activities running. Along the way though there was an immediate issue... I tried to build an update to the project and got some error about how Visual Studio was unable to update a DLL. Enter my version control system woes.

## Ignore that... I THINK NOT!
One of the things I really like about Git is the .gitignore file. Well, TFS is supposed to support this same functionality using a .tfignore file. So, I tried to use it, and couldn't get it to work. At first the issue appeared to be that I wasn't using a local workspace, but I converted my workspace to one, and the damn files were still appearing in my excluded changes window. What the heck man?

Apparently the folks over on the TFS team feel that you should never be able to exclude a file, not completely anyway. Does that make sense? It doesn't make any sense to me. Why not, if you really want to cram a file into source control, edit the .tfignore and add an exception to your exclude rule? Would that be too straight forward? 

That would be all well in good if Visual Studio didn't also think this was the most assanine thing it had ever heard. In order to get the custom build project to actually build I had to check out the damn DLLs, and then build. Wow! Really?

Regardless, onward we go. 

## MSBuild, You Have Been Forgotten
Until last night I've really taken MSBuild for granted. I fire up Visual Studio, write some code, build it, publish it, and there we go. I wanted to get JSHint running as part of the build process though, so I read up on it. It turns out it was actually pretty easy to make this happen (post to follow). I was actually pretty excited. If I can do these things with MSBuild, then maybe I can live with TFS Build after all. So, I commit the changes, fire off a build, and nothing. The custom target I created didn't get fired at all.

What the hell!!!

The only thing I can figure is that the TFS build process doesn't respect the build files. Why on earth would that be? What got of Microsoft or TFS demanded that XAML be king? Why not just update MSBuild to provide the functionality you need? Isn't the XAML just supposed to be a wrapper around MSBuild anyway?

I spent hours today trying to get it to work, and failed. Finally at 6:11 PM EST today I fired up a Windows 8.1 VM, downloaded TeamCity from JetBrains, installed it, added a test project into TFS, created a build defintion, having no prior experience with TeamCity mind you, and was able to get a build to run that did run my custom target. I realized success with that at exactly 6:39 PM EST. That's right. It took me under 30 minutes to accomplish something I had failed to make work in the previous 8 hours of the day. 

## Other Issues
Things post is getting long, and those are just a few of the pain points I've had with TFS. Some others:

- Offline Mode (and don't say local workspaces)
- Local Workspaces
- Branching

## So What Next?
I'm done with TFS. Seriously. Maybe I'm wrong about it. Maybe there is an expert over there at Microsoft that wants to send me an email and convince me I'm wrong. I'm more than happy to spend some time on Skype and let them set me straight. I don't think I'm wrong though. 

So, maybe I'll give TeamCity a serious look, or Bamboo, or Jenkins, or maybe just use a scheduled task and run MSBuild right from the command line. 
