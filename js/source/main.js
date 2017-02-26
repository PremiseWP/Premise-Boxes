/**
 *
 */
(function($){
	var PremiseBoxes = {


		/**
		 * Initiate Premise Boxes
		 * @return {[type]} [description]
		 */
		init: function() {
			// bind the toggle editor functionality
			$('.pboxes-toggle-editors').click( this.toggleEditors );

			console.log('Premise Boxes initiated successfully.');
		},

		// show the code editor
		showCodeEditor: function( context ) {
			context.find('.pboxes-wysiwyg-editor').removeClass('pboxes-show');
			context.find('.pboxes-code-editor').addClass('pboxes-show');
		},

		// show the WYSIWYG editor
		showWYSIWYGEditor: function( context ) {
			context.find('.pboxes-code-editor').removeClass('pboxes-show');
			context.find('.pboxes-wysiwyg-editor').addClass('pboxes-show');
		},

		// toggle between the two editors
		toggleEditors: function(){
			var context = $(this).parents('#pboxes-content-editor'),
			active      = context.find('.pboxes-show');

			( active.is('.pboxes-wysiwyg-editor') ) ? PremiseBoxes.showCodeEditor( context ) : PremiseBoxes.showWYSIWYGEditor( context );
		}
	}
	$(document).ready(function(){
		PremiseBoxes.init();
	});
})(jQuery);