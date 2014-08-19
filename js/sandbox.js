/* ==========================================================================
    Sandbox -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

    $('.glass-me').click(function(){
    	$('.glass').toggleClass('active');
    });


    $('.settings dd span').each(function () {
      if ($(this).text() == 'No') {
        $(this).parent('dd').hide();
      }
    });

    $('dt span').click(function() {
      $('.settings dd').show();
    });
