(function () {
    $.fn.infiniteCarousel = function () {
        function repeat(str, n) {
            //console.log("repeating [" + str + "] " + n + " times.");
            return new Array( n + 1 ).join(str);
        }
        
        return this.each(function () {
            // magic!
            var $wrapper = $('> div', this),
                $slider = $wrapper.find('> ul').width(9999),
                $items = $slider.find('> li'),
                $single = $items.filter(':first'),
                autoScroll = $('.autoScroll', this).length,
                rel = $wrapper.attr('rel'),

                singleWidth,
                visible,
                currentPage = 1,
                pages;
                
            singleWidth = $single.outerWidth();
            visible = Math.ceil($wrapper.innerWidth() / singleWidth);
            pages = Math.ceil($items.length / visible);
            
            /* TASKS */
            //console.log(rel);
            //console.log("$wrapper.innerWidth() " + $wrapper.innerWidth() + " | singleWidth " + singleWidth + " | " + $items.length + " items | visible " + visible + " | currentPage " + currentPage + " | pages " + pages);
            
            // 0. if it's not an auto scroller, add the srcs for the first few images
            if(!autoScroll) {
              $('img', this).each(
                function(n){
                  if(n < visible*2|| n >= (pages-1)*visible) {  // 
                    this.src = eval("carouselImages" + rel + "[n]");
                    this.className = "carouselSourceAdded";
                    //console.log("get No. " + n + " | " + eval("carouselImages" + rel + "[n]"));
                  }
                }
              );
            }
            
            // 1. pad the pages with empty element if required
            if ($items.length % visible != 0) {
                // pad
                //console.log("$items.length " + $items.length + " | visible " + visible);
                $slider.append(repeat('<li class="EMPTY" />', visible - ($items.length % visible)));
                $items = $slider.find('> li');
            }
            
            // 2. create the carousel padding on left and right (cloned)
            $items.filter(':first').before($items.slice(-visible).clone().addClass('clone carouselSourceAdded'));
            $items.filter(':last').after($items.slice(0, visible).clone().addClass('clone carouselSourceAdded'));
            $items = $slider.find('> li');
            $('.clone a').removeAttr('rel'); // remove rel from the cloned items, or else we get double items in the slideshow.
            
            //console.log("padding added. | " + $items.length + " items");
            
            // 3. reset scroll
            $wrapper.scrollLeft(singleWidth * visible);
            
            // 4. paging function
            function gotoPage(page) {
                var dir = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleWidth * dir * visible * n;
                
                $wrapper.filter(':not(:animated)').animate({
                    scrollLeft : '+=' + left
                }, 1000, function () {
                    // if page == last page - then reset position
                    if (page > pages) {
                        $wrapper.scrollLeft(singleWidth * visible);
                        page = 1;
                    } else if (page == 0) {
                        page = pages;
                        $wrapper.scrollLeft(singleWidth * visible * pages);
                    }
                    
                    currentPage = page;
                });
                
                if(!autoScroll) {
                  //console.log("visible " + visible + " | currentPage " + currentPage + " | " + rel);
                  $('div.infiniteCarousel div.[rel="' + rel + '"] img').each(
                    function(n){
                      //console.log("currentPage " + currentPage + " | counter " + n + " | " + this.tagName + " | " + rel + eval("carouselImages" + rel + "[n]"));
                      //console.log(this.className);
                      if(this.className != "carouselSourceAdded" && n > ((currentPage-1)*visible) && n < ((currentPage+2)*visible)) {
                        this.src = eval("carouselImages" + rel + "[n]");
                        this.className = "carouselSourceAdded";
                        //console.log("get No. " + n + " | " + eval("carouselImages" + rel + "[n]"));
                      }
                    }
                  ); 
                
                }//$items.each(showImage(visible, currentPage));
            }
            
            // 5. insert the back and forward link
            //$wrapper.after('<a href="#" class="arrow back">&lt;</a><a href="#" class="arrow forward">&gt;</a>');
            
            // 6. bind the back and forward links
            $('a.back', this).click(function () {
                gotoPage(currentPage - 1);
                return false;
            });
            
            $('a.forward', this).click(function () {
                gotoPage(currentPage + 1);
                return false;
            });
            
            $(this).bind('goto', function (event, page) {
                gotoPage(page);
            });
            
            // THIS IS NEW CODE FOR THE AUTOMATIC INFINITE CAROUSEL
            $(this).bind('next', function () {
                gotoPage(currentPage + 1);
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    // THIS IS NEW CODE FOR THE AUTOMATIC INFINITE CAROUSEL
    var autoscrolling = true;
    
    $('.infiniteCarousel').infiniteCarousel();

    $('.infiniteCarousel.autoScroll').mouseover(function () {
        autoscrolling = false;
    }).mouseout(function () {
        autoscrolling = true;
    });
    
    setInterval(function () {
        if (autoscrolling) {
            $('.infiniteCarousel.autoScroll').trigger('next');
        }
    }, 4000);
});
