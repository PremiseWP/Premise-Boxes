(function($){
	var media = wp.media, shortcode_string = 'pwp_boxes';
	wp.mce = wp.mce || {};
	wp.mce.pwp_boxes = {
		shortcode_data: {},
		template: media.template( 'editor-pwp-boxes' ),
		getContent: function() {
			var options = this.shortcode.attrs.named;
			options.innercontent = this.shortcode.content;
			return this.template(options);
		},
		View: { // before WP 4.2:
			template: media.template( 'editor-pwp-boxes' ),
			postID: $('#post_ID').val(),
			initialize: function( options ) {
				this.shortcode = options.shortcode;
				wp.mce.pwp_boxes.shortcode_data = this.shortcode;
			},
			getHtml: function() {
				var options = this.shortcode.attrs.named;
				options.innercontent = this.shortcode.content;
				return this.template(options);
			}
		},
		edit: function( data ) {
			var shortcode_data = wp.shortcode.next(shortcode_string, data);
			var values = shortcode_data.shortcode.attrs.named;
			values.innercontent = shortcode_data.shortcode.content;
			wp.mce.pwp_boxes.popupwindow(tinyMCE.activeEditor, values);
		},
		// this is called from our tinymce plugin, also can call from our "edit" function above
		// wp.mce.pwp_boxes.popupwindow(tinyMCE.activeEditor, "bird");
		popupwindow: function(editor, values, onsubmit_callback) {
			values = values || [];
			if(typeof onsubmit_callback !== 'function'){
				onsubmit_callback = function( e ) {
					// get the form
					var dialog_form = ( e.currentTarget instanceof jQuery ) ? e.currentTarget : $( e.currentTarget ),
					_data = dialog_form.serializeArray(),
					attrs = {};

					// build attributes object
					$.map( _data, pboxesBuildAttrs );

					// Insert content when the window form is submitted (this also replaces during edit, handy!)
					var args = {
						tag     : shortcode_string,
						type    : attrs.innercontent.length ? 'closed' : 'single',
						content : attrs.innercontent,
						attrs   : attrs,
					};

					editor.insertContent( wp.shortcode.string( args ) );

					// build our attributes object. exclude the inner content
					function pboxesBuildAttrs( $n ) {
						attrs[$n.name] = $n.value;
					};
				};
			};
			editor.windowManager.open(
				// load the dialog window
				{
					title: 'Premise Box',
					width: 600,
					height: 500,
					url: '/wp-content/plugins/Premise-Boxes/view/view-tinymce-popup.php',
				},
				// Pass the arguments that we need available in our dialog
				{
					editor: editor,
					wp: wp,
					callback: onsubmit_callback,
					values: values,
				}
			);
		}
	};
	wp.mce.views.register( shortcode_string, wp.mce.pwp_boxes );
}(jQuery));