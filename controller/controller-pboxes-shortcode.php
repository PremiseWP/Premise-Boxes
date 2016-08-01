<?php
/**
 * Premise Boxes Shortcode
 *
 * @package Premise Boxes
 * @subpackage Controller
 */



/**
* Premise Boxes Hortoced Class
*/
class PBoxes_Shortcode {


	/**
	 * Plugin instance.
	 *
	 * @see get_instance()
	 * @type object
	 */
	protected static $instance = NULL;





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
	 * Construct
	 *
	 * Here we check if the user has enough permissions to use shortcodes in the first place
	 * If they do, we register the necessary hooks for the shortcodes to work.
	 */
	function __construct() {


	}





	public function init_shortcodes() {
		// Abort early if the user will never see TinyMCE
		if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') && get_user_option('rich_editing') == 'true')
		   return;

		// Add a callback to regiser our tinymce plugin
		// add_filter("mce_external_plugins", array( $this, "register_tinymce_plugin" ) );

		// Add a callback to add our button to the TinyMCE toolbar
		// add_filter('mce_buttons', array( $this, 'btn_init' ), 'content' );

	}





	/**
	 * Register TinyMCE Plugin
	 *
	 * Adds the shortcode JS file to TinyMCE.
	 *
	 * @param  array $plugin_array array of plugins
	 * @return array               array of plugins with ours in it
	 */
	public function register_tinymce_plugin($plugin_array) {
	    $plugin_array['pboxes_add_box_button'] = PBOXES_URL . 'shortcodes/js/boxes-sc.js';
	    return $plugin_array;
	}




	/**
	 * Register Shortcode Button
	 *
	 * Adds the button id to the $button array
	 *
	 * @param  array $buttons array of buttons
	 * @return array          array of butttons with ours in there
	 */
	public function btn_init($buttons) {
	    // $buttons[] = "pboxes_add_box_button";
	    $buttons[] = "visualblocks";
		array_unshift( $buttons, 'styleselect' );
		return $buttons;
	}




	/**
	 * Register Shortcode Button
	 *
	 * Adds the button id to the $button array
	 *
	 * @param  array $buttons array of buttons
	 * @return array          array of butttons with ours in there
	 */
	public static function pboxes_btns($buttons) {
	    $buttons[] = "visualblocks";
	    return $buttons;
	}





}




?>