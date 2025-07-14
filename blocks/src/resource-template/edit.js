/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
	__experimentalUseBlockPreview as useBlockPreview,
	BlockContextProvider,
	BlockControls
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useState, memo } from "@wordpress/element";
import { useSelect } from '@wordpress/data';
import { list, grid } from '@wordpress/icons';

import clsx from 'clsx';

import './editor.scss';

const DEFAULT_TEMPLATE = [];

function ResourceTemplateBlockPreview( attrs ) {
	const {
		blocks,
		blockContextId,
		isHidden,
		setActiveResourceId,
	} = attrs;
	const blockPreviewProps = useBlockPreview( {
		blocks
	} );

	const handleOnClick = () => {
		setActiveResourceId( blockContextId );
	};

	const style = {
		display: isHidden ? 'none' : undefined,
	};

	return (
		<li
			{ ...blockPreviewProps }
			tabIndex={ 0 }
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			onClick={ handleOnClick }
			style={ style }
		/>
	);
}

const MemoizedResourceTemplateBlockPreview = memo( ResourceTemplateBlockPreview );

function ResourceTemplateInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: '' },
		{ template: DEFAULT_TEMPLATE, __unstableDisableLayoutClassNames: true }
	);
	return <li { ...innerBlocksProps } />;
}

export default function Edit( { attributes: { layout }, setAttributes, context, clientId, __unstableLayoutClassNames } ) {
	const { type: layoutType, columnCount = 3 } = layout || {};
	const blockProps = useBlockProps( {
		className: clsx( __unstableLayoutClassNames, {
			[ `columns-${ columnCount }` ]:
				layoutType === 'grid' && columnCount, // Ensure column count is flagged via classname for backwards compatibility.
		}, 'ubc-api-template' ),
	} );

	const [ activeResourceId, setActiveResourceId ] = useState();
	const { resources } = context;

	const { blocks } = useSelect(
		( select ) => {
			const { getBlocks } = select( blockEditorStore );
			return {
				blocks: getBlocks( clientId ),
			};
		},
	)

	const setDisplayLayout = ( newDisplayLayout ) => {
		setAttributes( {
			layout: { ...layout, ...newDisplayLayout },
		} );
	};

	const displayLayoutControls = [
		{
			icon: list,
			title: _x( 'List view', 'Resource template block display setting' ),
			onClick: () => setDisplayLayout( { type: 'default' } ),
			isActive: layoutType === 'default' || layoutType === 'constrained',
		},
		{
			icon: grid,
			title: _x( 'Grid view', 'Resource template block display setting' ),
			onClick: () =>
				setDisplayLayout( {
					type: 'grid',
					columnCount,
				} ),
			isActive: layoutType === 'grid',
		},
	];

	return  (
		<>
			<BlockControls>
				<ToolbarGroup controls={ displayLayoutControls } />
			</BlockControls>
			<ul { ...blockProps }>
				{ resources &&
					resources.map( ( resource, index ) => (
						<BlockContextProvider
							value={ resource }
							key={ index }
						>
							{ index === ( activeResourceId || 0 ) ? (
							<ResourceTemplateInnerBlocks />
							) : null }
							<MemoizedResourceTemplateBlockPreview
								blocks={ blocks }
								blockContextId={ index }
								setActiveResourceId={
									setActiveResourceId
								}
								isHidden={
									index ===
									( activeResourceId ||
										0 )
								}
							/>
						</BlockContextProvider>
					) ) }
			</ul>
		</>
	);
}
