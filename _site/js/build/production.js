var smallBreakPoint = 640;
var mediumBreakPoint = 768;
/* ==========================================================================
    Styleguide -- Version: 0.4.1 - Updated: 2/22/2014
    ========================================================================== */

// Create Hex color code from color return
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

// Get color value of swatch and print to div
var color = '';
$('.swatch').each(function() {
    var classList = $(this).children('.swatch-color').attr('class').split(' ');
    for(i=0; i <= classList.length-1; i++){
     if(classList[i].match(/color-/g)){
         $(this).children('.swatch-info').prepend('<p>$' + classList[i] + '</p>');
         break;
     }
 }
 var x = $(this).children('.swatch-color').css('backgroundColor');
 hexc(x);
 $(this).children('.swatch-info').append('<p>' + color + '</p>');
 $(this).children('.swatch-info').append('<p>' + x + '</p>');
});

(function($) {

    $.fn.vs = function() {
        // View source buttons
        $('.vs').click(function(){
            $(this).parent().next().find('.prettyprint').toggle();
            $(this).not('.disabled').toggleClass('js-active');
            return false;
        });
    }

}(jQuery));

$('.vs').vs();

// Get font-family property and return
$('.fonts').each(function(){
    var fonts = $(this).css('font-family');
    $(this).prepend(fonts);
});

/* ==========================================================================
    Accordion -- Version: 1.9.0.0 - Updated: 12/31/2013
   ========================================================================== */

$('.accordion .expandable ul li').each(function() {
	if ($(this).has('ul').length) {
		$(this).addClass('js-expandable');
	} else {
		$(this).addClass('js-notexpandable');
	}
});

$('.accordion .expandable h6').click(function() {
	var categoryText = $(this).text();
	$(this).parent().addClass('js-active').find('ul').slideToggle(function() {
		if ($(this).is(':hidden')) {
			$(this).parent().removeClass('js-active');
		}
	});
});

/* ==========================================================================
    browser-alert -- Version: 0.1.1 - Updated: 12/17/2014
    ========================================================================== */

(function($) {

  $.fn.browserAlert = function() {
    $('.browser-alert').each(function() {

      var alert = jQuery(this);



    });
  }

}(jQuery));

$('.browser-alert').browserAlert();

/* ==========================================================================
    Main -- Version: 0.4.1 - Updated: 10/1/2014
    ========================================================================== */

// Add classes to first and last li's for every instance
$(function() {
  // Add classes to first and last of each list
  $('li:first-child').addClass('js-first');
  $('li:last-child').addClass('js-last');
});

// Set year
(function($) {

  $.fn.getYear = function() {
    var d = new Date();
    var x = document.getElementById("year");
    x.innerHTML=d.getFullYear();
  }

}(jQuery));
$('.getYear').getYear();

// Open all external links in a new window
$('a[href^="http://"], a[href^="https://"]').attr('target','_blank');

// Detect for touch
var isTouch = 'ontouchstart' in document.documentElement;

/* ==========================================================================
    Modal -- Version: 1.9.0.0 - Updated: 4/28/2014
   ========================================================================== */

$(function(){
	$('.modal-button').click(function() {
		var modal = $(this).attr('id');
		loadPopup(modal);
		return false;
	});
	$('.modal-next').click(function() {
		var modal = $(this).attr('data-next');
		var currModal = modal - 1;
		loadPopup(modal, currModal);
		return false;
	});
	$('.modal-prev').click(function() {
		var modal = $(this).attr('data-prev');
		var currModal = modal - 1 + 2;
		loadPopup(modal, currModal);
		return false;
	});
	// event for close the popup
	$('.modal-close').click(function() {
		disablePopup();
		return false;
	});
	$(this).keyup(function(event) {
		if (event.which === 27) {
			disablePopup();
		}
	});
	$('.modal-overlay').click(function() {
		disablePopup();
		return false;
	});
});

function loadPopup(modal, currModal) {
	$('#modal' + currModal).css({
		'display': 'none'
	});
	$('#modal' + modal).css({
		'margin-top': -$('#modal' + modal).height() / 2,
		'display': 'block'
	});
	$('.modal-next').attr('data-next', modal - 1 + 2);
	$('.modal-prev').attr('data-prev', modal - 1);
	$('#modal' + modal).fadeIn(0500);
	$('.modal-overlay').fadeIn('normal');
}

