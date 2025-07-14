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

if ( ! isset( $block_context['datetimes'] ) || ! isset( $attributes['dateType'] ) ) {
	return '';
}

$datetimes = $block_context['datetimes'];
$date_type = $attributes['dateType'];

if ( ! is_array( $datetimes ) || empty( $datetimes ) ) {
	return '';
}

// Get datetime string based on currently selected dateType.
$datetime = array_filter(
	$datetimes,
	function ( $dt ) use ( $date_type ) {
		return $dt['label'] === $date_type;
	}
);

if ( empty( $datetime ) ) {
	return '';
}

$datetime = array_shift( $datetime );
// end Get datetime string based on currently selected dateType.

$formatted_date = get_date_from_gmt( $datetime['value'], isset( $attributes['format'] ) ? $attributes['format'] : get_option( 'date_format' ) );
$classes        = array();

if ( isset( $attributes['textAlign'] ) ) {
	$classes[] = 'has-text-align-' . $attributes['textAlign'];
}
if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
	$classes[] = 'has-link-color';
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

if ( isset( $attributes['isLink'] ) && $attributes['isLink'] && ! empty( $datetime['link'] ) ) {
	$formatted_date = sprintf( '<a href="%1s" target="_blank">%2s</a>', $datetime['link'] ? esc_url( $datetime['link'] ) : '', $formatted_date );
}


printf(
	'<div %1$s><time datetime="%2$s">%3$s</time></div>',
	// phpcs:ignore
	$wrapper_attributes,
	esc_attr( $datetime['value'] ),
	// phpcs:ignore
	$formatted_date
);
