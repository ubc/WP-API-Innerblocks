/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __(
				'Add text or blocks that will display when a request returns no results.'
			),
		},
	],
];

export default function ResourceNoResultsEdit( { context } ) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	const { resources } = context;

	return <div { ...innerBlocksProps } />;
}