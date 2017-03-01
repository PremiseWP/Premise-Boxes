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
	 * Leave blank and public on purpose
	 */
	function __construct() {}


	/**
	 * initiate our shortcode
	 *
	 * @param  array  $attrs   attributes added by the user
	 * @param  string $content the shortcode content
	 * @return string          shortcode html to be placed in the site
	 */
	public function init_shortcode( $attrs, $content = '' ) {

		$a = shortcode_atts( array(
			'pbox_class' => '',
			'pbox_id' => '',
			'pbox_wrapper' => '',
		), $attrs, 'pwp_boxes' );

		ob_start();
		?>
		<div class="pboxes-box <?php echo esc_attr( $a['pbox_class'] ); ?>" id="<?php echo esc_attr( $a['pbox_id'] ); ?>">
			<?php if ( ! empty( $a['pbox_wrapper'] ) ) {
				echo do_shortcode( str_replace( '%%CONTENT%%', urldecode( $content ), urldecode( $a['pbox_wrapper'] ) ) );
			}
			else {
				echo do_shortcode( urldecode( $content ) );
			} ?>
		</div>
		<?php

		$html = ob_get_clean();

		return $html;
	}
}
?>