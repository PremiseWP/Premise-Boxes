( function() {
	tinymce.PluginManager.add( 'pboxes_mce_box', function( editor ) {
		editor.addButton( 'pboxes_mce_box_button', {
			text: 'Box',
			icon: false,
			onclick: function() {
				wp.mce.pwp_boxes.popupwindow( editor );
			}
		});
	});
})();