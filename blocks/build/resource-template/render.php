<?php
/**
 * Render Events Template Block on the serverside.
 *
 * @package ctlt_events_block
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context['resources'] ) ) {
	return '';
}

$resources = $block->context['resources'];

if ( ! is_array( $resources ) || empty( $resources ) ) {
	return '';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wp-block-post-template ubc-api-template',
	)
);

$content = '';

foreach ( $resources as $key => $resource ) {
	$block_instance = $block->parsed_block;

	// Set the block name to one that does not correspond to an existing registered block.
	// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
	$block_instance['blockName'] = 'core/null';

	$filter_block_context = static function ( $context, $parsed_block ) use ( $resource ) {
		$context = array_merge( $context, $resource );
		return $context;
	};

	// Use an early priority to so that other 'render_block_context' filters have access to the values.
	add_filter( 'render_block_context', $filter_block_context, 10, 2 );
	// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
	// `render_callback` and ensure that no wrapper markup is included.

	$block_content = ( new \WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );

	remove_filter( 'render_block_context', $filter_block_context, 10, 2 );

	$content .= '<li class="wp-single-resource">' . $block_content . '</li>';
}

printf(
	'<ul %1$s>%2$s</ul>',
	// phpcs:ignore
	$wrapper_attributes,
	wp_kses_post( $content )
);
