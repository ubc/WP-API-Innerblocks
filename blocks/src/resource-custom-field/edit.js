/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody, SelectControl } from '@wordpress/components';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

import { BlockNotSupportMessage } from '../components';
import clsx from 'clsx';
import { unescape } from 'lodash';

import './editor.scss';

export default function Edit( { attributes: { textAlign, isLink, selectedCFLabel }, setAttributes, context, name } ) {
	const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const blockContext = context[ name ];

	if ( ! blockContext.custom ) {
		return <BlockNotSupportMessage>
			Block not supported, missing context "custom".
		</BlockNotSupportMessage>;
	}

	const { custom } = blockContext;

	if ( ! selectedCFLabel ||selectedCFLabel === '' ) {
		setAttributes( { selectedCFLabel: custom[0].label } );
	}

	// Get custom field value based on currently selected custom field label.
	let customField = custom.filter( ( cf ) => {
		return cf.label === selectedCFLabel;
	});

	if ( customField.length === 0 ) {
		return <BlockNotSupportMessage>
			Block error, please recreated the block.
		</BlockNotSupportMessage>;
	}

	customField = customField[0];
	//

	const renderCustomField = () => {
		return isLink ? <a href="#"><p { ...blockProps }><RawHTML>{ unescape( customField.value.toString() ) }</RawHTML></p></a> : <p { ...blockProps }><RawHTML>{ unescape( customField.value.toString() ) }</RawHTML></p>
	}

	return (
		<>
			{ renderCustomField() }
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
			/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label="Custom Field"
						value={ selectedCFLabel }
						options={ custom.map( ( cf ) => {
							return { label: cf.label, value: cf.label };
						} ) }
						onChange={ ( newCF ) => {
							setAttributes( { selectedCFLabel: newCF } );
						} }
						__nextHasNoMarginBottom
					/>
					{ customField.link ? <ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Make element a link' ) }
						onChange={ () =>
							setAttributes( { isLink: ! isLink } )
						}
						checked={ isLink }
					/> : null }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
