function newsTicker() { /// the initializer!
	mTickerMode = "auto";
	newsItems = new Array();
	newsLinks = new Array();
	newsItemCounter = 0;
	currentItem = 0;
	currentLength = 0;
	newsTickerLoop = typeof newsTickerLoop != "undefined" ? newsTickerLoop : false;
	
	jQuery(newsList + ' li').hide();
	
	jQuery(newsList + ' li').each(function(){
		if(jQuery(this).find('a').length) {
			newsItems[newsItemCounter] = jQuery(this).find('a').text();
			newsLinks[newsItemCounter] = jQuery(this).find('a').attr('href');
		} else {
			newsItems[newsItemCounter] = jQuery(this).text();
			newsLinks[newsItemCounter] = '';
		}
		newsItemCounter ++;
	});
	
	newsItemCounter=newsItemCounter - 1;
	
	if(newsItemCounter <= 0) {
		//if there's only one item, hide the newsdirs
		jQuery(".newsdir").hide();
	}

	if(newsItemCounter < 0) {
		//if there's no items, exit. we could also hide the icon or entire mTicker at this point.
		return;
	}

	mTickerTimeOut = setTimeout("runTicker()", startDelay);
}

function runTicker() {
	if(currentItem >= newsItemCounter + 1 && newsItemCounter == 0) {
		/// if there is only one item, don't do this looping stuff. (and looping set false)	
		if (newsTickerLoop == false) {
			return; 
	  }	
		else {
			//reset to beginning values
			newsItemCounter = 0;
			currentItem 		= 0;
			currentLength 	= 0;
		}
	} else if(currentItem >= newsItemCounter + 1) {
		currentItem = 0;
	} else if(currentItem <= -1) {
		currentItem = newsItemCounter;	
	}
	
	if(currentLength == 0) {
		if(newsLinks[currentItem].length > 0) {
			jQuery(newsList).empty().append('<li><a href="'+newsLinks[currentItem]+'"></a></li>');
		} else {
			jQuery(newsList).empty().append('<li></li>');
		}
	}
	
	if(currentLength <= newsItems[currentItem].length+1) {
		///advance one letter
		var tickerText = newsItems[currentItem].substring(0,currentLength);
		if(newsLinks[currentItem].length > 0) {
			jQuery(newsList + ' li a').text(tickerText);
		} else {
			jQuery(newsList + ' li').text(tickerText);
		}
		currentLength ++;
		mTickerTimeOut = setTimeout("runTicker();", tickerRate);
	} else if(mTickerMode == "auto") {
		mTickerTimeOut = setTimeout(function(){currentLength = 0; currentItem++; runTicker();}, loopDelay);
	}
}

function mTickerHandleClick(rel) {
	//alert("item No. " + currentItem);	
	clearTimeout(mTickerTimeOut);
	if(typeof mTickerPauseTimeOut != 'undefined') clearTimeout(mTickerPauseTimeOut);
	currentLength = 0;
	if(rel=='prev') {
		currentItem--;
	} else {
		currentItem++;
	}
	mTickerMode = 'single';
	runTicker();
	mTickerPauseTimeOut = setTimeout(function(){currentLength=0; currentItem++; mTickerMode='auto'; runTicker();}, pauseDelay);
}
