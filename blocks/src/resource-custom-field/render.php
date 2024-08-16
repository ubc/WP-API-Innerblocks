<?php
/**
 * Render Event Title Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context['custom'] ) || ! isset( $attributes['selectedCFLabel'] ) ) {
	return '';
}

$custom_fields     = $block->context['custom'];
$url               = isset( $block->context['link'] ) ? $block->context['link'] : '';
$selected_cf_label = $attributes['selectedCFLabel'];

if ( ! is_array( $custom_fields ) || empty( $custom_fields ) ) {
	return '';
}

// Get datetime string based on currently selected dateType.
$custom_field = array_filter(
	$custom_fields,
	function ( $cf ) use ( $selected_cf_label ) {
		return $cf['label'] === $selected_cf_label;
	}
);

if ( empty( $custom_field ) ) {
	return '';
}

$custom_field = array_shift( $custom_field )['value'];
// end Get datetime string based on currently selected dateType.

if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
	$content = sprintf( '<a href="%1$s" target="_blank">%2$s</a>', esc_url( $url ), wp_kses_post( wp_specialchars_decode( $custom_field ) ) );
} else {
	$content = wp_kses_post( $custom_field );
}

$classes = array();
if ( isset( $attributes['textAlign'] ) ) {
	$classes[] = 'has-text-align-' . $attributes['textAlign'];
}
if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
	$classes[] = 'has-link-color';
}
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

printf(
	'<p %1$s>%2$s</p>',
	// phpcs:ignore
	$wrapper_attributes,
	wp_kses_post( $content )
);
