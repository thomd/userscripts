// Tofoist Favicon
// version 1.0
// 2008-03-11
// Copyright (c) 2008, Thomas Duerr
// Released under the Creative Commons Attribution-Share Alike 3.0 License
// http://creativecommons.org/licenses/by-sa/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Netvibes - Show only unread Feeds", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Todoist - Favicon
// @namespace     http://thomd.net/userscript
// @description   changes the default todoist favicon with a nicer one
// @include       http://todoist.com/*
// @include       https://todoist.com/*
// @include       http://*.todoist.com/*
// @include       https://*.todoist.com/*
// @author        Thomas Duerr
// @version       1.0
// @date          2008-03-11
// ==/UserScript==


(function (){

	var changeFavicon = function(favicon){
		var head = document.getElementsByTagName("head")[0];
		var links = head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++){
			if (links[i].type == "image/x-icon" && (links[i].rel == "shortcut icon" || links[i].rel=="icon")){
				links[i].href = favicon;
				break;
			}
			var icon  = document.createElement("link");
			icon.type = "image/x-icon";
			icon.rel  = "shortcut icon";
			icon.href = favicon;
			head.appendChild(icon);
		}
	}


	var favicon = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn' +
		'ZVJlYWR5ccllPAAAAGBQTFRF0haH/wCc2BOK3BGM+QOZ4Q+O9QWX8AeV/AGb/YHK5gyQ5gyR6wqS/QGb' +
		'/4DN6wqT+QOa6wmT2BOJ8AiV7AqS4Q6O5g2Q9AWX9QWY/QGa3RCN4g6O8QeV3RGM/AGa////8TxqpgAA' +
		'ACB0Uk5T/////////////////////////////////////////wBcXBvtAAAAgElEQVR42nTPyQ7DMAhF' +
		'Ubc2xrMzd+77/7+MQ7OIKuUuQJwdClCH2gV1OaROAHvn4H0BSvE7ZJcfDshf55yAMZ0xgGl1AtbamwXs' +
		'vS2BkfnNADOPLFBTrROQ+qlPAkuIcQFiDCEIEL2IgJloJoGPfmrtvd4SuP4ahjY2+Ht/FWAAgzQMa6wa' +
		'BlgAAAAASUVORK5CYII=';	
	changeFavicon(favicon);

}());

//
// ChangeLog
// 2008-03-11 - 1.0 - created
//