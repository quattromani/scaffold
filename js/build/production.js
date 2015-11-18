var smallBreakPoint = 640;
var mediumBreakPoint = 768;
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
    $('.loadtime').text( + seconds + ' sec');
}
window.onload = getPageLoadTime;

/* ==========================================================================
    Styleguide -- Version: 0.4.1 - Updated: 2/22/2014
    ========================================================================== */

// Create Hex color code from color return
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

// Get color value of swatch and print to div
var color = '';
$('.swatch').each(function() {
    var classList = $(this).children('.swatch-color').attr('class').split(' ');
    for(i=0; i <= classList.length-1; i++){
     if(classList[i].match(/color-/g)){
         $(this).children('.swatch-info').prepend('<p>$' + classList[i] + '</p>');
         break;
     }
 }
 var x = $(this).children('.swatch-color').css('backgroundColor');
 hexc(x);
 $(this).children('.swatch-info').append('<p>' + color + '</p>');
 $(this).children('.swatch-info').append('<p>' + x + '</p>');
});

(function($) {

    $.fn.vs = function() {
        // View source buttons
        $('.vs').click(function(){
            $(this).parent().next().find('.prettyprint').toggle();
            $(this).not('.disabled').toggleClass('js-active');
            return false;
        });
    }

}(jQuery));

$('.vs').vs();

// Get font-family property and return
$('.fonts').each(function(){
    var fonts = $(this).css('font-family');
    $(this).prepend(fonts);
});

// Add a 'fold' line to prototype in mobile only
var overlay = jQuery('<div class="fold">the fold</div>');
$(window).resize(function() {
    overlay.appendTo(document.body);
}).resize();

/* ==========================================================================
    Accordion -- Version: 1.9.0.0 - Updated: 12/31/2013
   ========================================================================== */

$('.accordion .expandable ul li').each(function() {
	if ($(this).has('ul').length) {
		$(this).addClass('js-expandable');
	} else {
		$(this).addClass('js-notexpandable');
	}
});

$('.accordion .expandable h6').click(function() {
	var categoryText = $(this).text();
	$(this).parent().addClass('js-active').find('ul').slideToggle(function() {
		if ($(this).is(':hidden')) {
			$(this).parent().removeClass('js-active');
		}
	});
});

/* ==========================================================================
    browser-alert -- Version: 0.1.1 - Updated: 12/17/2014
    ========================================================================== */

(function($) {

  $.fn.browserAlert = function() {
    $('.browser-alert').each(function() {

      var alert = jQuery(this);



    });
  }

}(jQuery));

$('.browser-alert').browserAlert();

/*
 * flowplayer.js 3.2.6. The Flowplayer API
 *
 * Copyright 2009-2011 Flowplayer Oy
 *
 * This file is part of Flowplayer.
 *
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Date: 2011-02-04 05:45:28 -0500 (Fri, 04 Feb 2011)
 * Revision: 614
 */
