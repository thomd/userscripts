// Todoist: Show Todos of Today in Browser tab
// version 1.0
// 2008-07-14
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
// @name          Todoist Today
// @namespace     http://thomd.net/userscript
// @description   show number of todos for today in browser tab
// @include       http://todoist.com/*
// @include       https://todoist.com/*
// @include       http://*.todoist.com/*
// @include       https://*.todoist.com/*
// @author        Thomas Duerr
// @version       1.0
// @date          2008-07-14
// ==/UserScript==


(function (){

  // get number of today-todos from "http://todoist.com/Agenda/getCount"
  GM_xmlhttpRequest({
      method: 'POST',
      url: 'https://todoist.com/Agenda/getCount/',
      data: {},
      headers:{
        "User-Agent": "Mozilla/5.0",
        "Content-Length": "0"
      },
      onload: function(response) {
        var todos = eval("("+response.responseText+")");
        var title = document.getElementsByTagName("title")[0];
        document.title = title.firstChild.data + " (" + todos.today + ")";
      }
  });
}());

//
// ChangeLog
// 2008-07-14 - 1.0 - created
//