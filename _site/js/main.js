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
