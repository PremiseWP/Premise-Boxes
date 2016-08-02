( function() {
	tinymce.PluginManager.add( 'dtbaker_mce_banner', function( editor ) {
		editor.addButton( 'pboxes_mce_box_button', {
			text: 'Box',
			icon: false,
			onclick: function() {
				wp.mce.pwp_boxes.popupwindow( editor );
			}
		});
	});
})();