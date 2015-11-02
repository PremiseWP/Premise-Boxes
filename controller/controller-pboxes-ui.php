<?php 
/**
 * Premise Boxes UI Class
 *
 * @package Premise Boxes
 * @subpackage Controller
 */


/*
	
	This class explained:

	1. Click shortcode btn
	2. Open dialog window - with editor
	3. Insert shortcode into main editor
		- When saved, the dialog window does not need to save any data in the database
		  It actually inserts the shortcode, which contains all necessary info for the content to display.
		  So an empty editor must load every time. Which allows us to load the same editor every the time.
 */


/**
 * PBoxes UI
 */
class PBoxes_UI {
	

	/**
	 * Class instance.
	 *
	 * @see get_instance()
	 * @type object
	 */
	protected static $instance = NULL;




	protected $boxes = array();
	
	



	/**
	 * Constructor
	 * 
	 * @since 	1.0
	 */
	public function __construct() {
		add_action( 'save_post', array( $this, 'save' ) );

		// array_push( $this->boxes, get_option( 'pboxes_options' ) );
	}

	



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
	 * Init the UI
	 *
	 * Register the hook that will display the Premise Boxes UI
	 * on every post that has an edit screen - Every post that was
	 * assigned a value true to the param 'show_ui' when registered.
	 * 
	 * 
	 * @return void hooks the meta box for the UI
	 */
	public function init_ui() {

		// Call from here to ensure Premise WP has already loaded
		// $this->rand_id = $this->pboxes_box_rand_id();

		// Save the content of our boxes
		// $this->get_boxes();

		// Add the meta box
		$this->add_meta_box();
	}




	/**
	 * Render the UI
	 *
	 * Displays the Premise Boxes UI in the edit screen of a post or page.
	 * The UI meta box is displayed on every post type (even custom post types) 
	 * that when created where given the parameter 'show_ui' a value of true. Basically,
	 * the UI only displays on posts that have an edit screen.
	 *
	 * @wphooks add_meta_box
	 * @see $this->init_ui() init_ui calls this function
	 * 
	 * @return string html markup for Premise Boxes UI
	 */
	public function render_ui() {

		wp_nonce_field( 'pboxes_ui_editor', 'pboxes_ui_nonce' );
	}





	public function save( $post_id ) {
		// Check if our nonce is set.
		if ( ! isset( $_POST['pboxes_ui_nonce'] ) ) {
			return;
		}

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $_POST['pboxes_ui_nonce'], 'pboxes_ui_editor' ) ) {
			return;
		}

		// If this is an autosave, our form has not been submitted, so we don't want to do anything.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Check the user's permissions.
		if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

			if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return;
			}

		} else {

			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}
		}

		/* OK, it's safe for us to save the data now. */
		
		// Make sure that it is set.
		if ( ! isset( $_POST['pboxes_box'] ) ) {
			return;
		}

		// Sanitize user input.
		$my_data = $_POST['pboxes_box'];

		// Update the meta field in the database.
		update_post_meta( $post_id, 'pboxes_box', $my_data );
	}





	protected function pboxes_box_rand_id() {
		// May remove this function. currently not being used
		// content of this function moved to library or shortcode files
		// return premise_rand_str();
	}





	protected function get_boxes() {
		global $post;

		$this->boxes = get_post_meta( $post->ID, 'pboxes_box', true );
	}




	protected function add_meta_box() {
		$screens = get_post_types( array( 'show_ui' => true ) );

		foreach ( $screens as $screen ) {
			add_meta_box(
				'pboxes_ui_meta_box',
				'Premise Boxes UI',
				array( $this, 'render_ui' ),
				$screen,
				'normal',
				'high'
			);
		}
	}
}





?>