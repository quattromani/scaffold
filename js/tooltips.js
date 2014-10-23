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
