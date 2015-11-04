/**
 * Register Boxes shortcode button and plugin
 */
jQuery(document).ready(function($) {
    
    // create tinyMCE plugin for Premise Boxes and bind button
    tinymce.create('tinymce.plugins.pboxes_add_box_plugin', {
        
        init : function(ed, url) {

            // Register command for when button is clicked
            ed.addCommand('pboxes_add_box_plugin_btn', function() {
        
                // get the selected content
                selected = tinyMCE.activeEditor.selection.getContent();

                // Open dialog and pass the current editor
                wp.mce.pboxes.init();

            });

            // Register buttons - trigger above command when clicked
            ed.addButton('pboxes_add_box_button', {title : 'Insert shortcode', cmd : 'pboxes_add_box_plugin_btn', image: url + '/buttons/add_box_icon.png' });
        },

    });

    // Register our TinyMCE plugin
    // first parameter is the button ID
    // second parameter must match the first parameter of the tinymce.create() function above
    tinymce.PluginManager.add('pboxes_add_box_button', tinymce.plugins.pboxes_add_box_plugin);
});


(function($){

    var media = wp.media, shortcode_string = 'pboxes';
    
    wp.mce = wp.mce || {};

    /**
     * Premise Boxes
     * 
     * @type {Object}
     */
    wp.mce.pboxes = {

        /**
         * The WP default editor
         * 
         * @type {Object}
         */
        wpEditor: {},



        /**
         * The box content editor
         * 
         * @type {Object}
         */
        editor: {},



        /**
         * Holds box content
         * 
         * @type {String}
         */
        boxContent: '',




        /**
         * Holds shrtocdes attributes
         *
         * by default we the property 'type' must be div for now
         * 
         * @type {Array}
         */
        box: {},




        /**
         * Template for our shortcode
         *
         * Allows us to toggle between views on our shortcodes.
         *
         * @see /templates/tmpl-pboxes.html
         * 
         * @type {void}
         */
        template : media.template( 'pboxes' ),




        /**
         * Holds the dialog id attribute
         * 
         * @type {String}
         */
        dialogId: '#pboxes_dialog',




        /**
         * Init
         * 
         * Reset our object. Bind events. Open dialog.
         * 
         * @return {void}            contruct our object and opens shortcode dialog
         */
        init: function() {

            this.resets();

            // get the wp editor selected content
            this.boxContent = this.wpEditor.selection.getContent();

            this.bindEvents();

            this.setBox();
        },



        /**
         * Bind Events
         * 
         * @return {void} binds events needed for pboxes to work properly
         */
        bindEvents: function() {
            // add events here
        },




        /**
         * setBox 
         *
         * Prefills the dialog's form with the values from the shortcode attributes.
         * It also resets the form (obviously!) then opens the dialog
         *
         * @param {object}  box shortcode params
         * @return {string}     values for dialog fields
         */
        setBox: function( box ) {
            box = box || {};

            var self = wp.mce.pboxes,
            fields   = $('#pboxes_box_atts').find('[name^=pboxes_]');

            // loop through fields and prefill form
            fields.each(function(i,v) {
                // get the raw key to be able to match to our object
                // '7' == 'pboxes_'
                var _key = v.id.substr(7);

                if ( 'box_content' == _key ) {
                    self.editor.setContent(self.boxContent);
                }
                else {
                    v.value = box.hasOwnProperty(_key) ? box[_key] : '';
                }
            });

            self.openDialog();
        },




        /**
         * Open Dialog
         *
         * @return {bolean} false
         */
        openDialog: function() {

            // Show the dialog
            $(this.dialogId).fadeIn();

            // Bind Insert btn once only
            jQuery(document).off('click').on('click', '#pboxes_insert_shortcode_btn', wp.mce.pboxes.insertBox);

            return false;
        },




        /**
         * Insert Box
         * 
         * @return {string} insert shortcode into WP post editor
         */
        insertBox: function() {

            var self = wp.mce.pboxes,
            options  = $('#pboxes_box_form').serializeArray(),
            s        = '[pboxes type="div"', // by default element is a div
            content  = self.editor.getContent();

            console.log(content);

            // Loop through options
            // parse shortcode string
            // save options and content
            for ( var i = 0; i < options.length; i++ ) {
                
                // remove 'pboxes_' from name attr
                var _key = options[i].name.substr(7);
                ( '' !== options[i].value && 'box_content' !== _key ) ? s += ' ' + _key + '="' + options[i].value + '"' : '';
            }
            // parse shortcode content if any
            if ( '' !== content ) {
                s += ']' + content + '[/pboxes';
            }

            s += ']'; // close shortcode
            
            self.wpEditor.insertContent( s );

            self.closeDialog();
        },




        /**
         * get Content
         * 
         * @return {string} shortcode string or template
         */
        getContent: function() {
            var box = this.shortcode.attrs.named;
            box.innerContent = this.shortcode.content;

            return this.template(box);
        },




        /**
         * Edit shortcode
         * 
         * @param  {object}   data   shortcode object
         * @param  {function} update callback function
         * @return {void}            loads dialog
         */
        edit: function( data, update ) {
            
            var self       = wp.mce.pboxes,
            shortcode_data = wp.shortcode.next(shortcode_string, data);

            self.resets();

            var box = shortcode_data.shortcode.attrs.named;
            self.boxContent = shortcode_data.shortcode.content;
            self.setBox( box );
        },




        /**
         * close the dialog
         * 
         * @return {void} closes the dialog
         */
        closeDialog: function() {
            $(this.dialogId).fadeOut();
            return false;
        },




        /**
         * Resets
         *
         * Basically constructs our object. called it resets because it will
         * reset our parameters everytime we need to. Sets the wpEditor object,
         * the box content editor object, and starts with a clean box (shortcode attributes) object
         * 
         * @return {void} resets our object
         */
        resets: function() {

            this.wpEditor = tinyMCE.get('content') || {};

            this.editor = tinyMCE.get('pboxes_box_content') || {};
        }
    }

    wp.mce.views.register( shortcode_string, wp.mce.pboxes );

}(jQuery));