(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.slice(0,q)||"*";var o=s.slice(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).slice(2,10)}var h=function(t,r,s){var q=this,p={},u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.slice(0,v.length-1);var w="onBefore"+v.slice(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(y&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v)!=-1){i(A,y);if(y.metaData){if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var o=this,s={},u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var z=q._api().fp_getPlugin(p);if(!z){return}i(o,z);delete o.methods;if(!u){m(z.methods,function(){var B=""+this;o[B]=function(){var C=[].slice.call(arguments);var D=q._api().fp_invoke(p,B,C);return D==="undefined"||D===undefined?o:D}});u=true}}var A=s[w];if(A){var y=A.apply(o,v);if(w.slice(0,1)=="_"){delete s[w]}return y}return o}})};function b(q,G,t){var w=this,v=null,D=false,u,s,F=[],y={},x={},E,r,p,C,o,A;i(w,{id:function(){return E},isLoaded:function(){return(v!==null&&v.fp_play!==undefined&&!D)},getParent:function(){return q},hide:function(H){if(H){q.style.height="0px"}if(w.isLoaded()){v.style.height="0px"}return w},show:function(){q.style.height=A+"px";if(w.isLoaded()){v.style.height=o+"px"}return w},isHidden:function(){return w.isLoaded()&&parseInt(v.style.height,10)===0},load:function(J){if(!w.isLoaded()&&w._fireEvent("onBeforeLoad")!==false){var H=function(){u=q.innerHTML;if(u&&!flashembed.isSupported(G.version)){q.innerHTML=""}if(J){J.cached=true;j(x,"onLoad",J)}flashembed(q,G,{config:t})};var I=0;m(a,function(){this.unload(function(K){if(++I==a.length){H()}})})}return w},unload:function(J){if(this.isFullscreen()&&/WebKit/i.test(navigator.userAgent)){if(J){J(false)}return w}if(u.replace(/\s/g,"")!==""){if(w._fireEvent("onBeforeUnload")===false){if(J){J(false)}return w}D=true;try{if(v){v.fp_close();w._fireEvent("onUnload")}}catch(H){}var I=function(){v=null;q.innerHTML=u;D=false;if(J){J(true)}};setTimeout(I,50)}else{if(J){J(false)}}return w},getClip:function(H){if(H===undefined){H=C}return F[H]},getCommonClip:function(){return s},getPlaylist:function(){return F},getPlugin:function(H){var J=y[H];if(!J&&w.isLoaded()){var I=w._api().fp_getPlugin(H);if(I){J=new l(H,I,w);y[H]=J}}return J},getScreen:function(){return w.getPlugin("screen")},getControls:function(){return w.getPlugin("controls")._fireEvent("onUpdate")},getLogo:function(){try{return w.getPlugin("logo")._fireEvent("onUpdate")}catch(H){}},getPlay:function(){return w.getPlugin("play")._fireEvent("onUpdate")},getConfig:function(H){return H?k(t):t},getFlashParams:function(){return G},loadPlugin:function(K,J,M,L){if(typeof M=="function"){L=M;M={}}var I=L?e():"_";w._api().fp_loadPlugin(K,J,M,I);var H={};H[I]=L;var N=new l(K,null,w,H);y[K]=N;return N},getState:function(){return w.isLoaded()?v.fp_getState():-1},play:function(I,H){var J=function(){if(I!==undefined){w._api().fp_play(I,H)}else{w._api().fp_play()}};if(w.isLoaded()){J()}else{if(D){setTimeout(function(){w.play(I,H)},50)}else{w.load(function(){J()})}}return w},getVersion:function(){var I="flowplayer.js 3.2.6";if(w.isLoaded()){var H=v.fp_getVersion();H.push(I);return H}return I},_api:function(){if(!w.isLoaded()){throw"Flowplayer "+w.id()+" not loaded when calling an API method"}return v},setClip:function(H){w.setPlaylist([H]);return w},getIndex:function(){return p},_swfHeight:function(){return v.clientHeight}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","),function(){var H="on"+this;if(H.indexOf("*")!=-1){H=H.slice(0,H.length-1);var I="onBefore"+H.slice(2);w[I]=function(J){j(x,I,J);return w}}w[H]=function(J){j(x,H,J);return w}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled").split(","),function(){var H=this;w[H]=function(J,I){if(!w.isLoaded()){return w}var K=null;if(J!==undefined&&I!==undefined){K=v["fp_"+H](J,I)}else{K=(J===undefined)?v["fp_"+H]():v["fp_"+H](J)}return K==="undefined"||K===undefined?w:K}});w._fireEvent=function(Q){if(typeof Q=="string"){Q=[Q]}var R=Q[0],O=Q[1],M=Q[2],L=Q[3],K=0;if(t.debug){g(Q)}if(!w.isLoaded()&&R=="onLoad"&&O=="player"){v=v||c(r);o=w._swfHeight();m(F,function(){this._fireEvent("onLoad")});m(y,function(S,T){T._fireEvent("onUpdate")});s._fireEvent("onLoad")}if(R=="onLoad"&&O!="player"){return}if(R=="onError"){if(typeof O=="string"||(typeof O=="number"&&typeof M=="number")){O=M;M=L}}if(R=="onContextMenu"){m(t.contextMenu[O],function(S,T){T.call(w)});return}if(R=="onPluginEvent"||R=="onBeforePluginEvent"){var H=O.name||O;var I=y[H];if(I){I._fireEvent("onUpdate",O);return I._fireEvent(M,Q.slice(3))}return}if(R=="onPlaylistReplace"){F=[];var N=0;m(O,function(){F.push(new h(this,N++,w))})}if(R=="onClipAdd"){if(O.isInStream){return}O=new h(O,M,w);F.splice(M,0,O);for(K=M+1;K<F.length;K++){F[K].index++}}var P=true;if(typeof O=="number"&&O<F.length){C=O;var J=F[O];if(J){P=J._fireEvent(R,M,L)}if(!J||P!==false){P=s._fireEvent(R,M,L,J)}}m(x[R],function(){P=this.call(w,O,M);if(this.cached){x[R].splice(K,1)}if(P===false){return false}K++});return P};function B(){if($f(q)){$f(q).getParent().innerHTML="";p=$f(q).getIndex();a[p]=w}else{a.push(w);p=a.length-1}A=parseInt(q.style.height,10)||q.clientHeight;E=q.id||"fp"+e();r=G.id||E+"_api";G.id=r;t.playerId=E;if(typeof t=="string"){t={clip:{url:t}}}if(typeof t.clip=="string"){t.clip={url:t.clip}}t.clip=t.clip||{};if(q.getAttribute("href",2)&&!t.clip.url){t.clip.url=q.getAttribute("href",2)}s=new h(t.clip,-1,w);t.playlist=t.playlist||[t.clip];var I=0;m(t.playlist,function(){var K=this;if(typeof K=="object"&&K.length){K={url:""+K}}m(t.clip,function(L,M){if(M!==undefined&&K[L]===undefined&&typeof M!="function"){K[L]=M}});t.playlist[I]=K;K=new h(K,I,w);F.push(K);I++});m(t,function(K,L){if(typeof L=="function"){if(s[K]){s[K](L)}else{j(x,K,L)}delete t[K]}});m(t.plugins,function(K,L){if(L){y[K]=new l(K,L,w)}});if(!t.plugins||t.plugins.controls===undefined){y.controls=new l("controls",null,w)}y.canvas=new l("canvas",null,w);u=q.innerHTML;function J(L){var K=w.hasiPadSupport&&w.hasiPadSupport();if(/iPad|iPhone|iPod/i.test(navigator.userAgent)&&!/.flv$/i.test(F[0].url)&&!K){return true}if(!w.isLoaded()&&w._fireEvent("onBeforeClick")!==false){w.load()}return f(L)}function H(){if(u.replace(/\s/g,"")!==""){if(q.addEventListener){q.addEventListener("click",J,false)}else{if(q.attachEvent){q.attachEvent("onclick",J)}}}else{if(q.addEventListener){q.addEventListener("click",f,false)}w.load()}}setTimeout(H,0)}if(typeof q=="string"){var z=c(q);if(!z){throw"Flowplayer cannot access element: "+q}q=z;B()}else{B()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var t=arguments[1],q=(arguments.length==3)?arguments[2]:{};if(typeof t=="string"){t={src:t}}t=i({bgcolor:"#000000",version:[9,0],expressInstall:"http://static.flowplayer.org/swf/expressinstall.swf",cachebusting:false},t);if(typeof o=="string"){if(o.indexOf(".")!=-1){var s=[];m(n(o),function(){s.push(new b(this,k(t),k(q)))});return new d(s)}else{var r=c(o);return new b(r!==null?r:o,t,q)}}else{if(o){return new b(o,t,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(typeof jQuery=="function"){jQuery.fn.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";var i={width:"100%",height:"100%",allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(e){jQuery.tools=jQuery.tools||{};jQuery.tools.flashembed={version:"1.0.4",conf:i}}function j(){if(c.done){return false}var l=document;if(l&&l.getElementsByTagName&&l.getElementById&&l.body){clearInterval(c.timer);c.timer=null;for(var k=0;k<c.ready.length;k++){c.ready[k].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(k){if(c.done){return k()}if(c.timer){c.ready.push(k)}else{c.ready=[k];c.timer=setInterval(j,13)}};function f(l,k){if(k){for(key in k){if(k.hasOwnProperty(key)){l[key]=k[key]}}}return l}function g(k){switch(h(k)){case"string":k=k.replace(new RegExp('(["\\\\])',"g"),"\\$1");k=k.replace(/^\s?(\d+)%/,"$1pct");return'"'+k+'"';case"array":return"["+b(k,function(n){return g(n)}).join(",")+"]";case"function":return'"function()"';case"object":var l=[];for(var m in k){if(k.hasOwnProperty(m)){l.push('"'+m+'":'+g(k[m]))}}return"{"+l.join(",")+"}"}return String(k).replace(/\s/g," ").replace(/\'/g,'"')}function h(l){if(l===null||l===undefined){return false}var k=typeof l;return(k=="object"&&l.push)?"array":k}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(k,n){var m=[];for(var l in k){if(k.hasOwnProperty(l)){m[l]=n(k[l])}}return m}function a(r,t){var q=f({},r);var s=document.all;var n='<object width="'+q.width+'" height="'+q.height+'"';if(s&&!q.id){q.id="_"+(""+Math.random()).substring(9)}if(q.id){n+=' id="'+q.id+'"'}if(q.cachebusting){q.src+=((q.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(q.w3c||!s){n+=' data="'+q.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(q.w3c||s){n+='<param name="movie" value="'+q.src+'" />'}q.width=q.height=q.id=q.w3c=q.src=null;for(var l in q){if(q[l]!==null){n+='<param name="'+l+'" value="'+q[l]+'" />'}}var o="";if(t){for(var m in t){if(t[m]!==null){o+=m+"="+(typeof t[m]=="object"?g(t[m]):t[m])+"&"}}o=o.substring(0,o.length-1);n+='<param name="flashvars" value=\''+o+"' />"}n+="</object>";return n}function d(m,p,l){var k=flashembed.getVersion();f(this,{getContainer:function(){return m},getConf:function(){return p},getVersion:function(){return k},getFlashvars:function(){return l},getApi:function(){return m.firstChild},getHTML:function(){return a(p,l)}});var q=p.version;var r=p.expressInstall;var o=!q||flashembed.isSupported(q);if(o){p.onFail=p.version=p.expressInstall=null;m.innerHTML=a(p,l)}else{if(q&&r&&flashembed.isSupported([6,65])){f(p,{src:r});l={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};m.innerHTML=a(p,l)}else{if(m.innerHTML.replace(/\s/g,"")!==""){}else{m.innerHTML="<h2>Flash version "+q+" or greater is required</h2><h3>"+(k[0]>0?"Your version is "+k:"You have no flash plugin installed")+"</h3>"+(m.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(m.tagName=="A"){m.onclick=function(){location.href="http://www.adobe.com/go/getflashplayer"}}}}}if(!o&&p.onFail){var n=p.onFail.call(this);if(typeof n=="string"){m.innerHTML=n}}if(document.all){window[p.id]=document.getElementById(p.id)}}window.flashembed=function(l,m,k){if(typeof l=="string"){var n=document.getElementById(l);if(n){l=n}else{c(function(){flashembed(l,m,k)});return}}if(!l){return}if(typeof m=="string"){m={src:m}}var o=f({},i);f(o,m);return new d(l,o,k)};f(window.flashembed,{getVersion:function(){var m=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var l=navigator.plugins["Shockwave Flash"].description;if(typeof l!="undefined"){l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var n=parseInt(l.replace(/^(.*)\..*$/,"$1"),10);var r=/r/.test(l)?parseInt(l.replace(/^.*r(.*)$/,"$1"),10):0;m=[n,r]}}else{if(window.ActiveXObject){try{var p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(q){try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");m=[6,0];p.AllowScriptAccess="always"}catch(k){if(m[0]==6){return m}}try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(o){}}if(typeof p=="object"){l=p.GetVariable("$version");if(typeof l!="undefined"){l=l.replace(/^\S+\s+(.*)$/,"$1").split(",");m=[parseInt(l[0],10),parseInt(l[2],10)]}}}}return m},isSupported:function(k){var m=flashembed.getVersion();var l=(m[0]>k[0])||(m[0]==k[0]&&m[1]>=k[1]);return l},domReady:c,asString:g,getHTML:a});if(e){jQuery.fn.flashembed=function(l,k){var m=null;this.each(function(){m=flashembed(this,l,k)});return l.api===false?this:m}}})();

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

/* ==========================================================================
    Modal -- Version: 1.9.0.0 - Updated: 4/28/2014
   ========================================================================== */

$(function(){
	$('.modal-button').click(function() {
		var modal = $(this).attr('id');
		loadPopup(modal);
		return false;
	});
	$('.modal-next').click(function() {
		var modal = $(this).attr('data-next');
		var currModal = modal - 1;
		loadPopup(modal, currModal);
		return false;
	});
	$('.modal-prev').click(function() {
		var modal = $(this).attr('data-prev');
		var currModal = modal - 1 + 2;
		loadPopup(modal, currModal);
		return false;
	});
	// event for close the popup
	$('.modal-close').click(function() {
		disablePopup();
		return false;
	});
	$(this).keyup(function(event) {
		if (event.which === 27) {
			disablePopup();
		}
	});
	$('.modal-overlay').click(function() {
		disablePopup();
		return false;
	});
});

function loadPopup(modal, currModal) {
	$('#modal' + currModal).css({
		'display': 'none'
	});
	$('#modal' + modal).css({
		'margin-top': -$('#modal' + modal).height() / 2,
		'display': 'block'
	});
	$('.modal-next').attr('data-next', modal - 1 + 2);
	$('.modal-prev').attr('data-prev', modal - 1);
	$('#modal' + modal).fadeIn(0500);
	$('.modal-overlay').fadeIn('normal');
}

function disablePopup() {
	$('.modal-container').fadeOut('normal');
	$('.modal-overlay').fadeOut('normal');
}

/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
          'focus.placeholder': clearPlaceholder,
          'blur.placeholder': setPlaceholder
        })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
            // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don't get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({ 'type': 'text' });
          } catch(e) {
            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
          }
          $replacement
            .removeAttr('name')
            .data({
              'placeholder-password': $input,
              'placeholder-id': id
            })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
              'placeholder-textinput': $replacement,
              'placeholder-id': id
            })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    // Avoid IE9 `document.activeElement` of death
    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
    try {
      return document.activeElement;
    } catch (exception) {}
  }

}(this, document, jQuery));

