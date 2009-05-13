// ==UserScript==
// @name          delicious tag bars
// @namespace     http://thomd.net/userscript
// @description   adds a bar-graph behind the tags list on the right side to see quickly which are your main tags. the bars are displayed with an logarithmic scale.
// @include       http://del.icio.us/*
// @include       http://*.del.icio.us/*
// @include       http://delicious.com/*
// @include       http://*.delicious.com/*
// @author        Thomas Duerr
// @version       0.1
// @date          2008-11-06
// ==/UserScript==


// configuration
var tags = [];
var cloud = {};

var minFontSize = 10;
var maxFontSize = 24;
var fontSizeRange = maxFontSize - minFontSize;

var minOpacity = 40;
var maxOpacity = 100;
var opacityRange = maxOpacity - minOpacity;



//
// xpath helper
//
function $x(p, context){
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

//
// logging helper
//
if(unsafeWindow.console){
	var GM_log = unsafeWindow.console.log;
}

//
// calculate bar-width and bar-opacity (logarithmic scaling)
//
var calculateFontSize = function(){
	for(i = 0; i < tags.length; i++){
		var fontSize    = minFontSize + fontSizeRange * (Math.log(tags[i].count) - cloud.min)/cloud.range;
		tags[i].fsize   = Math.ceil(fontSize);

		var fontOpacity = minOpacity + opacityRange * (Math.log(tags[i].count) - cloud.min)/cloud.range;
		tags[i].opacity = Math.ceil(fontOpacity) / 100;
	}
}






// styles for tag bars
var style  = "";
    style += "";
GM_addStyle(style);


// find all tags and read tag-counts
var _tags = $x("id('rtop-tags')//span[@class='m']");
for (tag in _tags){
	_tags[tag].className += " bar";
}



// calculate relative width of tag-bars



// display bar









//
// ChangeLog
// 2008-11-06 - 0.1 - created
