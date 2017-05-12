/**
 * Premise Boxes TinyMCE Class
 *
 * This handles all the functionality for our tinymce plugin and registers it's template
 */
(function($){
	$(document).ready(function(){

		var pboxesDialog   = $( '#pboxes_dialog' ),
		pboxesDialogClose  = pboxesDialog.find( '.pboxes-dialog-close' ),
		pboxWrapper        = CodeMirror.fromTextArea( $('#pbox_wrapper')[0], {theme: 'monokai'} ),
		shortcode_string   = 'pwp_boxes';

		wp.media = wp.media || {};
		wp.mce   = wp.mce   || {};

		// our plugin
		wp.mce.pwp_boxes = {

			// holds data from our shortcode
			shortcode_data: {},

			// set our template
			template: wp.media.template( 'editor-pwp-boxes' ),

			getContent: function() {
				var options = this.shortcode.attrs.named;
				options.pbox_innercontent = this.shortcode.content;
				return this.template(options);
			},

			edit: function( data ) {
				var shortcode_data = wp.shortcode.next(shortcode_string, data);
				var values = shortcode_data.shortcode.attrs.named;
				values.pbox_innercontent = shortcode_data.shortcode.content || '';
				wp.mce.pwp_boxes.popupwindow(tinyMCE.activeEditor, values);
			},

			// this is called from our tinymce plugin, also can call from our "edit" function above
			popupwindow: function( editor, values, onsubmit_callback ) {
				editor = editor || null;
				values = values || {}; // console.log( values );

				var theForm   = $( '#pboxes-dialog-form' ),
				dialogSubmit  = $('#pboxes-submit-box'),
				dialog_editor = tinyMCE.get( 'pbox_innercontent' );

				var _selected = editor.selection;

				// theForm.focus();

				// set our callback
				if ( typeof onsubmit_callback !== 'function' ) {
					onsubmit_callback = pboxesInsertShortcode;
				};

				// If we have values, enter them into our form
				if ( Object.keys( values ).length ) {
					getSetFields( values );
				};
				setTimeout( function(){
					console.log(_selected.getContent() );
				}, 5000);
				console.log(_selected.getContent() );
				// tinyMCE.get('content').selection.setContent('test');
				// bind submit button
				dialogSubmit.off().click(function(e){
					e.preventDefault();
					console.log(_selected );
					// tinyMCE.get('content').selection.setContent('test');
					if ( _selected ) {
						console.log('We have content');
						_selected.setContent( pboxesInsertShortcode( getSetFields() ) );
					}
					else {
						console.log('We do not have content');
						editor.insertContent( pboxesInsertShortcode( getSetFields() ) );
					}
					closeDialog();
					return false;
				});

				// bind close button
				pboxesDialogClose.off().click(closeDialog);

				// open our dialog
				pboxesDialog.fadeIn( 'fast' );


				/*
					Helpers
				 */

				// inesrt the shortcode
				function pboxesInsertShortcode( _data ) {
					// get the form
					var attrs = {}, _cont = '', args = {};

					// build attributes object
					$.map( _data, function( $n ) {
						attrs[$n.name] = $n.value;
					} );
					// set content and remove the innercontent param
					_cont = attrs.pbox_innercontent;
					delete attrs.pbox_innercontent;
					// build arguments for shortcode
					args = {
						tag     : shortcode_string,
						type    : _cont.length ? 'closed' : 'self-closing',
						content : _cont,
						attrs   : attrs,
					};

					// insert shortcode
					// editor.insertContent( wp.shortcode.string( args ) );

					// reset the form
					resetTheForm();

					console.log('the shortcode to insert:' + wp.shortcode.string( args ));
					return wp.shortcode.string( args );
				};

				// cloase the dialog
				function closeDialog() {
					pboxesDialog.fadeOut( 'fast' );
					resetTheForm();
				}

				// resets the form
				// cleans up the editor and codemirror
				function resetTheForm() {
					theForm[0].reset();
					pboxWrapper   && pboxWrapper.setValue( '' );
					dialog_editor && dialog_editor.setContent( '' );
				}

				// get or set our fields.
				// if values is passed then it sets, otherwise it gets
				function getSetFields( values ) {
					values = values || null;
					// get the form fields that apply to the shortcode
					// the one that have name attribute 'pbox_..'
					var fields = theForm.find( '[name^="pbox_"]' ),
					returnFields = [];

					for ( var i = fields.length - 1; i >= 0; i-- ) {

						var _f = $( fields[i] ),    // field
						_n     = _f.attr( 'name' ), // name
						_v     = ( values ) ? values[ _n ] : '';      // value

						if ( null === values ) {
							switch( _n ) {
								// get the value for the inner content
								case 'pbox_innercontent' :
									_v = encodeURIComponent( tmce_getContent( 'pbox_innercontent', 'pbox_innercontent' ) );
								break;

								// get the value for our wrapper
								case 'pbox_wrapper' :
									_v = encodeURIComponent( pboxWrapper.getValue() );
								break;

								default:
									_v = _f.val();
								break;
							}
							returnFields.push({ name: _n, value: _v });
						}
						else {
							switch( _n ) {
								// enter the value for the inner content
								case 'pbox_innercontent' :
									tmce_setContent( decodeURIComponent( _v ), 'pbox_innercontent', 'pbox_innercontent');
								break;

								// enter the value for our wrapper
								case 'pbox_wrapper' :
									pboxWrapper.setValue( decodeURIComponent( values[ _n ] ) );
								break;

								default:
									_f.val( _v );
								break;
							}
						}
					}

					if ( returnFields.length ) {
						return returnFields;
					}

					// get the content
					function tmce_getContent(editor_id, textarea_id) {
						console.log( editor_id );
						console.log( textarea_id );
						if ( typeof editor_id == 'undefined' ) return false; //editor_id = wpActiveEditor;
						if ( typeof textarea_id == 'undefined' ) textarea_id = editor_id;

						if ( jQuery('#wp-'+editor_id+'-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id) ) {
							return tinyMCE.get(editor_id).getContent();
						}else{
							return jQuery('#'+textarea_id).val();
						}
					}

					// set the content
					function tmce_setContent(content, editor_id, textarea_id) {
						if ( typeof editor_id == 'undefined' ) return false; //editor_id = wpActiveEditor;
						if ( typeof textarea_id == 'undefined' ) textarea_id = editor_id;

						if ( jQuery('#wp-'+editor_id+'-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id) ) {
							return tinyMCE.get(editor_id).setContent(content);
						}else{
							return jQuery('#'+textarea_id).val(content);
						}
					}

					// focus on the editor
					function tmce_focus(editor_id, textarea_id) {
						if ( typeof editor_id == 'undefined' ) return false; //editor_id = wpActiveEditor;
						if ( typeof textarea_id == 'undefined' ) textarea_id = editor_id;

						if ( jQuery('#wp-'+editor_id+'-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id) ) {
							return tinyMCE.get(editor_id).focus();
						}else{
							return jQuery('#'+textarea_id).focus();
						}
					}
				}
				return false;
			}
		}; // pwp_boxes

		// register the tinymce view template
		wp.mce.views.register( shortcode_string, wp.mce.pwp_boxes );
	});
}(jQuery));