$('input, textarea').placeholder();

/**
 * Plugin: jquery.zRSSFeed
 *
 * Version: 1.2.0
 * (c) Copyright 2010-2013, Zazar Ltd
 *
 * Description: jQuery plugin for display of RSS feeds via Google Feed API
 *              (Based on original plugin jGFeed by jQuery HowTo. Filesize function by Cary Dunn.)
 *
 * History:
 * 1.2.0 - Added month names to date formats
 * 1.1.9 - New dateformat option to allow feed date formatting
 * 1.1.8 - Added historical option to enable scoring in the Google Feed API
 * 1.1.7 - Added feed offset, link redirect & link content options
 * 1.1.6 - Added sort options
 * 1.1.5 - Target option now applies to all feed links
 * 1.1.4 - Added option to hide media and now compressed with Google Closure
 * 1.1.3 - Check for valid published date
 * 1.1.2 - Added user callback function due to issue with ajaxStop after jQuery 1.4.2
 * 1.1.1 - Correction to null xml entries and support for media with jQuery < 1.5
 * 1.1.0 - Added support for media in enclosure tags
 * 1.0.3 - Added feed link target
 * 1.0.2 - Fixed issue with GET parameters (Seb Dangerfield) and SSL option
 * 1.0.1 - Corrected issue with multiple instances
 *
 **/

