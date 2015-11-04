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
		<div class="pboxes_shortcode_dialog">
			<div class="pboxes_shortcode_dialog_header premise-clear-float">
				<a href="javascript:void(0);" id="pboxes_insert_shortcode_btn">
					<i class="fa fa-check"></i>
				</a>
				<a href="javascript:void(0);" onclick="wp.mce.pboxes.closeDialog()" id="pboxes_close_dialog">
					<i class="fa fa-times"></i>
				</a>
				<h3>Insert A Box</h3>
			</div>
			<div class="pboxes_shortcode_dialog_inner">
				
				<form id="pboxes_box_form">
					
					<div id="pboxes_box_atts">
						
						<div class="pboxes_box_wp_editor">
							<?php wp_editor( '', 'pboxes_box_content', array( 'teeny' => true ) ); ?>
						</div>

						<?php 

						// To support multiple elements in the future
						// currently only div is supported
						// $elements = array(
						// 	'div' => 'div', 
						// 	'span' => 'span', 
						// 	'section' => 'section', 
						// 	'article' => 'article', 
						// );

						// premise_field( 'select', 
						// 	array( 
						// 		'name' => 'pboxes_type', 
						// 		'options' => $elements, 
						// 	) 
						// );

						$options = array(
							array( 
								'type' => 'text', 
								'name' => 'pboxes_id', 
								'placeholder' => 'id', 
								'label' => 'id Attribute', 
							), 
							array( 
								'type' => 'text', 
								'name' => 'pboxes_class', 
								'placeholder' => 'class', 
								'label' => 'class  Attribute', 
							), 
							array( 
								'type' => 'text', 
								'name' => 'pboxes_style', 
								'placeholder' => 'style', 
								'label' => 'style  Attribute', 
							), 
							array( 
								'type' => 'text', 
								'name' => 'pboxes_attributes', 
								'placeholder' => 'data-msg="You clicked Me!" onclick="alert(this.data-msg);"', 
								'label' => 'Additional  Attributes', 
							),
						);

						premise_field_section( $options );
						?>
					</div>
					
				</form>
			</div>
		</div>
	</div>
	<?php 
}


?>