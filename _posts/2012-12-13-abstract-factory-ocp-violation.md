---
layout: post
title: "Abstract Factory: A Violation of the Open Closed Principle?"
summary: "In this post I explore a dilema I'm having. In this case is the Abstract Factory pattern implementation a violation of the Open Closed principle? You tell me!"
---

This is either a tough one, or I'm really overcomplicating things. I'm pretty sure though that I'm in one of those impossible situations where there really is no right answer. You try, and try, and you just can't please everyone. Anyway, here is my dilema.

## The Game

I'm building this game (Okay! Not really but it serves as a good example) and I want to give players the ability to buy weapons from a sleezy armory worker that sells goods out the back door. Imagine if you will that the player sees an interface like this one.

<img src="/assets/images/posts/absfacocp.png" alt="Game Interface" style="display: block; margin: 0 auto;" />

That is all well and good. They just go ahead and select the weapon they have enough money to purchase and click the buy button. The issue is what this means for the code. 

## The Code

I'm feeling pretty good about it so far. Since players can outfit themselves with any number of weapons, I've got an abstract class that each of the weapon classes will inherit.

{% highlight csharp %}
public abstract class Weapon
{
    public int HitPower { get; protected set; }
    public int WaitTime { get; protected set; }

    public void Strike(IOpponent opponent)
    {
        opponent.GetHitBy(this);
    }
}
{% endhighlight %}

Then we've got individual classes for each of the weapon types. The idea here being that each type of weapon will have some limitations, as well as differing strengths. 

{% highlight csharp %}
public class Sword : Weapon
{
    public Sword()
    {
        this.HitPower = 10;
        this.WaitTime = 4;
    }
}

public class BeerBottle : Weapon
{
    public BeerBottle()
    {
        this.HitPower = 2;
        this.WaitTime = 1;
    }
}
{% endhighlight %}

Then to outfit a player with a weapon I've got an abstract factory to create new instances of the weapons.

{% highlight csharp %}
public class WeaponFactory
{
    public static Weapon CreateWeapon(string weaponName)
    {
        switch (weaponName.ToLower())
        {
            case "sword":
                return new Sword();
            case "beerbottle":
                return new BeerBottle();
            default:
                throw new NotImplementedException();
        }
    }
}
{% endhighlight %}

Not bad, right? Perhaps not...

## The Issue

The problem I have with this is that it would seem to violate the open closed principle. If I want to add another weapon into the system I'm fine, all the way up until I want to be able to create instances of these weapons. So if I wanted to add a knife as a weapon I'd have to modify the abstract factory so it can create instances of the knife class, like so.

{% highlight csharp %}
public class WeaponFactory
{
    public static Weapon CreateWeapon(string weaponName)
    {
        switch (weaponName.ToLower())
        {
            case "sword":
                return new Sword();
            case "beerbottle":
                return new BeerBottle();
            case "sword":
                return new Sword();
            default:
                throw new NotImplementedException();
        }
    }
}
{% endhighlight %}

But to me that hardly seems like it is closed for modification. The only problem is, what the hell choice do I have? 

## The Short of It

Unless someone out there tells me differently, I think this code is about as good as it can be. I've tried to find a way to make this code conform to the open closed principle and it just does not appear to be possible. Sure, I could create forms for each of the weapon types, but that doesn't improve the situation, just pushes it farther up the chain.

So it would appear that sometimes you just can't get to 100%. Sometimes close is all you can really hope for.