(function($){
	$(document).ready(function(){
		var media = wp.media, shortcode_string = 'pwp_boxes';
		wp.mce = wp.mce || {};
		wp.mce.pwp_boxes = {
			shortcode_data: {},
			template: media.template( 'editor-pwp-boxes' ),
			getContent: function() {
				var options = this.shortcode.attrs.named;
				// options.pbox_innercontent = this.shortcode.pbox_innercontent;
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
					options.pbox_innercontent = this.shortcode.content;
					return this.template(options);
				}
			},
			edit: function( data ) {
				var shortcode_data = wp.shortcode.next(shortcode_string, data);
				var values = shortcode_data.shortcode.attrs.named;
				values.pbox_innercontent = shortcode_data.shortcode.content;
				wp.mce.pwp_boxes.popupwindow(tinyMCE.activeEditor, values);
			},
			// this is called from our tinymce plugin, also can call from our "edit" function above
			// wp.mce.pwp_boxes.popupwindow(tinyMCE.activeEditor, "bird");
			popupwindow: function(editor, values, onsubmit_callback) {
				values = values || {};
				var theForm       = $( '#pboxes-dialog-form' );
			    var dialog_editor = tinyMCE.get( 'pbox_innercontent' );

				if(typeof onsubmit_callback !== 'function'){
					onsubmit_callback = pboxesInsertShortcode
				};

				// If we have values, enter them into our form
			    if ( Object.keys( values ).length ) {
			    	var input = theForm.find( '[name^="pbox_"]' );
			    	input.each( function() {
			    		var $this = $( this ),
			    		_val = values[ $this.attr( 'name' ) ];

			    		$this.val( _val );

			    		if ( $this.is( '#pbox_wrapper' ) ) {
			    			pboxWrapper.setValue( decodeURIComponent( pboxWrapper.getTextArea().value ) );
			    		}

			    	} );
			    	if ( dialog_editor ) {
			    		dialog_editor.setContent( decodeURIComponent( values.pbox_innercontent ) );
			    	}
			    };

			    // bind our actions for when the form is submitted
				theForm.off().submit( function( e ) {
					e.preventDefault();
				    pboxesDialog.fadeOut( 'fast' );
				    onsubmit_callback( e );
			    	return false;
				} );

				pboxesDialogCloase.off().click(function() {
					pboxesDialog.fadeOut( 'fast' );
					theForm[0].reset();
					if ( dialog_editor ) {
			    		dialog_editor.setContent( '' );
			    	}
				})

				pboxesDialog.fadeIn( 'fast' );


				/*
					Helpers
				 */

				function pboxesInsertShortcode( e ) {
					// get the form
					var dialog_form = ( e.currentTarget instanceof jQuery ) ? e.currentTarget : $( e.currentTarget ),
					_data = dialog_form.serializeArray(),
					attrs = {};

					// build attributes object
					$.map( _data, pboxesBuildAttrs );

					var _cont = attrs.pbox_innercontent; // do something
					delete attrs.pbox_innercontent;


					// Insert content when the window form is submitted (this also replaces during edit, handy!)
					var args = {
						tag     : shortcode_string,
						type    : _cont.length ? 'closed' : 'single',
						content : _cont,
						attrs   : attrs,
					};
					editor.insertContent( wp.shortcode.string( args ) );

					theForm[0].reset();
					if ( dialog_editor ) {
						dialog_editor.setContent( '' );
					}

					/**
					 * Build attributes for shortcode before inserting it into the editor.
					 *
					 * @param  {object} $n the option being deal with
					 * @return {void}      builds attributes. does not return anything.
					 */
					function pboxesBuildAttrs( $n ) {
						attrs[$n.name] = ( 'pbox_wrapper' !== $n.name && 'pbox_innercontent' !== $n.name )
								? $n.value
								: encodeURIComponent( $n.value );
					};
				};
			}
		}; // pwp_boxes

		var pboxesDialog   = $( '#pboxes_dialog' ),
		pboxesDialogCloase = pboxesDialog.find( '#pboxes_dialog' ),
		pboxWrapper        = CodeMirror.fromTextArea( $('#pbox_wrapper')[0], {theme: 'monokai'} );

		wp.mce.views.register( shortcode_string, wp.mce.pwp_boxes );
	});
}(jQuery));