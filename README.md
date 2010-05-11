greasemonkey userscripts
===========================

Some of my more and less useful greasemonkey userscripts:

Please install userscripts from [userscripts.org/users/thomd](http://userscripts.org/users/thomd/ "userscripts of thomd"). You'll also find there some notes and screenshots.

You may also install them via the following Links from github:

* [backpack projects](http://github.com/thomd/userscripts/raw/master/backpackit.com/backpack-projects.user.js "backpack-projects.user.js")
* [backpack tagcloud](http://github.com/thomd/userscripts/raw/master/backpackit.com/backpack-tagcloud.user.js "backpack-tagcloud.user.js")
* [resize backpack](http://github.com/thomd/userscripts/raw/master/backpackit.com/backpack-widescreen.user.js "backpack-widescreen.user.js")
* [delicious network info](http://github.com/thomd/userscripts/raw/master/delicious.com/delicious-network.user.js "delicious-network.user.js")
* [delicious star rater](http://github.com/thomd/userscripts/raw/master/delicious.com/delicious-star-rater.user.js "delicious-star-rater.user.js")

Still under development (use it for your own risk):

* [delicious tag bars](http://github.com/thomd/userscripts/raw/master/delicious.com/delicious-tag-bars.user.js "delicious-tag-bars.user.js")
* [clean-up your delicious tags](http://github.com/thomd/userscripts/raw/master/delicious.com/delicious-clean-up-your-tags.user.js "delicious-clean-up-your-tags.user.js")
* [I love words](http://github.com/thomd/userscripts/raw/master/experiments/i-love-words.user.js "i-love-words.user.js")
* [todoist favicon](http://github.com/thomd/userscripts/raw/master/todoist.com/todoist-favicon.user.js "todoist-favicon.user.js")
* [todoist today](http://github.com/thomd/userscripts/raw/master/todoist.com/todoist-today-in-tab.user.js "todoist-today-in-tab.user.js")

userscript-updater script
=========================

Usage
-----
1. Copy and paste the script snippet `updater.user.js.txt` at the end of your userscript file.

2. Set at least script-id (from userscripts.org) and current script version as options in init function:
        
   Example: 

		userscriptUpdater.init({
			scriptId:       "123456789",
			currentVersion: "1.0"
		});

3. You may optional overwrite the 'checkInterval', 'injectInto' and 'updaterCss' option

   Example:

		userscriptUpdater.init({
			scriptId:       "123456789",
			currentVersion: "1.0.2",
			checkInterval:  604800,                              // check only once a week
			injectInto:     document.getElementById("header"),   // inject updater-message into this DOM-node
			updaterCss:     ""                                   // individual css rules (see 'Themes' below)
		});

4. You may optional define additional (non standard) userscript-meta tags `@change` and/or `@depricated` in your script. This information will then be used in an update-message as additional description.

	`@change`:      what has been changed in the new version
		
	`@depricated`:  if userscript is depricated (the scripts site may have implemented your feature now, so the userscript isn't necessary anymore), then give a description or set to 'true'.


Notes
-----
* For an example of this script being implemented, see for example this [http://userscripts.org/scripts/review/28226?format=txt](http://userscripts.org/scripts/review/28226?format=txt).
* Currently this updater script works only for unserscripts hosted on [userscripts.org](userscripts.org).
* Please don't set `checkInterval` to more than once a day to limit unnecessary server load on userscripts.org
* Use version numbers for your userscripts based on the versioning scheme `major.minor[.bugfix]`.
* You may use a packed version of this script snippet (the userscriptUpdater-function only!) by using [Dean Edwards Packer](http://deanedwards.me.uk/packer/)


### Tested with:
* Firefox 3.0.x
* Greasemonkey Addon 0.8.20090123.1





Styling of updater-message:
---------------------------
Individual CSS rules should base on this exemplary generated HTML structure:

	<div class="greasemonkey_updater">
		<h1>
			<div class="greasemonkey_updater_link_to_hide">
				<a href=""><span>Skip until next Update!</span></a>
			</div>
			Greasemonkey UserScript Update Notification!
		</h1>
		<p>There is an update available for <a href="http://userscripts.org/scripts/show/12346">userscript updater</a>.<br/>
			New Feature: this and that!<br/><br/>
			You are currently running version <b>1.3</b>, the newest version on userscripts.org is <b>1.4.3</b>!<br/>
			<a href="http://userscripts.org/scripts/source/12346.user.js">Update to Version 1.4.3</a>
		</p>
	</div>

For this you may use for example this set of CSS selectors:

	div.greasemonkey_updater {  }
	div.greasemonkey_updater h1 {  }
	div.greasemonkey_updater a {  }
	div.greasemonkey_updater .greasemonkey_updater_link_to_hide {  }
	div.greasemonkey_updater p {  }

### Helvetica Theme

Copy [helvetica.css](http://github.com/thomd/userscripts/raw/master/userscript-updater/themes/helvetica.css "helvetica.css") into `updaterCss`.

### Red-Alert Theme

Copy [red-alert.css](http://github.com/thomd/userscripts/raw/master/userscript-updater/themes/red-alert.css "red-alert.css") into `updaterCss`.


License
-------
MIT License (http://www.opensource.org/licenses/mit-license.php)


