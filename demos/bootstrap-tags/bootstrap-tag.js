(function ($) {
  var methods = {
    init: function(element, options) {
      return this.each(function() {
        var $this = $(this);
        var data = $(this).data('tag');

        if (!data) {
          $(this).data('tag', { tags: [] });
          $(this).append('<input type="text" class="newtag" />');
        }
      });
    },
    addtag: function(name) {
      if (!$(this).tag('contains', name)) {
        $(this).data('tag').tags.push(name);
        $('<span class="label label-info">' + name + '<i class="icon-remove" /></span>').insertBefore($('input.newtag', $(this)));
      }
    },
    addtags: function(tags) {
      var self = $(this);
      $.each(tags, function(i, tag) {
        self.tag('addtag', tag);
      });
    },
    gettags: function() {
      return $(this).data('tag').tags;
    },
    contains: function(tag) {
      var found = false;

      $.each($(this).data('tag').tags, function(i, t) {
        if (tag.toLowerCase() === t.toLowerCase()) found = true;
      });

      return found;
    }
  }

  $.fn.tag = function (method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + method + ' does not exist on jQuery.tag');
    }
  }

  $(function() {
    $('div.tag').each(function() {
      $(this).tag('init');
    });

    $('div.tag').click(function() {
      $('input.newtag', $(this)).focus();
    });

    $('div.tag input.newtag').keydown(function(e) {
      var value = $(this).val();

      if (e.keyCode == 8) {
        if (value.length == 0) {
          $(this).prev('span').remove();
        }  
      }

      if (e.keyCode == 13 || e.keyCode == 188) {
        if (value.length > 0) {
          $(this).parent('div.tag').tag('addtag', value);
          $(this).val('');
        }

        return false;
      }      
    });

    $('div.tag i.icon-remove').live('click', function() {
      $(this).parent('span').remove();
    });
  });
})(jQuery);