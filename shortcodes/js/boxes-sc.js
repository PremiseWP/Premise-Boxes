/**
 * Register Boxes shortcode button and plugin
 */
jQuery(document).ready(function($) {
    
    // create tinyMCE plugin for Boxes and bind button
    tinymce.create('tinymce.plugins.pboxes_add_box_plugin', {
        init : function(ed, url) {
                // Register command for when button is clicked
                ed.addCommand('pboxes_add_box_plugin_btn', function() {
                    selected = tinyMCE.activeEditor.selection.getContent();

                    // Initiate our shortcode object
                    // PboxesShortcode.init(selected);
                    wp.mce.pboxes.init(ed, selected);
                });

            // Register buttons - trigger above command when clicked
            ed.addButton('pboxes_add_box_button', {title : 'Insert shortcode', cmd : 'pboxes_add_box_plugin_btn', image: url + '/buttons/add_box_icon.png' });
        },   
    });

    // Register our TinyMCE plugin
    // first parameter is the button ID1
    // second parameter must match the first parameter of the tinymce.create() function above
    tinymce.PluginManager.add('pboxes_add_box_button', tinymce.plugins.pboxes_add_box_plugin);
});


(function($){

    var media = wp.media, shortcode_string = 'pboxes';
    
    wp.mce = wp.mce || {};

    wp.mce.pboxes = {

        /**
         * The active editor
         * 
         * @type {Object}
         */
        editor: {},



        /**
         * Holds The content selected by user 
         * before opening shortcode
         * 
         * @type {String}
         */
        innerContent: '',




        /**
         * Template for our shortcode
         *
         * Allows us to toggle between views on our
         * shortcodes.
         *
         * @see /templates/tmpl-pboxes.html
         * 
         * @type {void}
         */
        template : media.template( 'pboxes' ),




        /**
         * Holds the data that will be passed to the template
         *
         * This data consists of the attributes inserted in the
         * shortcode tag. The data is organized into an array of
         * objects. i.e. {name: "pboxes_box[type]", value: "div"}
         * 
         * @type {Array}
         */
        data: {},




        /**
         * Holds the dialogId attribute
         *
         * May be changed.
         * 
         * @type {String}
         */
        dialogId: '#pboxes_dialog',




        /**
         * Initiate our shortcode
         * 
         * @param  {Object} editor   tiniMCE.activeEditor object
         * @param  {string} selected content selected from the editor
         * @return {void}            contruct our object and opens shortcode dialog
         */
        init: function(editor, selected){

            this.editor = editor;
            console.log(this.editor.selection.getContent());
            this.innerContent = selected;
            
            this.dialog = $(this.dialogId);

            this.openDialog();
        },




        /**
         * Open Box shortcode dialog
         *
         * @return {void}
         */
        openDialog: function() {

            var values = values || [];

            /**
             * Set Content
             *
             * Clears the content on the editor and inserts selected content if any.
             */


            // Show the dialog
            this.dialog.fadeIn();

            // Bind Insert btn once only
            jQuery(document).off('click').on('click', '#pboxes_insert_shortcode_btn', wp.mce.pboxes.insertBox);

            return false;
        },




        insertBox: function() {
            // Get all shortcode attributes
            // shorten our object for later
            var options = $('#pboxes_box_form').serializeArray(),
            self = wp.mce.pboxes,
            s = '[pboxes';

            for ( var i = 0; i < options.length; i++ ) {
                ( options[i].value !== '' ) ? s += ' ' + options[i].name + '="' + options[i].value + '"' : '';
                self.data[options[i].name] = options[i].value;
            }


            if ( self.innerContent !== '' ) {
                s += ']' + self.innerContent + '[/pboxes';
                self.data["innerContent"] = self.innerContent;
            }

            s += ']';
            
            self.editor.insertContent( s );

            self.closeDialog();
        },




        getContent: function() {
            var options = this.shortcode.attrs.named;
            options['innerContent'] = this.shortcode.content;
            return this.template(options);
        },




        edit: function( data, update ) {
            var shortcode_data = wp.shortcode.next(shortcode_string, data);
            var values = shortcode_data.shortcode.attrs.named;
            values['innercontent'] = shortcode_data.shortcode.content;
            wp.mce.pboxes.init(tinyMCE.activeEditor, shortcode_data.shortcode.content);
        },




        closeDialog: function() {
            // Close the dialog
            this.dialog.fadeOut();
        }
    }

    wp.mce.views.register( shortcode_string, wp.mce.pboxes );

}(jQuery));