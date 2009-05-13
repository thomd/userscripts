// ==UserScript==
// @name          I love words
// @namespace     http://thomd.net/userscript
// @description   what are the most used words of the pages you visit?
// @include       *
// @author        Thomas Duerr
// @version       0.1
// @date          2009-03-28
// ==/UserScript==


//
// xpath helper
//
function $x(p, context){
    contextNode = context || document;
    var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


//
// Logging for Firebug
//
if(unsafeWindow.console){
	var GM_log = unsafeWindow.console.log;
}


//
// extract all words within a page and save in hash
//
var tags = $x("//*");
for(var i = 0; i < tags.length; i++){
    GM_log(tags[i].textContent);
}