(function($){

	$.fn.rssfeed = function(url, options, fn) {

		// Set plugin defaults
		var defaults = {
			limit: 10,
			offset: 1,
			header: true,
			titletag: 'h4',
			date: true,
			dateformat: 'datetime',
			content: true,
			snippet: true,
			media: true,
			showerror: true,
			errormsg: '',
			key: null,
			ssl: false,
			linktarget: '_self',
			linkredirect: '',
			linkcontent: false,
			sort: '',
			sortasc: true,
			historical: false
		};
		var options = $.extend(defaults, options);

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			var s = '';

			// Check for SSL protocol
			if (options.ssl) s = 's';

			// Add feed class to user div
			if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');

			// Check for valid url
			if(url == null) return false;

			// Add start offset to feed length
			if (options.offset > 0) options.offset -= 1;
			options.limit += options.offset;

			// Create Google Feed API address
			var api = "http"+ s +"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url);
			api += "&num=" + options.limit;
			if (options.historical) api += "&scoring=h";
			if (options.key != null) api += "&key=" + options.key;
			api += "&output=json_xml"

			// Send request
			$.getJSON(api, function(data){

				// Check for error
				if (data.responseStatus == 200) {

					// Process the feeds
					_process(e, data.responseData, options);

					// Optional user callback function
					if ($.isFunction(fn)) fn.call(this,$e);

				} else {

					// Handle error if required
					if (options.showerror)
						if (options.errormsg != '') {
							var msg = options.errormsg;
						} else {
							var msg = data.responseDetails;
						};
						$(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
				};
			});
		});
	};

	// Function to create HTML result
	var _process = function(e, data, options) {

		// Get JSON feed data
		var feeds = data.feed;
		if (!feeds) {
			return false;
		}
		var rowArray = [];
		var rowIndex = 0;
		var html = '';
		var row = 'odd';

		// Get XML data for media (parseXML not used as requires 1.5+)
		if (options.media) {
			var xml = _getXMLDocument(data.xmlString);
			var xmlEntries = xml.getElementsByTagName('item');
		}

		// Add header if required
		if (options.header)
			html +=	'<div class="rssHeader">' +
				'<a href="'+feeds.link+'" title="'+ feeds.description +'">'+ feeds.title +'</a>' +
				'</div>';

		// Add body
		html += '<div class="rssBody">' +
			'<ul>';


		// Add feeds
		for (var i=options.offset; i<feeds.entries.length; i++) {

			rowIndex = i - options.offset;
			rowArray[rowIndex] = [];

			// Get individual feed
			var entry = feeds.entries[i];
			var pubDate;
			var sort = '';
			var feedLink = entry.link;

			// Apply sort column
			switch (options.sort) {
				case 'title':
					sort = entry.title;
					break;
				case 'date':
					sort = entry.publishedDate;
					break;
			}
			rowArray[rowIndex]['sort'] = sort;

			// Format published date
			if (entry.publishedDate) {

				var entryDate = new Date(entry.publishedDate);
				var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();

				switch (options.dateformat) {
					case 'datetime':
						break;
					case 'date':
						pubDate = entryDate.toLocaleDateString();
						break;
					case 'time':
						pubDate = entryDate.toLocaleTimeString();
						break;
					case 'timeline':
						pubDate = _getLapsedTime(entryDate);
						break;
					default:
						pubDate = _formatDate(entryDate,options.dateformat);
						break;
				}
			}

			// Add feed row
			if (options.linkredirect) feedLink = encodeURIComponent(feedLink);
			rowArray[rowIndex]['html'] = '<'+ options.titletag +'><a href="'+ options.linkredirect + feedLink +'" title="View this feed at '+ feeds.title +'">'+ entry.title +'</a></'+ options.titletag +'>'

			if (options.date && pubDate) rowArray[rowIndex]['html'] += '<div class="pubDate">'+ pubDate +'</div>'
			if (options.content) {

				// Use feed snippet if available and optioned
				if (options.snippet && entry.contentSnippet != '') {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;
				}

				if (options.linkcontent) {
					content = '<a href="'+ options.linkredirect + feedLink +'" title="View this feed at '+ feeds.title +'">'+ content +'</a>'
				}

				rowArray[rowIndex]['html'] += '<p>'+ content +'</p>'
				rowArray[rowIndex]['html'] += '<a class="read-more" href="'+ options.linkredirect + feedLink +'">Read More &raquo;</a>'

			}

			// Add any media
			if (options.media && xmlEntries.length > 0) {
				var xmlMedia = xmlEntries[i].getElementsByTagName('enclosure');
				if (xmlMedia.length > 0) {

					rowArray[rowIndex]['html'] += '<div class="rssMedia"><div>Media files</div><ul>'

					for (var m=0; m<xmlMedia.length; m++) {
						var xmlUrl = xmlMedia[m].getAttribute("url");
						var xmlType = xmlMedia[m].getAttribute("type");
						var xmlSize = xmlMedia[m].getAttribute("length");
						rowArray[rowIndex]['html'] += '<li><a href="'+ xmlUrl +'" title="Download this media">'+ xmlUrl.split('/').pop() +'</a> ('+ xmlType +', '+ _formatFilesize(xmlSize) +')</li>';
					}
					rowArray[rowIndex]['html'] += '</ul></div>'
				}
			}

		}

		// Sort if required
		if (options.sort) {
			rowArray.sort(function(a,b) {

				// Apply sort direction
				if (options.sortasc) {
					var c = a['sort'];
					var d = b['sort'];
				} else {
					var c = b['sort'];
					var d = a['sort'];
				}

				if (options.sort == 'date') {
					return new Date(c) - new Date(d);
				} else {
					c = c.toLowerCase();
					d = d.toLowerCase();
					return (c < d) ? -1 : (c > d) ? 1 : 0;
				}
			});
		}

		// Add rows to output
		$.each(rowArray, function(e) {

			html += '<li class="rssRow '+row+'">' + rowArray[e]['html'] + '</li>';

			// Alternate row classes
			if (row == 'odd') {
				row = 'even';
			} else {
				row = 'odd';
			}
		});

		html += '</ul>' +
			'</div>'

		$(e).html(html);

		// Apply target to links
		$('a',e).attr('target',options.linktarget);
	};

	var _formatFilesize = function(bytes) {
		var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
	}

	var _formatDate = function(date,mask) {

		// Convert to date and set return to the mask
		var fmtDate = new Date(date);
		date = mask;

		// Replace mask tokens
		date = date.replace('dd', _formatDigit(fmtDate.getDate()));
		date = date.replace('MMMM', _getMonthName(fmtDate.getMonth()));
		date = date.replace('MM', _formatDigit(fmtDate.getMonth()+1));
		date = date.replace('yyyy',fmtDate.getFullYear());
		date = date.replace('hh', _formatDigit(fmtDate.getHours()));
		date = date.replace('mm', _formatDigit(fmtDate.getMinutes()));
		date = date.replace('ss', _formatDigit(fmtDate.getSeconds()));

		return date;
	}

	var _formatDigit = function(digit) {
		digit += '';
		if (digit.length < 2) digit = '0' + digit;
		return digit;
	}

	var _getMonthName = function(month) {
		var name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		return name[month];
	}

	var _getXMLDocument = function(string) {
		var browser = navigator.appName;
		var xml;
		if (browser == 'Microsoft Internet Explorer') {
			xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.async = 'false';
			xml.loadXML(string);
		} else {
			xml = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return xml;
	}

	var _getLapsedTime = function(date) {

		// Get current date and format date parameter
		var todayDate = new Date();
		var pastDate = new Date(date);

		// Get lasped time in seconds
		var lapsedTime = Math.round((todayDate.getTime() - pastDate.getTime())/1000)

		// Return lasped time in seconds, minutes, hours, days and weeks
		if (lapsedTime < 60) {
			return '< 1 min';
		} else if (lapsedTime < (60*60)) {
			var t = Math.round(lapsedTime / 60) - 1;
			var u = 'min';
		} else if (lapsedTime < (24*60*60)) {
			var t = Math.round(lapsedTime / 3600) - 1;
			var u = 'hour';
		} else if (lapsedTime < (7*24*60*60)) {
			var t = Math.round(lapsedTime / 86400) - 1;
			var u = 'day';
		} else {
			var t = Math.round(lapsedTime / 604800) - 1;
			var u = 'week';
		}

		// Check for plural units
		if (t > 1) u += 's';
		return t + ' ' + u;
	}

})(jQuery);

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

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

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
/* ==========================================================================
    Tabs to Accordion -- Version: 1.9.0.2 - Updated: 1/7/2013
   ========================================================================== */

