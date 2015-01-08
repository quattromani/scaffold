/* ==========================================================================
    load time -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

//calculate the time before calling the function in window.onload
var beforeload = (new Date()).getTime();

function getPageLoadTime() {
    //calculate the current time in afterload
    var afterload = (new Date()).getTime();
    // now use the beforeload and afterload to calculate the seconds
    var seconds = (afterload - beforeload) / 1000;
    // Place the seconds in the innerHTML to show the results
    $('.loadtime').text( 'load time ' + seconds + ' sec');
}
window.onload = getPageLoadTime;
