Diabolical - One man's idea of how to do jQuery Dialog windows
==============================================================

Diabolical is a jQuery plugin for rendering Dialog boxes with flexible ways for passing content to the box and somewhat of an attempt at allowing CSS theming.

Brought to you by [Uh Huh Yeah](http://uhhuhyeah.com/) and that little nagging voice in my ear.

Installation
------------

This library is a jQuery plugin so make sure to include [jQuery](http://jquery.com) too. Diabolical has been developed using jQuery 1.4.4.. I've no idea how it will behave with another version. See the above note about this being a work in progress and that you probably shouldn't be using it in production.

Copy the diabolical directory to where ever you like keeping your javascript files. For example `/javascripts`

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script src="/javascripts/diabolical/src/diabolical.js" type="text/javascript"></script>
	
### Set up

Diabolical takes an optional list of settings (as a JSON hash) where you can override the defaults. See '[Settings/Options](#settings)' for available options and their defaults.

	<script type="text/javascript">
		// setup
		var options = {
			'cancelText':'Cancel',
			'title': 'Behold!',
			'contentText: 'Check out my diabolically awesome dialog box.'
		};
	</script>
	
Next we attach the dialog to a element on the page. Which element you choose is mostly personal preference, but you should only attach one dialog instance to any one element. By default, you'll probably use the `body` element.
	
	<script type="text/javascript">
		// setup
		var options = {
			'cancelText':'Cancel',
			'title': 'Behold!',
			'contentText: 'Check out my diabolically awesome dialog box.'
		};

		// attach to body and grab a variable for the dialog that we can reference later
		$('body').diabolical(options);
		var dialog = $('body').data('diabolical');
	</script>

### Use	

A common use case is to trigger the dialog box when the user clicks on a specific link.

	<a href="/login" id="login-link">Click here to login</a>
	
	<script type="text/javascript">
		$(function() {
			// setup
			var options = {
				'cancelText':'Cancel',
				'title': 'Behold!',
				'contentText: 'Check out my diabolically awesome dialog box.'
			};

			// attach to body and grab a variable for the dialog that we can reference later
			$('body').diabolical(options);
			var dialog = $('body').data('diabolical');
			
			// Bind the link's click event to the dialog's show() method
			$('#login-link').click(function() {
				dialog.show();
				return false; // prevents the elements default behavour. I.e. taking the user to '/login'.
			});
			
		}); // end of doc ready
	</script>
	
Passing content to be displayed
-------------------------------

Diabolical supports *four* ways of being passed content to be displayed

**1. Plain Text**
You can pass plain strings to the dialog using `title`, `contentText` or both.

	<script>
		var options = {
			'title': 'Behold!',
			'contentText' : 'Check out my diabolically awesome dialog box.'
		};
	</script>

**2. HTML**
You can also pass HTML to the `contentText` option.

	<script>
		var options = {
			'contentText' : '<h3>Check out my diabolically <a href="#">awesome</a> dialog box.</h3>'
		};
	</script>
	
**3. jQuery node**
You can also grab some other element in the DOM to display in the dialog. 

	<div id="dialog-me">
		<h2>Behold!</h2>
	</div>

	<script>
		var options = {
			'contentText' : $('#dialog-me')
		};
	</script>
	
Note, this will remove the `dialog-me` div from the page. Use `$('#dialog-me').clone()` instead if you want to leave the original `dialog-me` div alone.

**4. Remote resource**
This is the hidden gem. During setup you can pass a URL that points to the content you want to pass into the dialog and it doesn't get fetched until or unless `show()` gets called. The remote resource is fetched asynchronously of course and the dialog is loaded instantly (with a spinner.gif to keep your users amused should the remote response take a while to return it's content).

	<script>
		var options = {
			'contentURL' : '/login'
		};
	</script>

If you're using Rails, you might want to consider registering a new MIME type of `:dialog` then you can have view files especially for the dialog like `app/views/sessions/new.dialog.erb`.

Settings/Options<a name="settings"></a>
----------------

*	`closeText`
	Label for the close link. Defaults to 'Close'.

*	`contentText`
	String or HTML fragment to be displayed within the `#dialogContent` div. Defaults to an empty string.
	
* `contentURL`
	Relative or absolute URL the contents of which should be displayed within the `#dialogContent` div. No default (it's nil).

* `cssClass`
	Specifies an optional css class to add to the `dialogBox` div. This is a string, not a selector. Eg `foo` not `.foo`.
	
* `cssTheme`
	CSS filename of the dialog's theme. Defaults to `default.css`. CSS files live in `src` and should import the `base.css` file. You don't need to include a link to this stylesheet in your HTML. Diabolical will take care of loading it for you.
	
* `dialogWidth`
	Width of the dialog box as an integer. Defaults to `400`(px).

* `dialogLeftPosition`
	Horizontal position of #dialogBox as an integer. Alters the #dialogBox's css `left` position property. Defaults to approximate center of window.

* `dialogTopPosition`
	Vertical position of the top edge of #dialogBox as an integer. Alters the #dialogBox's css `top` position property. Defaults to `40`(px).
	
* `fadeInDialog`
	Specifies whether the dialog box should gently fade in or not. Defaults to `1`. Pass any other value to prevent this behavior.
	
* `fadeOutDialog`
	Specifies whether the dialog box should gently fade out on dismiss or not. Defaults to `1`. Pass any other value to prevent this behavior.
	
* `scrollToDialog`
	Specifies whether browser window should scroll up to the dialog box on `show()`. Defaults to `1`. Pass any other value to prevent this behavior.

* `pluginLocation`
	The relative or absolute location of the plugin's src directory. Defaults to `/javascripts/diabolical/src/`. Note: don't forget that trailing slash!

* `themeLocation`
	The relative or absolute location of the your custom theme's css directory. Defaults to `/javascripts/diabolical/src/`. Note: don't forget that trailing slash!
		
* `title`
	String to be displayed in the `#dialogBox h2`. Defaults to an empty string. Note, this h2 element is not inside the `#dialogContent` div so this can be set independently of `contentText` or `contentURL`.

Known issues
------------

* I've literally no idea whether this will work outside of Safari 5 and jQuery 1.4.4. - it's a work in progress and probably shouldn't be used in production without some due diligence on your part. Please report bugs to [david@uhhuhyeah.com](mailto:david@uhhuhyeah.com?subject=Diabolical), or feel free for send me a patch.

	