$(function() {
  tabCount = 1;
  $('.tab-component').each(function(index){
      $(this).addClass('onState_'+tabCount);
      tabCount++;
  });

  buildAccordion();

  $(window).bind("load", function(){
      adjustContent();
  });

  $('[class*=onState_] .tabs li').click(function() {
      var selected_tab = $(this).find('a').attr('data-ref');
      var onState =  $(this).parent().parent().parent().attr('class');
      var className = onState.split(" ");
      var finalName = className.pop();

      $('.'+finalName+' .tabs li').removeClass('js-active');
      $(this).addClass('js-active');

      if ($(window).width() > mediumBreakPoint) {
          $('.'+finalName+' .tab-content').hide();
          $('.'+finalName+' '+selected_tab).show();
      } else {
          $('.'+finalName+' .tab-content').slideUp();
          $(this).next().slideDown();
      }

      return false;
  });

  $(window).resize(function() {
     adjustContent();
  });
});

function adjustContent() {
  if ($(window).width() < mediumBreakPoint) {
      $('[class*=onState_] .tabs ul').find('li.js-active').next('div').show();
  } else {
      $('.cloned').hide();
      $('[class*=onState_]').each(function(index){
          var onState =  $(this).attr('class');
          var className = onState.split(" ");
          var finalName = className.pop();
          var toShow = $('.'+finalName+' .js-active a').attr('data-ref');
          $('.'+finalName+' .tab-content-container').find(toShow).show();
      });
  }
}

