/* ==========================================================================
    Progress Buttons -- Version: 0.2.1 - Updated: 5/14/2014
   ========================================================================== */

$('.progress').click(function() {
    $(this).addClass('js-active');
    $('.progress.js-active i').progressButton();
});

$('.progress.js-active i').progressButton();