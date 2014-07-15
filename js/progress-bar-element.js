/* ==========================================================================
    Progress Bar Element -- Version: 0.2.1 - Updated: 7/14/2014
    ========================================================================== */

    (function($) {
      // fn to highlight the matching achievement to hovered progress bar badge
      $.fn.progressBadge = function() {
        $('.mini-badges li').hover(function() {
          var badge = $(this).attr('id');
          loadBadge(badge);
        }, function() {
          var badge = $(this).attr('id');
          unloadBadge(badge);
        });
      }
      // unmute the achievement
      function loadBadge(badge) {
        $('.future').find('#badge' + badge).removeClass('muted');
      }
      // mute the achievement again
      function unloadBadge(badge) {
        $('.future').find('#badge' + badge).addClass('muted');
      }

    }(jQuery));
    // Call the fn only when progress-bar-element is present
    $('.progress-bar-element').progressBadge();
