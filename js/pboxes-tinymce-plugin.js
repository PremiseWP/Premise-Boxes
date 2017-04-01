/**
 * Register our tinyMCE plugin and add the button that will launch it
 *
 * @see js/source/model-tinymce-plugin.js for the plugin source code
 */
(function() {
	tinymce.PluginManager.add( 'pboxes_mce_box', function( editor, url ) {
		editor.addButton( 'pboxes_mce_box_button', {
			title: 'Premise Boxes',
			image: url + '/img/pboxes-icon-md.png',
			onclick: function() {
				wp.mce.pwp_boxes.popupwindow( editor );
			}
		});
	});
})();