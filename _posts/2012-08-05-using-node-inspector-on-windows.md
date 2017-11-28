---
layout: post
title: Using Node Inspector on Windows
category : lessons
---

I guess I just have a hard time following directions or something, but just in case I wanted to make it crystal clear for anyone else having problems what you need to do in order to use [node-inspector](https://github.com/dannycoates/node-inspector/) to debug a Node.js application on Windows.

1. Temporarily disable your anti-virus software. You damn well better be running anti-virus software. If you aren't because you don't feel you should have to pay for it then you can either use Windows Essentials or run over to AVG and download the [free](http://free.avg.com/us-en/homepage) version. I'm running AVG and it is really easy to disable, just right-click the tray icon and select the option to "Temporarily disable AVG protection". It is even nice enough to let you select a time duration to disable protection for.
2. Drop down to a command line and run `npm install -g node-inspector`.
3. This isn't important here, but if you want to be able to quickly launch Notepad++ from the command line run `doskey n=notepad++ $*`. Note that I have the notepad++ executable in my path. If you don't you should be able to specify the full path, or just add it to your path to make this easier to do in the future.
4. From within the root directory of your Node.js application run `node-inspector &`.
5. Now open another command prompt, leaving the one running node-inspector open and navigate to your Node.js application root. Then run `node --debug server` to start your application up in debug mode. If your primary source file name is something different then use that in place of "server". If you want to break at the first line of code run `node -debug-brk server` instead.
6. Open Chrome, or Safari if you have it installed, and go to "localhost:8080" to view the debug tools.
7. Open another tab in Chrome and navigate to your Node.js applications port at localhost.
8. Click back over to the node-inspector tab and marvel at how simple that really was.

This thing is really great. Once it is up and running you can step through and debug your application just as you would your client-side scripts for any other site you've worked on. I've only been using it for a few days now, but I haven't really run into any issues. I'll admit that selecting the script file in which to set breakpoints can be a little difficult. When you are debugging keep in mind that your scripts will not appear until they are pulled in by require statements.

I have experienced some odd behavior with the debugger though. Occasionally it seems to detach itself from the node server. If that happens just rinse and repeat from step 4 above.