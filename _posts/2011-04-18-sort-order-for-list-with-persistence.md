---
layout: post
title: Sort Order for List with Persistence
---

> It was brought to my attention that my post wasn't all that informative because it didn't the UI code to go along with this, so I have updated the post to include that information.

Something that seems to come up often enough, although not all that recently for myself, is to control the display order for items when presenting them in the user interface. This requirement of course is then paired with another requirement, the content manager needs a means of changing the sort order or items via some administrative tool. I had to do this today, so this will either serve as a reference, or possibly open myself up for criticism, but either way, here it is.

``` vbnet
Dim originalOrder = MyService.GetItem(itemId).SortOrder
Dim lowerBounds As Integer
Dim upperBounds As Integer
Dim isDecrement As Boolean = False
 
If originalOrder > sortOrder Then
    lowerBounds = sortOrder
    upperBounds = originalOrder
Else
    lowerBounds = originalOrder
    upperBounds = sortOrder
    isDecrement = True
End If
 
For Each item In MyService.GetAllItems.Where(Function(m) m.SortOrder <= upperBounds And m.SortOrder >= lowerBounds).OrderBy(Function(m) m.SortOrder)
    If item.ID = itemId Then
        item.SortOrder = sortOrder
    Else
        item.SortOrder = IIf(isDecrement, item.SortOrder - 1, item.SortOrder + 1)
    End If
 
    item.Update()
Next
```

If anyone knows if a more simplistic, or perhaps just better, means of accomplishing this please feel free to comment (not that I've received comments from anyone to date, still working on that). The approach here is to update only that which requires updating, rather than iterate back over the entire list.

On the presentation end of this I simply have an HTML table and a bit of javascript that makes use of jQuery UI's .sortable(). The code below is what accomplishes this, which I will explain.

``` js
$('#myTable tbody').sortable({
  update: function (event, ui) {
    var $tr; 
      if (event.toElement.tagName.toLowerCase() == "td") {
        $tr = event.toElement.parentElement;
      }
      else {
        $tr = event.toElement;
      }
 
      var rowId = getRowIndex($('#myTable'), $tr) + 1;
      var itemId = parseInt($($tr).find('td').eq(0).html());
 
      if (itemId && rowId) {
        $.ajax({
          url: '/myStuff/updatesortorder',
          type: 'post',
          data: {
            itemId: itemId,
            sortOrder: rowId
          }
        });
      }
  },
  cursor: 'pointer'
});
```

For the most part this is really straight forward, but there are two things I want to point out. First, jQuery .sortable() will return the targetElement as a `<tr />`, or sometimes a `<td />` and this all depends on where on the row you clicked to drag. For that reason the first few lines of code are responsible for specifically getting the `<tr />` so we can then find out where it was dragged to. Then there is also a call to a helper function called .getRowIndex(). This helper is responsible for performing the comparison and returning the index of the `<tr />`'s new position in the table. With that information we can then increment that index value by 1, since it is 0 based, and then we can call whatever service to perform the update.

``` js
function getRowIndex(table, target) {
  var result = null;
 
  $('tbody tr', table).each(function (index) {
    if (this == target) {
      result = index;
      return false;
    }
  });
 
  return result;
}
```