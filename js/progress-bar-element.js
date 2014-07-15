/* ==========================================================================
    Progress Bar Element -- Version: 0.2.1 - Updated: 7/14/2014
    ========================================================================== */

    (function($) {

      $.fn.progressBadge = function() {
        $('.mini-badge').hover(function() {
          var badge = $(this).attr('id');
          loadBadge(badge);
        }, function() {
          var badge = $(this).attr('id');
          unloadBadge(badge);
        });
      }

      function loadBadge(badge) {
        $('#badge' + badge).removeClass('muted');
      }

      function unloadBadge(badge) {
        $('#badge' + badge).addClass('muted');
      }

    }(jQuery));

    $('.progress-bar-element').progressBadge();
