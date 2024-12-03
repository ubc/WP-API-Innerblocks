<?php
/**
 * Render Event Title Block on the serverside.
 *
 * @package ubc-wp-api-inner-blocks
 */

namespace UBC\CTLT\Block\APIInnerBlocks;

if ( ! isset( $block->context['instance_id'] ) || ! isset( $block->context['total_pages'] ) ) {
	return '';
}

$instance_id  = (int) $block->context['instance_id'];
$total_pages  = (int) $block->context['total_pages'];
$current_page = isset( $_GET[ $instance_id . '-paged' ] ) ? (int) $_GET[ $instance_id . '-paged' ] : 1;

$big = 999999999;

$pagination_links = paginate_links(
	array(
		'base'    => add_query_arg( $instance_id . '-paged', '%#%' ),
		'format'  => '?' . $instance_id . '-paged=%#%',
		'current' => $current_page,
		'total'   => $total_pages,
		'type'    => 'list',
	)
);

if ( null === $pagination_links ) {
	return;
}

$p = new \WP_HTML_Tag_Processor( $pagination_links );
$p->set_bookmark( 'start' );

while ( $p->next_tag(
	array(
		'class_name' => 'page-numbers',
		'tag_name'   => 'ul',
	)
) ) {
	$p->add_class( 'ubc-api__pagination' );
}

$p->seek( 'start' ); // To search tags from the beginning.

while ( $p->next_tag(
	array(
		'tag_name' => 'li',
	)
) ) {
	$p->add_class( 'ubc-api__pagination__buttons' );
}

$p->seek( 'start' ); // To search tags from the beginning.

while ( $p->next_tag(
	array(
		'tag_name' => 'A',
	)
) ) {
	$p->set_attribute( 'data-wp-on--click', 'ubc-wp-api-innerblocks::actions.navigate' );
}

$p->seek( 'start' ); // To search tags from the beginning.

$pagination_links = $p->get_updated_html();

// phpcs:ignore
echo $pagination_links;
