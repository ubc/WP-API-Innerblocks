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

if ( ! isset( $block_context['terms'] ) ) {
	return '';
}

$terms = $block_context['terms'];

if ( ! is_array( $terms ) || empty( $terms ) ) {
	return '';
}

$terms_by_taxonomy = array_filter(
	$terms,
	function ( $term ) use ( $attributes ) {
		return $term['taxonomy'] === $attributes['taxonomy'];
	}
);

// If no terms found, return an empty string.
if ( empty( $terms_by_taxonomy ) ) {
	return '';
}

// Get the first group of terms.
$terms_by_taxonomy = array_values( $terms_by_taxonomy )[0];

// Generate HTML for terms.
$terms_html = array_map(
	function ( $term ) {
		if ( ! isset( $term['link'] ) ) {
			return '<span>' . wp_specialchars_decode( $term['name'] ) . '</span>';
		}
		return '<a href="' . esc_url( $term['link'] ) . '" target="_blank">' . wp_specialchars_decode( $term['name'] ) . '</a>';
	},
	$terms_by_taxonomy['terms']
);

// Join terms with the separator.
$terms_html = implode( '<span>' . $attributes['separator'] . '</span>', $terms_html );

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', array() ) ) );

printf(
	'<div %1$s>%2$s</div>',
	// phpcs:ignore
	$wrapper_attributes,
	wp_kses_post( $terms_html )
);
