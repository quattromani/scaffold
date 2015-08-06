var placewiseLP = {
    dates : {
        currentDay : new Date()
    },
    dealflow : { },
    search : { },
    helpers : {
        getURLParam : function(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    }
}

$(document).ready(function() {

    // Set offsite links to open in a new tab
    $('a').not('a[href^="/"], a[href^=" /"], a[href=""], a[href^="#"], a[href^="mailto"], a[href^="javascript"]').add('a[href$=".pdf"]').attr('target', '_blank');

    // Calendar - Set background color of past events.
    $('.inside-event').each(function() {
        var self = $(this),
            eventDate = new Date($('a', self).attr('data-date-query').replace(/\-/g, ','));

        if (eventDate < placewiseLP.dates.currentDay) {
            $('> .day', self).css({'background-color' : '#646464'});
        }
    });

    // Calendar Event Ajax
    $('.inside-mon, .current-day').on('click', function(e) {
        e.preventDefault();

        var self = $(this),
            dateQuery = $('.daynumber', self).attr('data-date-query'),
            dateHeading = $('.daynumber', self).attr('data-date-heading'),
            contHeading = $('#calendar-date-info > h2'),
            contContent = $('#calendar-date-info > #calendar-date-content');

        contHeading.html(dateHeading);

        if (self.hasClass('inside-event')) {
            $.ajax({
                type: "get", 
                url: '/get_date_events',
                data: { 'date' : dateQuery},
                success: function(data) {
                    contContent.html(data);
                },
                error: function() {
                    contContent.html("Sorry, something didn't work quite right! Please try refreshing the page and selecting your date again.");
                }
            });

        } else {
            contContent.html('<p id="empty-text"> </p>');
        }

    });

    $('.current-day').click();


    // Twitter Share - Open in New Window
     $('.new-window').click(function(event) {
        var width  = 575,
            height = 400,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = this.href,
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;
        
        window.open(url, 'twitter', opts);
     
        return false;
      });


     // Store Page Deals Tabs
     placewiseLP.dealflow.storeTabs = $('#store-deal-container');
     $('#store-deal-tabs > ul > li', placewiseLP.dealflow.storeTabs).click(function() {
        var self = $(this);
        $('#store-deal-tabs > ul > li', placewiseLP.dealflow.storeTabs).removeClass('active');
        self.addClass('active');
        $('#store-deal-wrapper > div').removeClass('active').filter('[data-tab-content="' + self.attr('data-tab') + '"]').addClass('active');
     }).filter(':first-child').add('#store-deal-wrapper > div:first-child', placewiseLP.dealflow.storeTabs).addClass('active');


     // Products - Highlight Tab from URL Param
     placewiseLP.dealflow.urlParam = placewiseLP.helpers.getURLParam('tabs');
     if (placewiseLP.dealflow.urlParam !== null) {
        $('#store-deal-tabs > ul > li[data-tab="' + placewiseLP.dealflow.urlParam + '"]').click();
        $(window).load(function() {
            $('html, body').animate({
                scrollTop: ($("#store-deal-container").offset().top - 80)
            }, 800);
        })
     }


     // Search Toggle
    placewiseLP.search.timeout;
    placewiseLP.search.closeSearch = function() { 
        $('#search-box > i').removeClass('active');
        $('#search').slideUp(); 
    }
    $("#search-box > i").on('mouseenter', function() {
        $(this).addClass('active');
        clearTimeout(placewiseLP.search.timeout);
        $('#search').slideDown();
    })
    $('header').on('mouseleave', function() {
        if ($('#search-box > #search > input[type="text"]').is(':focus') !== true) {
            placewiseLP.search.timeout = setTimeout(placewiseLP.search.closeSearch, 500);
        }
    });
    $('#search-box > #search > input[type="text"]').blur(function() {
        placewiseLP.search.closeSearch();
    });

});