function disablePopup() {
	$('.modal-container').fadeOut('normal');
	$('.modal-overlay').fadeOut('normal');
}
/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
          'focus.placeholder': clearPlaceholder,
          'blur.placeholder': setPlaceholder
        })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
            // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don't get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({ 'type': 'text' });
          } catch(e) {
            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
          }
          $replacement
            .removeAttr('name')
            .data({
              'placeholder-password': $input,
              'placeholder-id': id
            })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
              'placeholder-textinput': $replacement,
              'placeholder-id': id
            })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    // Avoid IE9 `document.activeElement` of death
    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
    try {
      return document.activeElement;
    } catch (exception) {}
  }

}(this, document, jQuery));

$('input, textarea').placeholder();

/* ==========================================================================
    sandbox -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

    // $(function() {
    //   $(".radio.reveally").click(function() {
    //     var cat = $(this).val();

    //     $(".hidden").hide();
    //     $(".category" + cat).fadeIn(500);
    //   });
    // });

    $(function() {
      $(".radio.reveally").change(function() {
        var cat = $(this).val();

        if(this.checked) {
          $(".hidden").hide();
          $(".category" + cat).slideDown(500);
        }
      });

      $('button[type=reset]').click(function () {
        $(".hidden").slideUp(500);
      });
    });

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

/* ==========================================================================
    Select with Link -- Version: 1.9.0.2 - Updated: 3/24/2014
   ========================================================================== */

(function($) {

  $.fn.selectLink = function() {
  	$('.selectLink').change(function(){
  		// Ignore null value -- shown at top of dropdown
  		if ($(this).val() != 'null'){
  			window.location.href = $(this).val();
  		}
  	});
  }

}(jQuery));

$('.selectLink').selectLink();
/* ==========================================================================
    Tabs to Accordion -- Version: 1.9.0.2 - Updated: 1/7/2013
   ========================================================================== */

$(function() {
  tabCount = 1;
  $('.tab-component').each(function(index){
      $(this).addClass('onState_'+tabCount);
      tabCount++;
  });

  buildAccordion();

  $(window).bind("load", function(){
      adjustContent();
  });

  $('[class*=onState_] .tabs li').click(function() {
      var selected_tab = $(this).find('a').attr('data-ref');
      var onState =  $(this).parent().parent().parent().attr('class');
      var className = onState.split(" ");
      var finalName = className.pop();

      $('.'+finalName+' .tabs li').removeClass('js-active');
      $(this).addClass('js-active');

      if ($(window).width() > mediumBreakPoint) {
          $('.'+finalName+' .tab-content').hide();
          $('.'+finalName+' '+selected_tab).show();
      } else {
          $('.'+finalName+' .tab-content').slideUp();
          $(this).next().slideDown();
      }

      return false;
  });

  $(window).resize(function() {
     adjustContent();
  });
});

function adjustContent() {
  if ($(window).width() < mediumBreakPoint) {
      $('[class*=onState_] .tabs ul').find('li.js-active').next('div').show();
  } else {
      $('.cloned').hide();
      $('[class*=onState_]').each(function(index){
          var onState =  $(this).attr('class');
          var className = onState.split(" ");
          var finalName = className.pop();
          var toShow = $('.'+finalName+' .js-active a').attr('data-ref');
          $('.'+finalName+' .tab-content-container').find(toShow).show();
      });
  }
}

function buildAccordion(){
  $('.tab-component .tabs ul li').each(function(){
      id = $(this).find('a').attr('data-ref');
      $(id).clone().removeAttr('id').addClass('cloned').insertAfter($(this)).hide();

      if ($(window).width() < mediumBreakPoint && $(this).hasClass('js-active')) {
          $(id).clone().removeAttr('id').addClass('cloned').insertAfter($(this)).show();
      }
  });
}

/* ==========================================================================
    tooltips -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

(function($) {

  $.fn.tooltips = function() {
    $('.has-tooltip').each(function() {

        var tooltip = jQuery(this);

        //open event
        tooltip.click(function() {
          tooltip.addClass('hover');
          if ($('.page-cover').length == 0) {
            $(".content").append($("<div>").attr("class","page-cover").bind('click', function() {
              closeTip();
            }));
          }
        });

        //close event
        tooltip.find('.close-tip-modal').bind('click', function() {
          closeTip();
        });

        //close funciton
        var closeTip = function() {
          event.stopPropagation();
          tooltip.removeClass('hover');
          $('.page-cover').remove();
        };

    });
  }

}(jQuery));

$('.has-tooltip').tooltips();
