<?php
/**
 * Render Event Title Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context[ $block->name ] ) ) {
	return;
}

$block_context = $block->context[ $block->name ];

if ( ! isset( $block_context['description'] ) ) {
	return;
}

$description = wp_specialchars_decode( $block_context['description'] );

$wrapper_attributes = get_block_wrapper_attributes();

printf(
	'<div %1$s>%2$s</div>',
	// phpcs:ignore
	$wrapper_attributes,
	wp_kses_post( $description )
);
