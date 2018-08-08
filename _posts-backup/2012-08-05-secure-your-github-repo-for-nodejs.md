---
layout: post
title: Secure your GitHub repo for Node.js
category : lessons
---

I wanted to commit my code to GitHub for this trial Node.js application I started playing with this weekend but I didn’t want any of my passwords finding there way up to GitHub. To get around this I created a module.

``` js
module.exports = {
  connString: "postgres://username:password@server/db-name"
};
```

Then I told my application to consume it.

``` js
var settings = require('./secure.js');

db.connect(settings.connString, function(err, db) {
  lifejs = db;
});
```

The thing to pay attention to is where I tell [massive-js](https://github.com/robconery/massive-js) the connection string to use for connecting to my local postresql database. I access it by calling “settings.connString” which is nothing more than a constant at this point.

The last thing you have to do is add "/secure.js" to your .gitignore file. Now you can commit changes to your repository without fear of everybody seeing your connection string information, or anything else you would like to keep private.