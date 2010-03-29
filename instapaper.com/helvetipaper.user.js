// ==UserScript==
// @name          Helvetipaper
// @namespace     http://thomd.net/userscript
// @description   A minimalistic theme for Instapaper (inspired by http://www.helvetireader.com/)
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




//
// DOM manipulation
//
;(function(){
    
    var header = $x('//*[@id="header"]')[0];
    var logo = $x('//*[@id="logo"]')[0];
    var title = $x('//*[@id="logo"]/a')[0];
    var navigation = $x('//*[@id="categoryHeader"]')[0];
    var currentpage_count = $x('//*[@id="bookmark_list"]/div').length;
    var username = $x('//div[@id="userpanel"]/b/text()')[0].nodeValue;
    var logout_link = $x('//div[@id="userpanel"]/a')[2];
    var add_link = $x('//div[@id="paginationTop"]/a')[0];
    var folders_link = $x('//div[@id="folders"]//a')[0];
    var nav_links = $x('//h2[@id="categoryHeader"]/a');


    // add dot
    title.appendChild(document.createTextNode("."));


    // create userdata
    var userdata = document.createElement("div");
    userdata.setAttribute("id", "userdata");
    var username_span = document.createElement("span");
    username_span.appendChild(document.createTextNode(username));
    userdata.appendChild(username_span);
    logout_link.replaceChild(document.createTextNode("logout"), logout_link.firstChild);
    userdata.appendChild(logout_link);
    header.insertBefore(userdata, logo);


    // create category links
    var counter = document.createElement("sup");
    counter.appendChild(document.createTextNode("("+currentpage_count+")"));
    navigation.appendChild(counter);
    for(var i = 0, n = nav_links.length; i < n; i++){
        navigation.appendChild((function(){
            var category = document.createElement("div");
            category.setAttribute("class", "categorylink");
            category.appendChild(nav_links[i]);    
            return category;
        })());
    }


    // create URL info
    var links = $x('//div[@id="bookmark_list"]//div[@class="titleRow"]/a');
    for(link in links){
        var title = links[link].getAttribute("title");
        console.log(title);
    }
//    });
    



/*
    // create action links
    add_link.replaceChild(document.createTextNode("Add Link"), add_link.firstChild);
    navigation.appendChild(add_link);
    navigation.appendChild(folders_link);
    





    // replace stars with Unicode Character 'BLACK STAR' (U+2605)
    var stars = $x('//div[@id="bookmark_list"]//a[@class="starToggleUnstarred"]');
    for(star in stars){
//        console.log(stars[star].innerHTML);
        stars[star].innerHTML = "&#x2605;";
    }
    //$x('//div[@id="bookmark_list"]//a[@class="starToggleStarred"]').each(function(star){star.innerHTML="&#x2605;"})

*/

})();




//
// helvetipaper styles
//
var css = ''+
'body{background-color:#F1F1F1;color:#444;font:normal normal 12px/1.5 Helvetica,sans-serif;width:100% !important;margin:0;padding:0;}'+
'#header div{display:none;}'+

'h1#logo{font:normal bold 144px/1 Helvetica,sans-serif;border:none;letter-spacing:-6px;margin:0;padding:40px 50px;}'+
'h1#logo a{color:red;text-decoration:none;text-shadow:0 0 20px #AAA;}'+
'h1#logo a:hover{text-decoration:none;background:red;color:#FFF;padding:0 0.2em;margin:0 -0.2em;text-shadow:none;}'+

'#header div#userdata{display:block;float:right;font-size:16px;margin:5px 50px;padding:0;font-weight:bold;}'+
'#header div#userdata span{margin-right:16px;}'+
'#header div#userdata a{color:red;font-weight:normal;display:inline-block;}'+
'#header div#userdata a:hover{text-decoration:none;background:red;color:#FFF;padding:2px 8px;margin:-2px -8px;}'+

'#content h2#categoryHeader{color:#444;font:normal bold 52px/1.5 Helvetica,sans-serif;letter-spacing:-2px;margin:0 50px;}'+
'#content h2#categoryHeader span,h2#categoryHeader a{display:none}'+
'#content h2#categoryHeader div{display:inline-block;font:24px/1.5 Helvetica,sans-serif;letter-spacing:0;margin-left:40px;font-weight:normal;}'+
'#content h2#categoryHeader div.categorylink a{color:red;display:block;}'+
'#content h2#categoryHeader div.categorylink a:hover{text-decoration:none;background:red;color:#FFF;padding:0 0.5em;margin:0 -0.5em;}'+

'div#right_column,div#paginationTop{display:none;}'+
'div#left_column,div#bookmark_list{width:100%;}'+

'div#bookmark_list .tableViewCell{-moz-border-radius:0;border:none;border-top:5px solid #FFF;background:#EEE;}'+
'div#bookmark_list .cornerControls .textButton{display:none;}'+
'div#bookmark_list .starBox{float:right;display:none;}'+
'div#bookmark_list .starBox a.starToggleUnstarred{font-size:300%;color:#DDD;}'+
'div#bookmark_list .starBox a.starToggleStarred{font-size:300%;color:red;}'+
'div#bookmark_list .titleRow{width:100%;margin-left:-200px;padding:0;}'+
'div#bookmark_list .titleRow a.tableViewCellTitleLink{font:normal bold 200%/1.5 Helvetica,sans-serif;color:#444;width:none;margin-left:240px;display:block;line-height:1.1;}'+
'div#bookmark_list .titleRow a.tableViewCellTitleLink:hover{text-decoration:none;}'+
'div#bookmark_list .titleRow div.summary{display:none;}'+
'div#bookmark_list .secondaryControls span.host{display:none;}'+
''+
''+
'';

attachCSS(css);





