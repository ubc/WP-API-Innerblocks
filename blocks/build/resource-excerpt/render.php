<?php
/**
 * Render Event Title Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context['excerpt'] ) ) {
	return '';
}

$excerpt = wp_specialchars_decode( $block->context['excerpt'] );
$url     = isset( $block->context['link'] ) ? $block->context['link'] : '';

/*
* The purpose of the excerpt length setting is to limit the length of both
* automatically generated and user-created excerpts.
* Because the excerpt_length filter only applies to auto generated excerpts,
* wp_trim_words is used instead.
*/
$more_text = ! empty( $attributes['moreText'] ) ? '<a class="wp-block-post-excerpt__more-link" href="' . esc_url( $url ) . '" target="_blank">' . wp_kses_post( $attributes['moreText'] ) . '</a>' : '';

$excerpt_length = $attributes['excerptLength'];
if ( isset( $excerpt_length ) ) {
	$excerpt = wp_trim_words( $excerpt, $excerpt_length );
}
$filter_excerpt_more = static function ( $more ) use ( $more_text ) {
	return empty( $more_text ) ? $more : '';
};

/**
 * Some themes might use `excerpt_more` filter to handle the
 * `more` link displayed after a trimmed excerpt. Since the
 * block has a `more text` attribute we have to check and
 * override if needed the return value from this filter.
 * So if the block's attribute is not empty override the
 * `excerpt_more` filter and return nothing. This will
 * result in showing only one `read more` link at a time.
 */
add_filter( 'excerpt_more', $filter_excerpt_more );

$classes = array();

if ( isset( $attributes['textAlign'] ) ) {
	$classes[] = 'has-text-align-' . $attributes['textAlign'];
}
if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
	$classes[] = 'has-link-color';
}
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

$content               = '<p class="wp-block-post-excerpt__excerpt">' . $excerpt;
$show_more_on_new_line = ! isset( $attributes['showMoreOnNewLine'] ) || $attributes['showMoreOnNewLine'];

if ( $show_more_on_new_line && ! empty( $more_text ) ) {
	$content .= '</p><p class="wp-block-post-excerpt__more-text">' . $more_text . '</p>';
} else {
	$content .= " $more_text</p>";
}

remove_filter( 'excerpt_more', $filter_excerpt_more );

// phpcs:ignore
printf( '<div %1$s>%2$s</div>', $wrapper_attributes, wp_kses_post( $content ) );