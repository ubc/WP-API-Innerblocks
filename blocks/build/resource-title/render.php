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


if ( ! isset( $block_context['title'] ) ) {
	return '';
}

$title = wp_specialchars_decode( $block_context['title'] );
$url   = isset( $block_context['link'] ) ? $block_context['link'] : '';

$tag_name = 'h2';
if ( isset( $attributes['level'] ) ) {
	$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . (int) $attributes['level'];
}

if ( isset( $attributes['isLink'] ) && $attributes['isLink'] && ! empty( $url ) ) {
	$rel           = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
	$title_content = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', esc_url( $url ), esc_attr( $attributes['linkTarget'] ), $rel, $title );
} else {
	$title_content = $title;
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
	'<%1$s %2$s>%3$s</%1$s>',
	tag_escape( $tag_name ),
	// phpcs:ignore
	$wrapper_attributes,
	wp_kses_post( $title_content )
);
