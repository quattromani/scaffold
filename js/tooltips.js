/* ==========================================================================
    tooltips -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

(function($) {

  $.fn.tooltips = function() {
    $('.has-tooltip').each(function() {
      if($(window).width() <= mediumBreakPoint && isTouch == true) {
        var tooltip = jQuery(this);

        tooltip.click(function() {
          tooltip.addClass('hover');
        });

        jQuery('*').not(tooltip).bind('click', function() {
          tooltip.removeClass('hover');
        });
      }
    });
  }

}(jQuery));

$('.has-tooltip').tooltips();
