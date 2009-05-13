// ==UserScript==
// @name          backpack projects
// @namespace     http://thomd.net/userscript
// @description   formating of projects
// @include       https://*.backpackit.com/*
// @include       http://*.backpackit.com/*
// @author        Thomas Duerr
// @version       0.4
// @date          2009-01-15
// ==/UserScript==


// HELP:
//
//   name projects with prefix: "Pxx | " with xx = number, e.g. "P01 | a cool greasemonkey script"
//   name finished projects with prefix; "Pxx || " with xx = number, e.g. "P01 || a cool greasemonkey script"
//   name running projects with prefix; "Pxx ||| " with xx = number, e.g. "P01 ||| a cool greasemonkey script"
//


(function (){

	// xpath helper
	function $x(p, context) {
		if (!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}

	// logging
	if(unsafeWindow.console){
		var GM_log = unsafeWindow.console.log;
	}

	// try to find pattern in page-name
	var getPattern = function(val){
		var pattern = /^(P[0-9]+ \|{1,3} )(.*)$/;
		if (pattern.exec(val) != null){
			return [RegExp.$1, RegExp.$2];
		} else {
			return null;
		}
	}



	// projects
	var projects = [];

	// find all pages which match project-pattern and store in object-array
	var styles = "";
	styles += "div#Sidebar div#Pages div.bookmarks a.project {text-decoration: none; color: #FFF;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project:hover span {color: #FFF;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project span {color: #777;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project.current span {color: #FFF;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project span em {font-weight: bold; font-style: normal; color: #000;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project span em.finished {font-weight: bold; font-style: normal; color: #F00;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project span em.running {font-weight: bold; font-style: normal; color: #093;}"
	styles += "div#Sidebar div#Pages div.bookmarks a.project:hover span em.running {font-weight: bold; font-style: normal; color: #0F0;}"
	GM_addStyle(styles);

	var favorites = $x("//div[@id='sidebar_links']/div[@class='bookmarks']/div[@class='pages']/a");
	favorites.forEach(function(favorite) {
		var span = $x(".//span", favorite);
		var projectName = span[0].textContent;
		var pattern = getPattern(projectName);
		if(pattern != null){
			projects.push({
				a_tag: favorite,
				span_tag: span[0],
				pre_name: pattern[0],
				post_name: pattern[1]
			});
		}
	});


	// sort projects by revert number
	projects.sort(function(a, b){
		var v1 = parseInt(a.pre_name.replace(/P/, "").replace(/ \|/, ""));
		var v2 = parseInt(b.pre_name.replace(/P/, "").replace(/ \|/, ""));
		return v2 - v1;
	});


	// format projects
	for(i = 0; i < projects.length; i++){	
		projects[i].a_tag.className = projects[i].a_tag.className != "" ? "project " + projects[i].a_tag.className : "project";
		var em = document.createElement("em");
		var pre = projects[i].pre_name;
		if(pre.match(/\|\|\|/)){
			pre = pre.replace(/\|\|\|/, "|");
			em.className = "running";
		}
		if(pre.match(/\|\|/)){
			pre = pre.replace(/\|\|/, "|");
			em.className = "finished";
		}
		em.appendChild(document.createTextNode(pre));
		var newSpan = document.createElement("span");
		newSpan.appendChild(em);
		newSpan.appendChild(document.createTextNode(projects[i].post_name));
		projects[i].a_tag.replaceChild(newSpan, projects[i].span_tag);
		projects[i].a_tag.parentNode.insertBefore(projects[i].a_tag, projects[i].a_tag.parentNode.firstChild.nextSibling);
	}


}());

//
// ChangeLog
// 2008-06-17 - 0.1 - created
// 2008-11-20 - 0.2 - formating of finished projects
// 2008-11-26 - 0.3 - bugfix due to changed code from basecamp
// 2009-01-15 - 0.4 - bugfix due to the new reorderable sidebar links
//