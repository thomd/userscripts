// ==UserScript==
// @name          Helvetipaper
// @namespace     http://thomd.net/userscript
// @description   A minimalistic theme for Instapaper (based on the work of http://www.helvetireader.com/)
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
var addStyle = function(css){
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
}

var css = ''+
''+
''+
'';

addStyle(css);




//
// ChangeLog
// 2010-03-23 - 0.1 -  created




//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 86400,                                     // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/review/" + config.scriptId + "?format=txt",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();


// initialize updater
userscriptUpdater.init({
    scriptId:       "36457",
    currentVersion: "0.10",
    injectInto:     document.getElementById("pagetitle")
});
