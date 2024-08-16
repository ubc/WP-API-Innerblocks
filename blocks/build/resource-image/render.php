<?php
/**
 * Render Event Title Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context['images'] ) || ! isset( $attributes['imageSource'] ) ) {
	return '';
}

$images     = $block->context['images'];
$image_type = $attributes['imageSource'];
$url        = isset( $block->context['link'] ) ? $block->context['link'] : '';

if ( ! is_array( $images ) || empty( $images ) ) {
	return '';
}

// Get image based on currently selected imageSource.
$image = array_filter(
	$images,
	function ( $img ) use ( $image_type ) {
		return $img['label'] === $image_type;
	}
);

if ( empty( $image ) ) {
	return '';
}

$image = array_shift( $image );

if ( empty( trim( $image['src'] ) ) ) {
	return;
}

$class_names = array();
$styles      = array();

/**
 * Styles
 */
$border_attributes = get_block_core_post_featured_image_border_attributes( $attributes );

if ( ! empty( $border_attributes['class'] ) ) {
	$class_names[] = $border_attributes['class'];
}

if ( ! empty( $border_attributes['style'] ) ) {
	$styles[] = $border_attributes['style'];
}

$styles[] = "height:{$attributes['height']};";

if ( ! empty( $attributes['scale'] ) ) {
	$styles[] = "object-fit:{$attributes['scale']};";
}
if ( ! empty( $attributes['style']['shadow'] ) ) {
	$shadow_styles = wp_style_engine_get_styles( array( 'shadow' => $attributes['style']['shadow'] ) );

	if ( ! empty( $shadow_styles['css'] ) ) {
		$styles[] = $shadow_styles['css'];
	}
}

/**
 * Attributes
 */
$width  = ! empty( $attributes['width'] )
	? esc_attr( safecss_filter_attr( 'width:' . $attributes['width'] ) ) . ';'
	: '';
$height = ! empty( $attributes['height'] )
	? esc_attr( safecss_filter_attr( 'height:' . $attributes['height'] ) ) . ';'
	: '';

if ( ! $height && ! $width && ! $aspect_ratio ) {
	$wrapper_attributes = get_block_wrapper_attributes();
} else {
	$wrapper_attributes = get_block_wrapper_attributes( array( 'style' => $width . $height ) );
}

$output = sprintf(
	'<figure %1$s><img src="%2$s" alt="%3$s" title="%4$s" style="%5$s" /></figure>',
	// phpcs:ignore
	$wrapper_attributes,
	esc_attr( $image['src'] ),
	$image['alt'] ? esc_attr( $image['alt'] ) : '',
	$image['title'] ? esc_attr( $image['title'] ) : '',
	safecss_filter_attr( implode( ' ', $styles ) )
);

if ( isset( $attributes['isLink'] ) && $attributes['isLink'] && $url ) {
	$output = sprintf( '<a href="%1s" target="_blank" %2$s>%3$s</a>', $url ? esc_url( $url ) : '', $height, $output );
}

echo wp_kses_post( $output );
