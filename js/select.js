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