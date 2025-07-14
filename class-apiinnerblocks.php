<?php
/**
 * Plugin Name:       UBC WP API Inner Blocks
 * Description:       Provide inner blocks that consumes data from external API.
 * Requires at least: 6.5
 * Requires PHP:      8.2
 * Version:           2.0.0
 * Author:            Kelvin Xu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ubc-wp-api-innerblocks
 *
 * @package           ubc-wp-api-innerblocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( defined( 'UBC_WP_API_INNER_BLOCKS_PLUGIN_URL' ) ) {
	wp_die( 'UBC WP API Inner Blocks is already activated. The new version is not compatible with the plugins that requires the older version of the UBC WP API InnerBlocks plugin.' );
}


define( 'UBC_WP_API_INNER_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'UBC_WP_API_INNER_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * API Inner Blocks
 */
class APIInnerBlocks {

	/**
	 * Blocks
	 *
	 * @var array
	 */
	private static $blocks = array(
		'resource-template'     => array(
			'name'   => 'ubc/api-template',
			'blocks' => array(),
		),
		'resource-pagination'   => array(
			'name'   => 'ubc/api-pagination',
			'blocks' => array(),
		),
		'resource-no-results'   => array(
			'name'   => 'ubc/api-no-results',
			'blocks' => array(),
		),
		'resource-title'        => array(
			'name'   => 'ubc/api-title',
			'blocks' => array(),
		),
		'resource-content'      => array(
			'name'   => 'ubc/api-content',
			'blocks' => array(),
		),
		'resource-excerpt'      => array(
			'name'   => 'ubc/api-excerpt',
			'blocks' => array(),
		),
		'resource-terms'        => array(
			'name'   => 'ubc/api-terms',
			'blocks' => array(),
		),
		'resource-datetime'     => array(
			'name'   => 'ubc/api-datetime',
			'blocks' => array(),
		),
		'resource-custom-field' => array(
			'name'   => 'ubc/api-custom-field',
			'blocks' => array(),
		),
		'resource-image'        => array(
			'name'   => 'ubc/api-image',
			'blocks' => array(),
		),
	);

	/**
	 * Initialize hooks
	 */
	public static function init() {
		self::setup_hooks();
		self::register_core_blocks();
	}

	/**
	 * Setup hooks
	 */
	public static function setup_hooks() {
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_registration_scripts' ) );
	}

	/**
	 * Enqueue block registration scripts
	 */
	public static function enqueue_block_registration_scripts() {
		wp_enqueue_script(
			'ubc_wp_api_inner_blocks_script',
			UBC_WP_API_INNER_BLOCKS_PLUGIN_URL . 'blocks/build/register-block.js',
			array( 'wp-hooks', 'wp-blocks' ),
			filemtime( UBC_WP_API_INNER_BLOCKS_PLUGIN_DIR . 'blocks/build/register-block.js' ),
			true
		);

		wp_localize_script(
			'ubc_wp_api_inner_blocks_script',
			'ubc_wp_api_inner_blocks',
			array(
				'blocks' => self::$blocks,
			)
		);
	}

	/**
	 * Register core blocks
	 */
	public static function register_core_blocks() {
		foreach ( self::$blocks as $block_path => $duplicate_blocks ) {
			register_block_type( UBC_WP_API_INNER_BLOCKS_PLUGIN_DIR . 'blocks/build/' . $block_path, array() );
		}
	}

	/**
	 * Register block
	 *
	 * @param string $block_folder_name Block folder name.
	 * @param string $new_block_name New block name.
	 * @param array  $args Block arguments.
	 */
	public static function register_block( $block_folder_name, $new_block_name, $args = array() ) {
		register_block_type(
			UBC_WP_API_INNER_BLOCKS_PLUGIN_DIR . 'blocks/build/' . $block_folder_name,
			array_merge(
				$args,
				array(
					'name' => $new_block_name,
				)
			)
		);

		self::$blocks[ $block_folder_name ]['blocks'][] = $new_block_name;
	}
}

/* ----------------------------------------------------------------------------- */

APIInnerBlocks::init();
