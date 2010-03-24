// ==UserScript==
// @name          Helvetipaper
// @namespace     http://thomd.net/userscript
// @description   A minimalistic theme for Instapaper (inspired http://www.helvetireader.com/)
// @include       http://instapaper.com/*
// @include       http://*.instapaper.com/*
// @author        Thomas Duerr
// @version       0.10
// @date          2010-03-23
// @change        created.
// ==/UserScript==


//
// xpath helper
//
$x = function(p, context){
    contextNode = context || document;
    var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


//
// css helper
//
var attachCSS = function(css){
    if(GM_addStyle){
        GM_addStyle(css);
    } else {
		var head = document.getElementsByTagName("head")[0];
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style); 
    }
}


var username = $x('//div[@id="userpanel"]/b/text()')[0].nodeValue;
var logout_link = $x('//div[@id="userpanel"]/a')[2];
var add_link = $x('//div[@id="paginationTop"]/a')[0];
var folders_link = $x('//div[@id="folders"]//a')[0];
var browse_link = $x('//h2[@id="categoryHeader"]/a')[0];
var starred_link = $x('//h2[@id="categoryHeader"]/a')[1];
var archive_link = $x('//h2[@id="categoryHeader"]/a')[2];




var css = ''+
'body{background-color:#F1F1F1;color:#444;font:normal normal 12px/1.5 Helvetica,sans-serif;width:100% !important;}'+
'#header div{display:none;}'+
'h1#logo{font:normal bold 144px/1 Helvetica,sans-serif;border:none;letter-spacing:-6px;text-shadow:0 2px 1px #FFF;margin:40px 50px;}'+
'h1#logo a{color:red;text-decoration:none;}'+
'div#right_column,div#paginationTop{display:none;}'+
'h2#categoryHeader span,h2#categoryHeader a{display:none}'+
'h2#categoryHeader{color:#444;font:normal normal 52px/1.5 Helvetica,sans-serif;letter-spacing:-2px;margin:0 50px;}'+
'div#left_column,div#bookmark_list{width:100%;}'+
'div#bookmark_list .tableViewCell{-moz-border-radius:0;border-color:#444;}'+
''+
''+
''+
''+
'';

attachCSS(css);





//
// ChangeLog
// 2010-03-23 - 0.1 -  created




