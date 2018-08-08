---
layout: post
title: Persistence Ignorant
---

I've wasted more time than I would like to admit tonight trying to work out a few things for an open source pet project of mine that I'm finally trying to breathe some life into. There were, well I guess still are, a few issues I was trying to deal with.

- I'm not in love with code first
- MySql works best for my hosting company, but MySql sucks
- At the end of the day I hate SQL the most


Some explanation here ...

**I'm not in love with code first**. At first it seems very appealing, and I'm not entirely convinced at this point I will be trying to avoid it, but I have some problems using it for building anything more than a very basic, spin it up once and never maintain it, site. Perhaps the documentation is forthcoming, but I have yet to see any guidance from the folks over at Microsoft to indicate how to handle updates to existing schemas without overwriting all of the data contained in any of the tables you'd be modifying. It has support so that you can pass in your own custom implementation of `IDatabaseInitializer` if you want (a decent overview can be found [here](http://sankarsan.wordpress.com/2010/10/14/entity-framework-ctp-4-0-database-initialization/)). But basically you are talking about the code below being used to setup your context.

``` csharp
public class FreedomContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Calendar> Calendars { get; set; }
    public DbSet<Task> Tasks { get; set; }
    
    public FreedomContext() : base(nameOrConnectionString:"FreedomDataServices")
    {
        base.Configuration.AutoDetectChangesEnabled = true;
        Database.SetInitializer<FreedomContext>(new DropCreateDatabaseIfModelChanges<FreedomContext>());
    }
}
```

Unless of course you want to spell out all of the relationships on your own, and in that case you'd have to override OnModelCreating and deal with that mess of code. But with this code above, if you've changed any of your objects then we are going to recreate everything. It appears that Microsoft is actively working on a project to provide better support for migrations, but from what I can tell it isn't actually available at this time ([http://blogs.msdn.com/b/efdesign/archive/2010/10/22/code-first-database-evolution-aka-migrations.aspx](http://blogs.msdn.com/b/efdesign/archive/2010/10/22/code-first-database-evolution-aka-migrations.aspx)).

**MySql works best for my hosting company, but MySql sucks**. I realize this so before I went too far along I figured I'd take and point Entity Framework over at a local instance of MySql just to get ahead of the game. This introduced its own set of problems though, since there appear to be limitations to the connector provided by the folks over at MySql. The main limitation is that you can't even get the drop and recreate type functionality that the code block above demanded because the provider doesn't have any support for it. I hit my head up against that for a while before finally giving up. I had seen indications that you could create the database manually before launching the application, and then everything would behave normally, but that didn't prove to be the case. Another thing I noticed is that there is a NuGet package out there for this, but it doesn't add the necessary sections in your .config file to register MySql with the database factories, so if you haven't ran the installation for the .Net connector you are screwed.

Another issue I have with MySql, and this could just be a knowledge gap, but I was pretty pissed that it wasn't straight forward, is that you can't control the case of characters in your table names. In order to seamlessly use MySql with Entity Framework, we'd want to have table names like Users and Calendars, but MySql likes to rename them to users and calendars. I saw noted somewhere that this may only happen when you introduce foreign keys, and somewhere else noted that this has something to do with the case insensitivity of the Windows file system. That isn't correct though. I will say that I'm trying to use the MySql Workbench to manage everything as a substitute to SSMS, and it has a problem if you try and alter an existing table, say Users, unless you change the name to users, which then changes the database name. You can afterwards then alter users all you want and the name persists. The option available to you here, which might be what I'll use so I can stay on MySql throughout this process, is to follow a more traditional Entity Framework POCO pattern, [http://blogs.msdn.com/b/adonet/archive/2009/05/21/poco-in-the-entity-framework-part-1-the-experience.aspx](http://blogs.msdn.com/b/adonet/archive/2009/05/21/poco-in-the-entity-framework-part-1-the-experience.aspx), and use the MySql .Net Connector, and then just edit the table names on the designer surface. In that way I don't really care what MySql is doing with the table names, and everything is presented to me in code the way I'd prefer to see it. So as illustrated by the [POCO](http://blogs.msdn.com/b/adonet/archive/2009/05/21/poco-in-the-entity-framework-part-1-the-experience.aspx) article I'd end up with code like this here.

``` csharp
public class FreedomContext : ObjectContext
{
    public ObjectSet<User> Users { get; set; }
    public ObjectSet<Calendar> Calendars { get; set; }
    public ObjectSet<Task> Tasks { get; set; }
 
    public FreedomContext() : base("name=freedomEntities")
    {
        Users = CreateObjectSet<User>();
        Calendars = CreateObjectSet<Calendar>();
        Tasks = CreateObjectSet<Task>();
    }
}
```

In this way I have avoided some of the issues, and still appear to have a workable solution. What this gains me is that I'm not losing the data because I'm making these changes to the database first, and then updating my Entity Framework model from there. I guess **hate** is a strong word to describe my feelings towards MySql. I do understand they have a unique problem because they are capable of running on multiple platforms, not just Microsoft Windows, so there are inherent challenges in that. And, now that I've done some testing, the solution might be workable after all.

**At the end of the day I hate SQL the most**. And I'm sure that most of you do as well. Nobody wants to spend any more time than absolutely necessary writing scripts to create tables, add data, stored procedures, figuring out what relationships go where, and so on. That is one of the things that I really do like about the code first approach. If you follow a few conventions in your code, all of these relationships are interpolated for you, which is pretty damn awesome. I think there are still some short comings to code first, although you can get a lot accomplished very quickly, and I would certainly recommend it for small projects where speed out the door is of high importance. In fact, it's probably best suited at this point for prototyping of systems. Personally I would caution against the use of it for production systems, especially if you don't understand all of what is going on, because you are liable to get yourself into some trouble. I've been testing things here and there as I've been writing this, and at this point I think I'll continue to roll with Entity Framework POCO for this particular project, with source code following soon.