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
		<div id="pboxes_shortcode_dialog">
			<div class="pboxes_shortcode_dialog_inner">
				<form id="pboxes_box_form">
					<?php 

					$elements = array(
						'div' => 'div', 
						'span' => 'span', 
						'section' => 'section', 
						'article' => 'article', 
					);

					premise_field( 'select', 
						array( 
							'name' => 'pboxes_type', 
							'options' => $elements, 
						) 
					);

					premise_field( 'text', 
						array( 
							'name' => 'pboxes_id', 
							'placeholder' => 'id', 
						) 
					);

					premise_field( 'text', 
						array( 
							'name' => 'pboxes_class', 
							'placeholder' => 'class', 
						) 
					);

					premise_field( 'textarea', 
						array( 
							'name' => 'pboxes_style', 
							'placeholder' => 'style', 
						) 
					);

					premise_field( 'textarea', 
						array( 
							'name' => 'pboxes_attributes', 
							'placeholder' => 'attributes', 
						) 
					);

					?>

					<div class="premise-clear" style="margin-bottom: 30px;"></div>

					<div class="premise-float-right">

						<?php 
						// display the button
						premise_field( 'button', array( 'id' => 'pboxes_insert_shortcode_btn', 'value' => 'Insert Shortcode' ) ); ?>

					</div>

					<div class="premise-clear" style="margin-bottom: 30px;"></div>
				</form>
			</div>
		</div>
	</div>
	<?php 
}


?>