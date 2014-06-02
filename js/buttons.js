/* ==========================================================================
    Progress Buttons -- Version: 0.2.1 - Updated: 5/14/2014
   ========================================================================== */

// $('.progress').click(function() {
//   $(this).attr("disabled", true);
//   $(this).addClass('js-active');
//   $('.progress.js-active i').progressButton();
// });

(function($) {

  $.fn.progressButton = function() {
    $('.progression').click(function() {
      $(this).attr("disabled", true);
      $(this).addClass('js-active');
    });
  }

}(jQuery));

$('.progression').progressButton();
