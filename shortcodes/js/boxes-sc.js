/**
 * Register Boxes shortcode button and plugin
 */
(function($){

    $(document).ready(function() {

        // create tinyMCE plugin for Premise Boxes
        tinymce.create('tinymce.plugins.pboxes_add_box_plugin', {


            /**
             * create our pugin
             * 
             * @param  {object} ed  the editor object
             * @param  {string} url path to this file's directory
             * @return {void}       creates and initiates our plugin in tinymce
             */
            init : function(ed, url) {

                PboxesUi.init(ed);
            },

        });

        // Register our TinyMCE plugin
        // first parameter is the button ID
        // second parameter must match the first parameter of the tinymce.create() function above
        tinymce.PluginManager.add('pboxes_add_box_button', tinymce.plugins.pboxes_add_box_plugin);
    });




    /**
     * Premise Boxes UI Object
     * 
     * @type {Object}
     */
    var PboxesUi = {

        /**
         * the active editor
         * 
         * @type {object}
         */
        editor: null,


        /**
         * initiate our object
         * 
         * @param  {object} ed the active editor
         */
        init: function(ed){

            ed = 'object'  === typeof ed  ? ed  : null;

            // If there is no object, exit
            if ( null === ed ) return false;

            this.editor = ed;

            $(window).load(function(){

                PboxesMetaBox.init();

                PboxesUi.bindEvents();

            });

            return false;
        },


        /**
         * Bind Events
         */
        bindEvents: function() {
            var ed = this.editor,
            edBody = $( ed.getBody() );

            edBody.addClass('pboxes_ui_editor');
            
            this.bindUiRole();

            ed.on( 'change', function( e, o ){
                if ( e.originalEvent && 'mceToggleFormat' == e.originalEvent.command ) {
                    PboxesUi.bindUiRole();
                }
                console.log('editor changed');
                return false;
            });

            return false;
        },


        /**
         * adds role="pboxes_ui" to all aplicabe elements in the editor body
         */
        bindUiRole: function() {
            var ed = this.editor,
            edBody = $( ed.getBody() );
            
            edBody.find('section,article,div,a').attr( 'role', 'pboxes_ui' );

            var ui = edBody.find( '[role="pboxes_ui"]' );

            ui.click(function(e){
                // prevent the event from bubbling up the DOM
                e.stopPropagation();

                if ( $(this).is( '[data-pboxes-active="on"]' ) ) {
                    $(this).removeAttr( 'data-pboxes-active' );
                    PboxesMetaBox.clearControls();
                    return false;
                }

                // Reset the UI active class
                ui.removeAttr( 'data-pboxes-active' );
                $(this).attr( 'data-pboxes-active', 'on' );

                PboxesMetaBox.updateControls( $(this) );
            });
        },


        /**
         * udate UI element based on options from the meta box
         * 
         * @param  {object} updates holds options (name: value)
         */
        updateUI: function (updates) {
            updates = updates || [];
            
            var ui = this.getActiveUi();

            if ( ui ) {
                
                ui.attr( 'id', updates.pboxes_id );
                
                ui.attr( 'class', updates.pboxes_class );
                
                ui.attr( 'style', updates.pboxes_style );
                ui.attr( 'data-mce-style', updates.pboxes_style );

            }
            else {
                alert( 'There is no active UI selected.' );
            }

            return false;
        },



        /**
         * returns active ui element if selected or false if none found
         * 
         * @return {mixed} ui object if found, false otherwise
         */
        getActiveUi: function() {
            if ( null === this.editor ) {
                console.error('There os no editor selected');
                return false;
            }

            var ui = $( this.editor.getBody() ).find( '[data-pboxes-active="on"]' );

            return ui.length > 0 ? ui : false;
        }

    }



    /**
     * Premise Boxes Meta Box Object
     *
     * Holds methods and properties to handle the meta box options for each UI element
     * 
     * @type {Object}
     */
    var PboxesMetaBox = {

        /**
         * Holds controls meta box
         * 
         * @type {object}
         */
        controls: null,


        /**
         * holds btn element
         * 
         * @type {object}
         */
        btn: null,

        /**
         * holds active UI element
         * 
         * @type {object}
         */
        activeUI: null,


        /**
         * initiate our object
         */
        init: function() {

            this.bindEvents();
        },


        /**
         * Binds events for meta box to work properly
         * 
         * @return {void} binds events only. does not return a value
         */
        bindEvents: function() {

            // save controls if they exist otherwise
            this.controls = $('#pboxes_ui_controls').length === 1 ? $('#pboxes_ui_controls') : null;

            // load controls
            this.wakeRenders();

            // Bind btn evt if btn exists
            $('#pboxes_ui_update_btn').length === 1 ? this.bindUpdate() : false;

            // onclick updates the render view
            $('.pboxes_ui_render_selection a').click(function(){
                var a = $(this),
                self = PboxesMetaBox;

                a.parents('.pboxes_ui_render_selection').find('a').removeClass('pboxes_active');
                a.parents('.pboxes_ui_render').find('.premise-field').removeClass('pboxes_active');

                a.addClass('pboxes_active');

                // self.wakeControls(a);
                self.wakeRenders()
            });


            this.bindRenders();

            // if a UI is already selected
            if ( PboxesUi.getActiveUi() ) {
                this.updateControls( PboxesUi.getActiveUi() );
            }
        },


        bindRenders: function() {
            var self = PboxesMetaBox;
            /**
             * load styles 1 Render
             */
            var pboxes_ui_styles_1 = {

                fields: [
                    {
                        id: 'pboxes_margin',
                        control: 'style',
                        property: 'margin',
                    },
                    {
                        id: 'pboxes_padding',
                        control: 'style',
                        property: 'padding',
                    },
                    {
                        id: 'pboxes_background',
                        control: 'style',
                        property: 'background-color',
                    },
                ],
            }

            // $(document).on('pboxes_before_update', function(){
            //     for ( var i = 0; i < pboxes_ui_styles_1.fields.length; i++ ) {
            //         var id = pboxes_ui_styles_1.fields[i].id,;
            //         value = $('#'+id).val();

            //         if ( )
            //     }
            // });
        },



        /**
         * Bind event for update button
         */
        bindUpdate: function() {
            var btn = this.btn = $('#pboxes_ui_update_btn'),
            self = this;

            btn.click(function(){
                if ( PboxesUi.getActiveUi() ) {
                    $(document).trigger('pboxes_before_update');
                    self.tryUpdating();
                }
                else {
                    alert('There is no active UI selected.');
                }
                return false;
            });

            return false;
        },



        /**
         * try updating UI element
         */
        tryUpdating: function() {
            var ctrls = this.controls,
            fields    = this.getFields(),
            updates   = {};

            // build updates data, exclude update btn
            fields.each( function(){
                updates[this.id] = $(this).val();
            });

            PboxesUi.updateUI(updates);

            return false;
        },



        /**
         * update controls when UI element is selected or on load
         * 
         * @param  {object} uiElm UI element to update controsl from
         */
        updateControls: function( uiElm ) {
            uiElm = uiElm || null;

            if ( uiElm && this.controls ) {
                this.activeUI = uiElm;
                this.uiControlsMap();
            }

            $('#pboxes_ui_active_box span').text( $(uiElm).prop('tagName') );
        },



        /**
         * gets working attributes from UI element and maps them to th meta box fields
         * 
         * @return {void} maps attrs to fields for user to edit
         */
        uiControlsMap: function() {
            var attrs = ['id', 'class', 'style'];
            
            // Loops through the attrs array to assign the value for each meta box field 
            for ( var i = 0; i < attrs.length; i++ ) {

                var attr = this.activeUI.attr( attrs[i] );

                attr ?
                    this.controls.find( '#pboxes_'+attrs[i] ).val( attr ) :
                        this.controls.find( '#pboxes_'+attrs[i] ).val( '' );
            }
            return false;
        },


        /*
            Helpers
         */
        
        /**
         * Clear controls
         */
        clearControls: function() {
            var fields = this.getFields();
            fields.each(function(){
                $(this).val('');
            });
            $('#pboxes_ui_active_box span').text('Active Box');
        },


        /**
         * Get the fields in the controls meta box excluding the button
         * 
         * @return {array} array of field objects
         */
        getFields: function() {
            return this.controls.find( '[id^=pboxes_]:not(#pboxes_ui_update_btn)' );
        },



        wakeControls: function( str ) {
            // var self = PboxesMetaBox;
            if ( ! this.controls ) return false;
            this.controls.find('.premise-field').removeClass('pboxes_active');
            this.controls.find('#pboxes_'+str).parents('.premise-field').addClass('pboxes_active');
        },


        wakeRenders: function() {
            $('.pboxes_ui_render').each(function(){
                var active = $(this).find('.pboxes_ui_render_selection > a.pboxes_active').text().toLowerCase();
                $(this).find('#pboxes_'+active).parents('.premise-field').addClass('pboxes_active');
            });
        }
    }






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
         * Prefills the box's content if any. opens the dialog.
         *
         * @return {void} opens dialog. does not return a value
         */
        setBox: function() {
            var self = wp.mce.pboxes;
            '' !== self.boxContent ? self.editor.setContent(self.boxContent) : false;
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
            $('#pboxes_insert_shortcode_btn').off('click').click(wp.mce.pboxes.insertBox);

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

            // Loop through options
            // parse shortcode string
            // save options and content
            for ( var i = 0; i < options.length; i++ ) {
                // remove 'pboxes_' from name attr
                var _key = options[i].name.substr(7);

                // parse shortcode attributes
                // exclude if empty or if is content
                ( '' !== options[i].value && 'box_content' !== _key ) ? s += ' ' + _key + '="' + options[i].value + '"' : '';
            }

            // parse shortcode content if any
            if ( '' !== content ) {

                s += ']' + content + '[/pboxes';
            }

            s += ']'; // close shortcode
            
            self.wpEditor.insertContent( s );

            self.closeDialog();

            return false;
        },




        /**
         * get Content
         * 
         * @return {string} shortcode string or template
         */
        getContent: function() {
            var box = this.shortcode.attrs.named;
            box.innerContent = this.shortcode.content ? htmlEncode(this.shortcode.content) : '';

            console.log(box.innerContent)
            console.log(htmlEncode(box.innerContent));

            wp.mce.pboxes.box = box;
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
            var self        = wp.mce.pboxes,
            shortcode_data  = wp.shortcode.next(shortcode_string, data);
            self.boxContent = shortcode_data.shortcode.content ? shortcode_data.shortcode.content : '';

            self.resets();
            self.setBox();
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

    

    function htmlEncode(value){
      //create a in-memory div, set it's inner text(which jQuery automatically encodes)
      //then grab the encoded contents back out.  The div never exists on the page.
      return $('<div/>').text(value).html();
    }

    function htmlDecode(value){
      return $('<div/>').html(value).text();
    }

}(jQuery));
