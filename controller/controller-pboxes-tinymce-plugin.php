<?php
/**
 * Register the TinyMCE plugin and shortcode button
 *
 * @package premise-boxes\controller
 */
class PBoxes_Tinymce_Plugin {

	/**
	 * holds the class working instance
	 *
	 * @var null
	 */
    private static $instance = null;


    /**
     * Instantiate our class
     *
     * @return object an instance of this class
     */
    public static function get_instance() {
        if ( ! self::$instance )
            self::$instance = new self;
        return self::$instance;
    }


    /**
     * Register the tinymce plugin and necessary assets
     *
     * @return void registers plugin and enqueues styles and scipts.
     */
	public function init(){
		// comment this 'add_action' out to disable shortcode backend mce view feature

		// add_action( 'admin_init', array( $this, 'init_plugin' ), 20 );

        // add_shortcode( 'boutique_banner', array( $this, 'dtbaker_shortcode_banner' ) );

		// Register the plugin if the user has permissions to edit posts
    	if ( current_user_can( 'edit_posts' ) || current_user_can( 'edit_pages' ) ) {
			add_action( 'print_media_templates'             , array( $this, 'print_media_templates' ) );
			add_action( 'admin_head'                        , array( $this, 'admin_head' ) );
			add_filter( "mce_external_plugins"              , array( $this, 'mce_plugin' ) );
			add_filter( "mce_buttons"                       , array( $this, 'mce_button' ) );
		}
	}


	/**
	 * Register the tiny mce plugin
	 *
	 * @param  array $plugin_array  plugins being loaded by tinymce
	 * @return array                new array of plugins to load including ours
	 */
	public function mce_plugin($plugin_array){
		$plugin_array['dtbaker_mce_banner'] = plugins_url( '/Premise-Boxes/js/admin/controller-tinymce-plugin.js' );
		return $plugin_array;
	}


	/**
	 * Register the tinymce button for our shortcode
	 *
	 * @param  array $buttons array of buttons being loaded
	 * @return array          new array includeing our button
	 */
	public function mce_button($buttons){
        array_push($buttons, 'pboxes_mce_box_button');
		return $buttons;
	}


    /**
     * Print the shortcode template in the editor page
     *
     * @return string the template for the shortcode when viewed from the Visual editor
     */
    public function print_media_templates() {
        if ( ! isset( get_current_screen()->id ) || get_current_screen()->base != 'post' )
            return;
        include_once PBOXES_PATH . '/view/view-tinymce-plugin-editor-template.html';
    }


    /**
     * Load our tinymce plugin JS file so that when called by tinymce, it works
     *
     * @return void enqueues our file to the admin head of the editor page
     */
    public function admin_head() {
		$current_screen = get_current_screen();
		if ( ! isset( $current_screen->id ) || $current_screen->base !== 'post' ) {
			return;
		}

		wp_enqueue_script( 'boutique-banner-editor-view', plugins_url( '/Premise-Boxes/js/admin/model-tinymce-plugin.js' ), array( 'shortcode', 'wp-util', 'jquery' ), false, true );
    }


	// front end shortcode displaying:
	// public function dtbaker_shortcode_banner($atts=array(), $innercontent='', $code='') {
	//     $sc_atts = shortcode_atts(
 //    		array(
 //        		'id' => false,
 //        		'title' => 'Special:',
 //        		'link' => '',
 //        		'linkhref' => '',
 //    		),
 //    		$atts
	//     );
	//     $sc_atts['banner_id'] = strtolower(preg_replace('#\W+#','', $sc_atts['title'])); // lets put everything in the view-data object
	//     $sc_atts = (object) $sc_atts;

	// 	// Use Output Buffering feature to have PHP use it's own enging for templating
	//     ob_start();
	//     include PBOXES_PATH . '/views/dtbaker_shortcode_banner_view.php';
	//     return ob_get_clean();
	// }
}
?>