<?php
/**
 * Render No Results Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

$resources = $block->context['resources'];

if ( is_array( $resources ) && ! empty( $resources ) ) {
	return '';
}

if ( empty( trim( $content ) ) ) {
	return '';
}

$classes            = ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) ? 'has-link-color' : '';
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classes ) );

printf(
	'<div %1$s>%2$s</div>',
	// phpcs:ignore
	$wrapper_attributes,
	// phpcs:ignore
	$content
);
