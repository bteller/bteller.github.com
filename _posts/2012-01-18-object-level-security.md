---
layout: post
title: Object Level Security
---

A few weeks ago at work I had the need to provide object level security in a system. I looked around on the web and didn't really see anything other than slight hints at possible solutions to the problem, but nothing really comprehensive. To that end I've got the following few snippets of code that might help someone else looking to solve a similar problem. I'm also going to upload the sample code here as well, but don't expect much more than what you see in the snippets below just yet, but I'll try and build out something more functional in the near future.

First we'll create a few objects. Really we only need two objects for the example to work, and then you can build on that for your own implementation. Let's first define a domain object we might work with in a project, Product.

{% highlight csharp %}
class Product {
    public int ProductId { get; set; }
    public string Name { get; set; }
}
{% endhighlight %}

Not a very helpful object at this point from a business sense, but it will serve the purpose for our simple example. The other important one is the ObjectPermission object which looks something like this.

{% highlight csharp %}
class ObjectPermission {
    public int ObjectPermissionId { get; set; }
    public int UserId { get; set; }
    public GrantType GrantType { get; set; }
    public AccessType AccessType { get; set; }
    public string Object { get; set; }
    public string LimitingField { get; set; }
    public string LimitingValue { get; set; }
}
{% endhighlight %}

You can look at the example code attached to this post to see what GrantType and AccessType look like. The Object property is just your objects name, so in our example we'll make this "Product". The other properties **LimitingField** and **LimitingValue** are there so you can say when a product has a name of x then allow or disallow access to the object. This comes in handy if you have different types of objects and you want a user to only have access to a subset of those.

The real work horse is this next class, the ObjectPermissionEnforcer. An intimidating name, right?

{% highlight csharp %}
class ObjectPermissionEnforcer {
    private List<ObjectPermission> _permissions;

    public ObjectPermissionEnforcer() {
        var db = new SampleContext();
        _permissions = db.ObjectPermissions.ToList();
    }

    public ObjectPermissionEnforcer(List<ObjectPermission> perms) {
        _permissions = perms;
    }

    public List<T> SecureList<T>(List<T> secure, AccessType accessType) {
        var result = new List<T>();

        foreach (var item in secure) {
            if(HasAccess(item, accessType)) {
                result.Add(item);
            }
        }

        return result;
    }

    public bool HasAccess(object o, AccessType accessType) {
        if (_permissions.Where(p => p.Object.Equals("All") && p.AccessType.Equals(accessType)).FirstOrDefault() != null) {
            return true;
        }

        var perms = _permissions.Where(p => p.Object.Equals(o.GetType().Name)).ToList();

        if (IndividualDeny(perms, o, accessType)) {
            return false;
        }

        if (GlobalPermit(perms, o, accessType) || IndividualPermit(perms, o, accessType)) {
            return true;
        }

        return false;
    }

    private bool GlobalPermit(List<ObjectPermission> perms, object o, AccessType accessType) {
        if (accessType == ObjectLevelSecurity.AccessType.Write) {
            if (perms.Where(p => p.GrantType.Equals(GrantType.Permit) && p.AccessType.Equals(accessType) && string.IsNullOrEmpty(p.LimitingField)).Count() == 1) {
                return true;
            }
        }
        else {
            if (perms.Where(p => p.GrantType.Equals(GrantType.Permit) && string.IsNullOrEmpty(p.LimitingField)).Count() == 1) {
                return true;
            }
        }

        return false;
    }

    private bool IndividualDeny(List<ObjectPermission> perms, object o, AccessType accessType) {
        var attrPerms = perms.Where(p => !string.IsNullOrEmpty(p.LimitingField)
                        && p.GrantType.Equals(GrantType.Deny) && p.AccessType.Equals(accessType)).ToList();

        foreach (var perm in attrPerms) {
            if (o.GetType().GetProperty(perm.LimitingField).GetValue(o, null).ToString().Equals(perm.LimitingField)) {
                return true;
            }
        }

        return false;
    }

    private bool IndividualPermit(List<ObjectPermission> perms, object o, AccessType accessType) {
        var attrPerms = perms.Where(p => !string.IsNullOrEmpty(p.LimitingField) && p.GrantType.Equals(GrantType.Permit)).ToList();

        foreach (var perm in attrPerms) {
            if (accessType.Equals(ObjectLevelSecurity.AccessType.Write)) {
                if (o.GetType().GetProperty(perm.LimitingField).GetValue(o, null).ToString().Equals(perm.LimitingValue)
                    && perm.AccessType.Equals(accessType)) {
                    return true;
                }
            }
            else {
                if (o.GetType().GetProperty(perm.LimitingField).GetValue(o, null).ToString().Equals(perm.LimitingValue)) {
                    return true;
                }
            }
        }

        return false;
    }
}
{% endhighlight %}

This hopefully isn't too intimidating. Keep in mind that this enforcer assumes you must be explicitly granted permissions to something before you'll be able to see it. For that reason the "All" check exists so you can grant access to administrators on everything in your system. The other important bit about this is the SecureList() method. Slapping this code in your project won't magically secure up everything, you actually have to pass a list through the enforcer, which you can think of as a filter. The objects that come out the other end are those the user can view.

And finally we have a very basic implementation of this.

{% highlight csharp %}
var products = new List<Product>();
products.Add(new Product() {ProductId = 1, Name = "First"});
products.Add(new Product() {ProductId = 2, Name = "Second"});

var perms = new List<ObjectPermission>();

perms.Add(new ObjectPermission() {
    ObjectPermissionId = 1,
    UserId = 1,
    GrantType = ObjectLevelSecurity.GrantType.Permit,
    AccessType = ObjectLevelSecurity.AccessType.Read,
    Object = "Product",
    LimitingField = "Name",
    LimitingValue = "Second"
});

var enforcer = new ObjectPermissionEnforcer(perms);
 
Console.WriteLine("Read Access:");
foreach (var p in enforcer.SecureList<Product>(products, AccessType.Read)) {
    Console.WriteLine(p.Name);
}
Console.WriteLine();

Console.WriteLine("Write Access:");
foreach (var p in enforcer.SecureList<Product>(products, AccessType.Write)) {
    Console.WriteLine(p.Name);
}
Console.WriteLine();
{% endhighlight %}

Basically I setup a single permission for a user granting them read access to products that have a name of "Second".

If you want to use this in the real world you'll certainly have to extend a few things. I had really wanted to put together an example complete with a database schema for you but I forgot Entity Framework doesn't currently support enums. After I realized, I mean remembered, that, I sort of gave up on that. You can see though that you could grab the permissions for the current user from your persistence layer, push those into the enforcer, and then secure whatever you like. Something you might want to do is create some extension methods, perhaps extending object or maybe you have a MyObjectBase type class that all your other classes inherit from. That way you can verify object very easily one object at a time.

And that's the show for today. I hope you enjoyed it, and we'll see you back here real soon! Right?