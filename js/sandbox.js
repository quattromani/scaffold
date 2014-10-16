/* ==========================================================================
    sandbox -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

    // $(function() {
    //   $(".radio.reveally").click(function() {
    //     var cat = $(this).val();

    //     $(".hidden").hide();
    //     $(".category" + cat).fadeIn(500);
    //   });
    // });

    $(function() {
      $(".radio.reveally").change(function() {
        var cat = $(this).val();

        if(this.checked) {
          $(".hidden").hide();
          $(".category" + cat).slideDown(500);
        }
      });

      $('button[type=reset]').click(function () {
        $(".hidden").slideUp(500);
      });
    });
