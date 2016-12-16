---
layout: post
title: "ASP.Net MVC - Delete Confirmation"
---

I've not been able to find a real comprehensive article or blog post anywhere that details how to use a jquery dialog to confirm you want to delete a record, so this will be a quick run through on what I ended up doing.

First, the code for the link looks like this.

``` html
<a href="javascript:void(0)" onclick="doDelete(<%= item.Id %>)">Delete</a>
```

The javascript that this link calls looks like the following.

``` js
function doDelete(id) {
    $('#golfCourseDeleteView').dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            Yes: function() {
                $.ajax({
                    url: "/GolfCourses/Delete",
                    data: { id: id },
                    type: "post",
                    success: function() { window.location.reload(); }
                });
            },
            No: function() { $(this).dialog('close'); }
        }
    });
}
```

An extension to this would be to have the contoller action return some sort of success or failure indication and determine if the redirect should be performed based on that, but maybe more on that later.

The only aspect of this I wish I could change is the need to do window.location.reload() on success for the ajax call. For now I guess it should be enough that we have a dialog displaying rather than directing our users to another page, which means if they didn't mean to delete anything, we saved ourselves the time of rendering the delete view and then reloading index.

I hope this helps someone out.