(function($){
	$(document).ready(function(){
		var media = wp.media, shortcode_string = 'pwp_boxes';
		wp.mce = wp.mce || {};
		wp.mce.pwp_boxes = {
			shortcode_data: {},
			template: media.template( 'editor-pwp-boxes' ),
			getContent: function() {
				var options = this.shortcode.attrs.named;
				options.pbox_innercontent = this.shortcode.content;
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
				var theForm       = $( '#pboxes-dialog-form' ),
				dialogSubmit = $('#pboxes-submit-box');
			    var dialog_editor = tinyMCE.get( 'pbox_innercontent' );

				if(typeof onsubmit_callback !== 'function'){
					onsubmit_callback = pboxesInsertShortcode
				};
console.log( values );
				// If we have values, enter them into our form
			    if ( Object.keys( values ).length ) {
			    	var input = theForm.find( '[name^="pbox_"]' );

			    	input.each( function() {
			    		var $this = $( this ),
			    		_val = values[ $this.attr( 'name' ) ];

			    		if ( $this.is( '#pbox_wrapper' ) ) {
			    			pboxWrapper.setValue( decodeURIComponent( pboxWrapper.getTextArea().value ) );
			    		}
			    		else if ( $this.is( '#pbox_innercontent' ) ) {
			    			$this.val( decodeURIComponent( _val ) );
			    		}
			    		else {
			    			$this.val( _val );
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
				    var dialog_form = $( e.currentTarget ),
					_data = dialog_form.serializeArray();
				    onsubmit_callback( _data );
			    	return false;
				} );

				dialogSubmit.off().click(function(e){
					e.preventDefault();

					var _data = theForm.serializeArray();
					if ( dialog_editor ) {
						console.log( 'dialog_editor.getContent():' );
						console.log( dialog_editor.getContent() );
					}
					else {
						console.log( '_data.pbox_innercontent:' );
						console.log( _data.pbox_innercontent );
					}
					// $( '#pboxes-dialog-form' ).trigger( 'submit' );
				 //    pboxesDialog.fadeOut( 'fast' );
				 //    var _data = theForm.serializeArray();
				 //    onsubmit_callback( _data );
					// console.log('insert clicked');
			    	return false;
				});

				pboxesDialogClose.off().click(function() {
					pboxesDialog.fadeOut( 'fast' );
					theForm[0].reset();
					if ( dialog_editor ) {
			    		dialog_editor.setContent( '' );
			    	}
				});

				pboxesDialog.fadeIn( 'fast' );


				/*
					Helpers
				 */

				/**
				 * Insert the shortcode into the editor
				 *
				 * @param  {object} e the event that was fired
				 * @return {void}     inserts the shortcode
				 */
				function pboxesInsertShortcode( _data ) {
					// get the form
					var attrs = {}, _cont = '', args = {};
console.log( _data );
					// build attributes object
					$.map( _data, pboxesBuildAttrs );

					// set content and remove the innercontent param
					_cont = attrs.pbox_innercontent;
					delete attrs.pbox_innercontent;

					// build arguments for shortcode
					args = {
						tag     : shortcode_string,
						type    : _cont.length ? 'closed' : 'single',
						content : _cont,
						attrs   : attrs,
					};

					// insert shortcode
					editor.insertContent( wp.shortcode.string( args ) );
					console.log('shortcode inserted with the following args:');
					console.log( args );

					// reset the form
					theForm[0].reset();
					dialog_editor && dialog_editor.setContent( '' );

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
		pboxesDialogClose = pboxesDialog.find( '.pboxes-dialog-close' ),
		pboxWrapper        = CodeMirror.fromTextArea( $('#pbox_wrapper')[0], {theme: 'monokai'} );

		wp.mce.views.register( shortcode_string, wp.mce.pwp_boxes );
	});
}(jQuery));