function buildAccordion(){
  $('.tab-component .tabs ul li').each(function(){
      id = $(this).find('a').attr('data-ref');
      $(id).clone().removeAttr('id').addClass('cloned').insertAfter($(this)).hide();

      if ($(window).width() < mediumBreakPoint && $(this).hasClass('js-active')) {
          $(id).clone().removeAttr('id').addClass('cloned').insertAfter($(this)).show();
      }
  });
}

/* ==========================================================================
    tooltips -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

(function($) {

  $.fn.tooltips = function() {
    $('.has-tooltip').each(function() {

        var tooltip = jQuery(this);

        //open event
        tooltip.click(function() {
          tooltip.addClass('hover');
          if ($('.page-cover').length == 0) {
            $(".content").append($("<div>").attr("class","page-cover").bind('click', function() {
              closeTip();
            }));
          }
        });

        //close event
        tooltip.find('.close-tip-modal').bind('click', function() {
          closeTip();
        });

        //close funciton
        var closeTip = function() {
          event.stopPropagation();
          tooltip.removeClass('hover');
          $('.page-cover').remove();
        };

    });
  }

}(jQuery));

$('.has-tooltip').tooltips();

/* ==========================================================================
    viewport -- Version: 0.2.2 - Updated: 7/26/2014
    ========================================================================== */

(function($) {

  $.fn.viewport = function() {
    // Calculate the viewport size on prototype site
    $(window).resize(function() {
      $('.viewport').empty().append($(window).width(), "x", $(window).height());
    }).resize();
  }

}(jQuery));

$('.viewport').viewport();
