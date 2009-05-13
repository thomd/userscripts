// ==UserScript==
// @name          clean-up your delicious tags
// @namespace     http://thomd.net/userscript
// @description   Get a list of similar, akin tags of your tag list and clean them up easily with a nice GUI. Similarity is calculated via Levenshtein distance (http://en.wikipedia.org/wiki/Levenshtein_distance).
// @include       http://delicious.com/*
// @include       https://secure.delicious.com/*
// @author        Thomas Duerr
// @version       0.1
// @date          2009-03-30
// ==/UserScript==


//
// xpath helper
//
function $x(p, context){
	context = context || document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
function $x1(p, context) {
	var nodes = $x(p, context);
	return (nodes.length > 0) ? nodes[0] : null;
}


//
// firebug-logging helper
//
if(unsafeWindow.console){
	var GM_log = unsafeWindow.console.log;
}



//
// tag cleaner class
//
var TagCleaner = function(){

	// current tags
	var tags = $x("//select[@class='field']/option/child::text()");

	// styles
	var css_cleaner  = "";
		css_cleaner += "";

	// private
	var private = function() {

	};


	//based on: http://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Levenshtein_distance
	//and:  http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
	function levenshtein(a, b){
		var i;
		var j;
		var cost;
		var d = new Array();

		if (a.length == 0){
			return b.length;
		}

		if (b.length == 0){
			return a.length;
		}

		for (i = 0; i <= a.length; i++){
			d[i] = new Array();
			d[i][0] = i;
		}

		for (j = 0; j <= b.length; j++){
			d[0][j] = j;
		}

		for (i = 1; i <= a.length; i++){
			for (j = 1; j <= b.length; j++){
				if (a.charAt(i - 1) == b.charAt(j - 1)){
					cost = 0;
				} else {
					cost = 1;
				}

				d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);

				if(i > 1 && j > 1 && a.charAt(i - 1) == b.charAt(j - 2) && a.charAt(i - 2) == b.charAt(j - 1)){
					d[i][j] = Math.min(d[i][j], d[i-2][j-2] + cost);
				}
			}
		}
		return d[a.length][b.length];
	}


	// calculate the Levenshtein distance between a and b, fob = form object, passed to the function
	// http://andrew.hedges.name/resume/
	levenshteinenator = function(a, b) {
		var cost;
		var m = a.length;
		var n = b.length;

		// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
		if (m < n) {
			var c=a; a=b; b=c;
			var o=m; m=n; n=o;
		}

		var r = [];
		r[0] = [];
		for (var c = 0; c < n+1; c++) {
			r[0][c] = c;
		}

		for (var i = 1; i < m+1; i++) {
			r[i] = [];
			r[i][0] = i;
			for (var j = 1; j < n+1; j++) {
				cost = (a.charAt(i-1) == b.charAt(j-1)) ? 0 : 1;
				r[i][j] = minimator(r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost);
			}
		}

		return r[m][n];
	}

	// return the smallest of the three values passed in
	minimator = function(x, y, z) {
		if (x < y && x < z) return x;
		if (y < x && y < z) return y;
		return z;
	}


	//
	// public fields and methods
	//
	var constructor = function(){

//		for(var i = 0; i < tags.length; i++){GM_log(tags[i]);}


		// levenshtein()
		var start = (new Date).getTime();
		GM_log("levenshtein('Supercalifragilisticexpialidocious', 'haus'): " + levenshtein("Supercalifragilisticexpialidocious", "haus"));
		var stop = (new Date).getTime();
		GM_log("time: " + (stop-start)/1000 + " sec");


		// levenshteinenator()
		var start = (new Date).getTime();
//		var distArray = levenshteinenator(fob);
//		var dist = distArray[distArray.length-1][distArray[distArray.length-1].length-1];
		GM_log("levenshteinenator('Supercalifragilisticexpialidocious', 'haus'): " + levenshteinenator("Supercalifragilisticexpialidocious", "haus"));
		var stop = (new Date).getTime();
		GM_log("time: " + (stop-start)/1000 + " sec");

		// build tag cleaner
		this.build = function() {
		};		
	}

	return new constructor();
};






// ----- USECASE 1:  ------------------------------------------------------------------------------
if($x1("id('tagRename')")){
	var cleaner = new TagCleaner();
//	GM_log("cleaner: " + cleaner);

}







// Stories:
// * extract tags in array
// * calculate similarity (levenstein, plural-s, ...)
// * build groups with similar tags
// * display all groups: "rename x, y and z -> to y" (via GUI)
// * POST
// * refresh selectbox and similarity-list
//
// Addon:
// * show number of tags
// * inject text in https://secure.delicious.com/settings




//
// ChangeLog
// 2009-03-30 - 0.1 - created



