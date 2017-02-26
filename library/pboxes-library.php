<?php
/**
 * Premise Boxes Library
 *
 * @package Premise Boxes
 * @subpackage Library
 *
 * @since 1.0
 */



/**
 * Premise Box Admin Dialog
 *
 * @param  string $content content to be passed to the editor. default ''
 * @param  string $id      id to use as the textarea id and name.
 * @return string          html for box dialog and editor
 */
function pboxes_new_box_dialog() {
	?>
	<div id="pboxes_dialog" style="display:none;">
		<div class="pboxes-dialog-header">
			<div class="pboxes-dialog-controls premise-clear-float">
				<div class="pboxes-dialog-control pboxes-dialog-close  premise-float-right"><i class="fa fa-close"></i></div>
				<div class="pboxes-dialog-control pboxes-dialog-tooltip premise-float-right">
					<i class="fa fa-question"></i>
					<span>
						<p>A box allows you to wrap content from the WYSIWYG editor and place into your site content. You can  add your own classes and id which enables you to build markup quickly.</p>
						<p>If you use a framework like <a href="http://premisewp.com" target="_blank">Premise WP</a> or Bootstrap, you can apply classes from said framework here and easily structure your content in the front end.</p>
						<p>Support to insert Boxes within Boxes will be coming soon as well the ability to add more than 'div' elements.</p>
					</span>
				</div>
			</div>
		<h2>Premise Box</h2>
		</div>
		<form id="pboxes-dialog-form" action="" method="post">

			<div class="premise-row">
				<?php
				// insert a class
				premise_field( '', array(
					'label'         => 'Insert a class',
					'name'          => 'pbox_class',
					'wrapper_class' => 'span6',
				) );
				// insert an id
				premise_field( '', array(
					'label'         => 'Insert an id',
					'name'          => 'pbox_id',
					'wrapper_class' => 'span6',
				) );
				// insert content
				premise_field( 'textarea', array(
					'label'         => 'HTML Wrapper',
					'name'          => 'pbox_wrapper',
					'wrapper_class' => 'span12',
				) );

				?>
				<div class="span12">
					<h3>Your Box Content</h3>
					<?php wp_editor( '', 'pbox_innercontent', array( 'name' => 'pbox_innercontent', 'teeny' => true, 'editor_height' => 300 ) ); ?>
				</div>
			</div>

			<?php premise_field( 'submit', array( 'wrapper_class' => 'premise-align-right pboxes-box-submit' ) ); ?>

		</form>
	</div>
	<?php
}


?>