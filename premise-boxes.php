<?php 
/**
 * Plugin Name: Premise Boxes
 * Description: Create block, grids, full-width blocks, anything you want with Premise Boxes.
 * Plugin URI:	https://github.com/vallgroup/Premise-Boxes
 * Version:     1.0
 * Author:      Vallgroup LLC
 * Author URI:  http://vallgroup.com
 * License:     GPL
 * Text Domain: premise-boxes-text-domain
 *
 * @package Premise Boxes
 */




/**
 * Define constants for plugin's url and path
 */
define( 'PBOXES_PATH', plugin_dir_path(__FILE__) );
define( 'PBOXES_URL', plugin_dir_url(__FILE__) );




/**
 * Check for required plugins
 */
require PBOXES_PATH . 'plugins/premise-plugin-require.php';




/**
 * Intantiate and setup Premise Boxes
 */
add_action( 'plugins_loaded', array( Premise_Boxes::get_instance(), 'pboxes_setup' ) );




/**
 * The Premise Boxes Main Class
 */
class Premise_Boxes {
	

	/**
	 * Plugin instance.
	 *
	 * @see get_instance()
	 * @type object
	 */
	protected static $instance = NULL;


	

	/**
	 * plugin url
	 * 
	 * @var string
	 */
	public $plugin_url = PBOXES_URL;




	/**
	 * plugin path
	 * 
	 * @var strin
	 */
	public $plugin_path = PBOXES_PATH;
	
	



	/**
	 * Constructor. Intentionally left empty and public.
	 *
	 * @see 	pboxes_setup()
	 * @since 	1.0
	 */
	public function __construct() {}

	



	/**
	 * Access this plugin’s working instance
	 *
	 * @since   1.0
	 * @return  object of this class
	 */
	public static function get_instance() {
		NULL === self::$instance and self::$instance = new self;
		
		return self::$instance;
	}





	/**
	 * Setup Premise Boxes
	 *
	 * @since   1.0
	 */
	public function pboxes_setup() {
		$this->do_includes();

		$this->pboxes_hooks();
	}






	/**
	 * Includes
	 *
	 * @since 1.0
	 */
	protected function do_includes() {
		// controller files
		include PBOXES_PATH . 'controller/controller-pboxes-ui.php';
		include PBOXES_PATH . 'controller/controller-pboxes-shortcode.php';

		// library files
		include PBOXES_PATH . 'library/pboxes-library.php';
	}

	


	
	/**
	 * Premise Boxes Hooks
	 */
	public function pboxes_hooks() {
		
		// Enqueue scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'pboxes_scripts' ) );

		// Enqueue admin scripts
		add_action( 'admin_enqueue_scripts', array( $this, 'pboxes_scripts' ) );

		// Add Meta Boxes for custom UI
		add_action( 'add_meta_boxes', array( PBoxes_UI::get_instance(), 'init_ui' ) );

		// Add Shortcode button
		add_action( 'init', array( PBoxes_Shortcode::get_instance(), 'init_shortcodes' ) );

		// Insert editor for boxes
		add_action( 'admin_footer', array( $this, 'insert_editor' ) );

		add_action( 'print_media_templates', array( $this, 'media_templates' ) );
	}






	/**
	 * Premise Boxes CSS & JS
	 */
	public function pboxes_scripts( $hook ) {
		//register styles
		wp_register_style( 'pboxes_style_css'   , PBOXES_URL . 'css/Premise-Boxes.min.css' );
		
		//register scripts
		wp_register_script( 'pboxes_script_js'  , PBOXES_URL . 'js/Premise-Boxes.min.js', array( 'jquery' ) );

		// enqueue both
		if ( ( 'post.php' == $hook || 'post-new.php' == $hook ) ) {
			wp_enqueue_style( 'pboxes_style_css' );
			wp_enqueue_script( 'pboxes_script_js' );
		}
	}





	/**
	 * Insert Pboxes editor
	 * 
	 * @return string html for editor dialog
	 */
	public function insert_editor() {
		pboxes_new_box_dialog();
	}




	public function media_templates() {
        if ( ! isset( get_current_screen()->id ) || get_current_screen()->base != 'post' )
            return;
	    include_once __DIR__ . '/templates/tmpl-pboxes.html';
	}
}




?>