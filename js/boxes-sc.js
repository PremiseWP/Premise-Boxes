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
                    PboxesShortcode.init(selected);
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







/**
 * Pboxes Shortcode Object
 * 
 * @type {Object}
 */
var PboxesShortcode = {

    /**
     * Content
     *
     * Holds the content if submitted
     * 
     * @type {string}
     */
    selectedContent: '',



    /**
     * Box shortcode to insert
     * 
     * @type {String}
     */
    box: '',




    /**
     * Holds tinyMCE object for our editor
     * 
     * @type {object}
     */
    pboxesBox: null,




    /**
     * Holds tinyMCE object for post editor
     * 
     * @type {object}
     */
    wpEditor: null,



    /**
     * Holds the dialog object
     * 
     * @type {object}
     */
    dialog: null,




    /**
     * Constrcut our object
     * 
     * @param  {string} selected selected content from WP editor
     * @return {strng}           new box shortcode inserted int WP editor
     */
    init: function(selected) {

        // Save the selected if it was submitted
        this.selectedContent = ( 'string' === typeof selected && '' !== selected ) ? selected : '';

        this.pboxesBox = tinyMCE.editors['pboxes_box'];

        this.dialog = jQuery('#pboxes_dialog');

        this.openDialog();

    },




    /**
     * Bind events for Boxes shortcode
     * 
     * @return {void}
     */
    bindeEvents: function() {

    },




    /**
     * Open Box shortcode dialog
     *
     * @return {void}
     */
    openDialog: function() {
        // Shorten our object name
        var PS = PboxesShortcode;

        /**
         * Set Content
         *
         * Clears the content on the editor and inserts selected content if any.
         */
        // PS.pboxesBox.setContent(PS.selectedContent);


        // Show the dialog
        PS.dialog.fadeIn();

        // Bind Insert btn once only
        jQuery(document).off('click').on('click', '#pboxes_insert_shortcode_btn', PS.insertBox);

        return false;
    },




    /**
     * Insert Box shortcode and close dialog
     * 
     * @return {void}
     */
    insertBox: function() {
        // Shorten our object name
        var PS = PboxesShortcode;

        // PS.box = tinyMCE.editors['pboxes_box'].getContent();

        // Test

        // Reset fields better
        var boxElement    = '' !== jQuery('#pboxes_box-e_type').val()       ? jQuery('#pboxes_box-e_type').val()       : 'div';
        var boxId         = '' !== jQuery('#pboxes_box-e_id').val()         ? jQuery('#pboxes_box-e_id').val()         : '';
        var boxClass      = '' !== jQuery('#pboxes_box-e_class').val()      ? jQuery('#pboxes_box-e_class').val()      : '';
        var boxStyle      = '' !== jQuery('#pboxes_box-e_style').val()      ? jQuery('#pboxes_box-e_style').val()      : '';
        var boxAttributes = '' !== jQuery('#pboxes_box-e_attributes').val() ? jQuery('#pboxes_box-e_attributes').val() : '';
        
        // Build our markup
        PS.box = '<' + boxElement + '>';

        PS.box += PS.selectedContent;

        PS.box += '</' + boxElement + '>';

        // End test

        tinyMCE.editors['content'].insertContent(PS.box);

        PS.box = '';

        boxElement = '';
        boxId = '';
        boxClass = '';
        boxStyle = '';
        boxAttributes = '';

        // Show the dialog
        PS.dialog.fadeOut();

        return false;
    }
}