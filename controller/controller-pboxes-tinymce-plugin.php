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
		// Register the plugin if the user has permissions to edit posts
    	if ( current_user_can( 'edit_posts' ) || current_user_can( 'edit_pages' ) ) {
			add_action( 'print_media_templates', array( $this, 'print_media_templates' ) );
			add_filter( "mce_external_plugins" , array( $this, 'mce_plugin' ) );
			add_filter( "mce_buttons"          , array( $this, 'mce_button' ) );
			add_action( 'admin_footer'         , array( $this, 'insert_editor' ) );
		}
	}


	/**
	 * Register the tiny mce plugin
	 *
	 * @param  array $plugin_array  plugins being loaded by tinymce
	 * @return array                new array of plugins to load including ours
	 */
	public function mce_plugin($plugin_array){
		$plugin_array['pboxes_mce_box'] = plugins_url( '/premise-boxes/js/pboxes-tinymce-plugin.js' );
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
	 * Insert Pboxes editor
	 *
	 * @return string html for editor dialog
	 */
	public function insert_editor( $hook ) {
		?>
		<div id="pboxes_dialog" style="display:none;">
			<div class="pboxes-dialog-header">
				<div class="pboxes-dialog-controls premise-clear-float">
					<div class="pboxes-dialog-control pboxes-dialog-close  premise-float-right"><i class="fa fa-close"></i></div>
					<div class="pboxes-dialog-control pboxes-dialog-tooltip premise-float-right">
						<i class="fa fa-question"></i>
						<span>
							<p>A box allows you to wrap content from the WYSIWYG editor within HTML.</p>
							<p>Content managers can insert content using the WYSIWYG editor while developers insert HTML to manipulate said content in a secific way.</p>
							<p>From the developer's UI you can also set classes and/or an id for the box.</p>
						</span>
					</div>
				</div>
				<h2>Premise Box</h2>
			</div>
			<div class="pboxes-dialog-body">
				<form id="pboxes-dialog-form" action="" method="post">

						<div id="pboxes-content-editor">
							<div class="pwp-align-right">
								<a href="javascript:void(0);" class="pboxes-toggle-editors pwp-inline-block">Toggle Editors</a>
							</div>

							<div class="pboxes-wysiwyg-editor span12 pboxes-show">
								<h3>Your Box Content</h3>
								<?php wp_editor( '', 'pbox_innercontent', array( 'name' => 'pbox_innercontent', 'teeny' => true, 'editor_height' => 300 ) ); ?>
							</div>

							<div class="pboxes-code-editor">
								<?php
								// insert a class
								premise_field( '', array(
									'label'         => 'Insert a class',
									'name'          => 'pbox_class',
									'wrapper_class' => 'span6',
									'before_wrapper'  => '<div class="premise-row">',
								) );
								// insert an id
								premise_field( '', array(
									'label'         => 'Insert an id',
									'name'          => 'pbox_id',
									'wrapper_class' => 'span6',
									'after_wrapper'  => '</div>',
								) );
								// insert content
								premise_field( 'textarea', array(
									// 'label'         => 'HTML Wrapper',
									'name'          => 'pbox_wrapper',
									'wrapper_class' => 'span12',
									'before_field'  => '<h3>Code Editor</h3><p>Use this editor for additional control over your box. Enter wrapper html and use <code>%%CONTENT%%</code> to insert the content.</p>',
								) ); ?>
							</div>
						</div>

					<?php // premise_field( 'submit', array( 'wrapper_class' => 'premise-align-right pboxes-box-submit' ) ); ?>

				</form>
			</div>
			<div class="pboxes-dialog-footer pwp-clear-float">
				<div class="pwp-float-right">
					<a href="javascript:;" id="pboxes-submit-box">
						Insert Box
					</a>
				</div>
			</div>
		</div>
		<?php
	}
}
?>