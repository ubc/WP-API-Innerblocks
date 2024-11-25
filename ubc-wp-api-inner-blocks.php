<?php
/**
 * Plugin Name:       UBC WP API Inner Blocks
 * Description:       Provide inner blocks that consumes data from external API.
 * Requires at least: 6.5
 * Requires PHP:      8.2
 * Version:           1.0.2
 * Author:            Kelvin Xu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ubc-wp-api-innerblocks
 *
 * @package           ubc-wp-api-innerblocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function init() {
	$blocks = array(
		'resource-template'     => array(
			'skip_inner_blocks' => true,
		),
		'resource-pagination'   => array(),
		'resource-no-results'   => array(),
		'resource-title'        => array(),
		'resource-content'      => array(),
		'resource-excerpt'      => array(),
		'resource-terms'        => array(),
		'resource-datetime'     => array(),
		'resource-custom-field' => array(),
		'resource-image'        => array(),
	);

	foreach ( $blocks as $dir => $args ) {
		register_block_type( __DIR__ . '/blocks/build/' . $dir, $args );
	}
}

/* ----------------------------------------------------------------------------- */

add_action( 'init', __NAMESPACE__ . '\\init' );
