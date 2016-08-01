<?php
/**
 * The html temlate for our tinymce plugin to insert a box from the editor
 *
 * @package premise-boxes\view
 */

// Load up WordPress into our iFrame
$absolute_path = __FILE__;
$path_to_file = explode( 'wp-content', $absolute_path );
$path_to_wp = $path_to_file[0];

require_once( $path_to_wp . 'wp-load.php' );

if ( ! is_user_logged_in() || ! current_user_can( 'edit_posts' ) )
	wp_die( 'Oops! You can\'t call this page directly.' );
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<!-- Disable browser caching of dialog window -->
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />

    <!-- <link rel="stylesheet" href="<?php echo esc_url( plugins_url( 'Premise-Boxes/css/admin/tinymce-plugin-popoup.css' ) ); ?>"> -->

    <?php // load worpress head. we need Premise and jQuery
    wp_head(); ?>

    <style type="text/css">
    	body.premise-box-popup-window {}
    	#pboxes-dialog-form {
    		display: block;
    		box-sizing: border-box;
    		padding: 20px;
    		position: relative;
    		height: 100%;
    	}
    </style>
</head>

<body <?php body_class( 'premise-box-popup-window' ); ?>>

	<form id="pboxes-dialog-form" action="" method="post">

		<div class="premise-row">
			<?php
			// insert a class
			premise_field( '', array(
				'label'         => 'Insert a class',
				'name'          => 'class',
				'wrapper_class' => 'span6',
			) );
			// insert an id
			premise_field( '', array(
				'label'         => 'Insert an id',
				'name'          => 'id',
				'wrapper_class' => 'span6',
			) );
			// insert content
			// premise_field( 'textarea', array(
			// 	'label'         => 'Content',
			// 	'name'          => 'innercontent',
			// 	'wrapper_class' => 'span12',
			// ) );

			?>
			<div class="span12">
				<?php wp_editor( '', 'innercontent' ); ?>
			</div>
		</div>

		<?php premise_field( 'submit', array( 'wrapper_class' => 'premise-align-right' ) ); ?>

	</form>

<script type="text/javascript">
(function($) {
	// make sure everything has loaded
	$( document ).ready( function() {
		// get all the params passed to our form
		var passed_arguments = top.tinymce.activeEditor.windowManager.getParams(),
		values               = passed_arguments.values,
		callback             = passed_arguments.callback,
		editor               = passed_arguments.editor,
		theForm              = $( '#pboxes-dialog-form' );

		// If we have values, enter them into our form
	    if ( values ) {
	    	var input = theForm.find( 'input:not([type="submit"]),textarea' );
	    	input.each( function() {
	    		$( this ).val( values[$( this ).attr( 'name' )] );
	    	} );
	    };

	    // bind our actions for when the form is submitted
		theForm.submit( function( e ) {
		    callback( e );                // calls our callback
		    editor.windowManager.close(); // close our window popup
		} );
	});
}(jQuery));
</script>

</body>
</html>