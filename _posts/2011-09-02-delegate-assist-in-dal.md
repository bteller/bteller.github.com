---
layout: post
title: Delegate Assist in the DAL
---

Not sure about the rest of you out there, but we are still utilizing a hand rolled data access layer. In certain cases we can make use of ORM tools, but for others we still need the additional control allowed by writing our own. One common task we do is to perform straight read queries into the database and then convert the returned result into a list of business objects. This gets very tedious and time consuming what with writing all the using statements. Also, if you consider the iteration over records in the data reader, that code isn't unique. So, if you want to reduce the overall amount of code this would be a great time to make use of delegates and generics. The code below should get you closer to something just a bit more manageable, since I know we all hate writing any more code than we absolutely have to.

First we define our delegate. We'll use this to tell our function what conversion function it should use for each object type.

{% highlight vbnet %}
Public Delegate Function GetItemFromReader(Of T)(ByVal dr As IDataReader)
{% endhighlight %}

Then we can write a reusable function that will accepts an instance of our delegate as a parameter. We have some other helper functions out there which is where the 'Me.ExecuteReader' call comes into play, but you could replace this with the traditional 'Using cn as New SqlConnection(_connString) .... End Using' code.

{% highlight vbnet %}
Public Function GetListFromReader(Of T)(ByVal sprocName As String, _
          ByVal params As SqlParameter(), _
          ByVal converter As GetItemFromReader(Of T)) As List(Of T)
 
    Dim result As New List(Of T)

    Using dr As SqlDataReader = Me.ExecuteReader(sprocName, params)
        While dr.Read
            result.Add(converter(dr))
        End While
    End Using
 
    Return result
End Function
{% endhighlight %}

And then we can go ahead and consume it.

{% highlight vbnet %}
Public Function GetUsers() As ICollection(Of User)
    Return GetListFromReader(Of User)("getUsers", Nothing, AddressOf GetUserFromDataReader)
End Function
{% endhighlight %}

The code that does the conversion is:

{% highlight vbnet %}
Private Function GetUserFromDataReader(ByVal dr As IDataReader) As User
    Return New User With {.Id = dr("id"), .Name = dr("name")}
End Function
{% endhighlight %}