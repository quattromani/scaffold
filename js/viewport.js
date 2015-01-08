/* ==========================================================================
    vieport -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

(function($) {

  $.fn.viewport = function() {
    // Calculate the viewport size on prototype site
    $(window).resize(function() {
      $('.viewport').empty().append($(window).width(), "x", $(window).height());
    }).resize();
  }

}(jQuery));

$('.viewport').viewport();
