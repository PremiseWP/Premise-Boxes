=== Premise Boxes ===
Contributors: premisewp
Donate link: http://premisewp.com/donate
Tags: content, html, developers
Requires at least: 4.2
Tested up to: 4.7
Stable tag: 4.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

This plugin is an attempt at reducing the gap there is between developers and project/content managers.

== Description ==

The idea is to provide a UI that is user friendly for the ones who do not code, yet offer a code editor for developers. Developres can make changes in code or use the code editor to create a 'wrapper' for the content.

**The problem** is that Wordpress developers sometimes add html to a site's post or page and the content manager breaks it later trying to make changes. Then the develper has to be called again to fix whatever was broken in the markup. This is due to tinyMCE validating the HTML in the editor. When you switch from the 'Text' and 'Visual' editor some of the HTML is lost and causes things to break. Here is our attempt at fixing this issue.

**The concept** is simple, a box lets project/content managers insert content using a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) eiditor. Developers can assign classes and ids to boxes to control how they look or behave in the front end. Additionally, developers can also insert a HTML wrapper for the content that the project/content manager inserts. This provides ultimate control over the element.

This is where the gap with developers gets shorten! The code editor that we provide for developers does not change or alter the markup. Developers can insert the content in their markup by uisng the `%%CONTENT%%`. This will insert everything that the content manager did in the WYSIWYG editor.

This plugin only loads styles and scripts in the backend (when creating or editing a post). It currently does not bind any styles or scripts to the front end.

**Important**: Premise Boxes does not do any HTML validation for you. It is important to trust the people that are using this plugin or have access to it.

Requires [Premise WP](https://github.com/PremiseWP/Premise-WP).

== Installation ==

This section describes how to install and activate Premise Boxes.

1. Upload the plugin files to the `/wp-content/plugins/premise-boxes` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Start using it!


== Frequently Asked Questions ==

= Where can I find the GitHub project? =

The Github project can be found [here](https://github.com/PremiseWP/Premise-Boxes). Please note that the GitHub version is usually in development and may not be stable. For the stable get the plugin directly from the plugin screen of your site.

== Screenshots ==

1. When clicking on the Shortcode button on the WP editor, this poppup appears.
2. Enter classes, an id, and content. Click on it to edit it.
3. Swith the ditors to enter html that will wrap around your content. Or simply use this editor.

== Changelog ==

= v1.0.11 =
* Update to fix some minor bugs.

= v1.0.10 =
* Fixed location from where premise wp is required to install. Change to GitHub.

= v1.0.9 =
* Fixed issue that prevented from editing a box. Instead it would create a new one everytime.

= v1.0.8 =
* Ensure shortcode self closes to avoid conflicts with other boxes in the page.
* Styled boxes in the editor so it is easy to recognize where there is a box inserted in the content.

= v1.0.7 =
* fixed issue with some files being mixed up.

= v1.0.6 =
* Require Pemise WP 2.0 or newer.
* New shortcode icon used for the tinyMCE button and when inserting empty boxes.
* Moved img dir to the js dir so that we can call the plugin's url dynamically.

= v1.0.5 =
* moved class and id to the code editor section.
* added plugin url

= 1.0.4 =
* fixed issue: 'undefined' was added to the content of the box when editing a box that was previously empty (had no content).

= 1.0.3 =
* Added code editor for developers.
* Added placeholder for when there is no content being inserted in a box.
* Added some styles for tinymce.
* Organized JS files to be more comprehensive.

= 1.0.2 =
* Fixed issue when inserting other shortcodes or content that create conflicts with the editor.
* Added a placeholder so that when there is no content the shortcode can still be selected.

= 1.0.1 =
* Fixed plugin file not being found. Had upper case letters for the directory which changed when lauching the plugin. updated to lower casee, we are good now!

= 1.0.0 =
* Release version 1.0.0

== Upgrade Notice ==

= 1.0.1 =
Fixed bug due to plugin directory being in called in uppercase when it should be lowercase.

