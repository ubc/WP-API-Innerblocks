/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import { SelectControl, PanelBody, TextControl } from '@wordpress/components';

import { BlockNotSupportMessage } from '../components';
import { unescape } from 'lodash';
import './editor.scss';

export default function Edit( { attributes: { separator, taxonomy }, setAttributes, context } ) {

	if ( ! context.terms ) {
		return <BlockNotSupportMessage>
			Block not supported, missing context "terms".
		</BlockNotSupportMessage>;
	}

	if ( context.terms.length === 0 ) {
		return '';
	}

	if ( ! taxonomy || taxonomy === '' ) {
		setAttributes( { taxonomy: context.terms[0].taxonomy } );
	}

	const blockProps = useBlockProps();

	const options = context.terms.map( ( term ) => {
		return { label: term.taxonomy, value: term.taxonomy };
	} );

	const renderTerms = () => {
		let terms = context.terms.filter( ( group ) => {
			return group.taxonomy === taxonomy;
		})

		if ( terms.length === 0 ) {
			return '';
		}

		terms = terms[0];
		const termsHTML = terms.terms.map( ( term ) => {
			return `<a href="#">${ unescape( term.name ) }</a>`;
		}).join( '<span>' + separator + '</span>' );

		return <div { ...blockProps }><RawHTML>{ termsHTML }</RawHTML></div>;
	}

	return (
		<>
			{ renderTerms() }
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label="Taxonomy"
						value={ taxonomy }
						options={ options }
						onChange={ ( newTaxonomy ) => {
							setAttributes( { taxonomy: newTaxonomy } );
						} }
						__nextHasNoMarginBottom
					/>
						<TextControl
						__nextHasNoMarginBottom
						autoComplete="off"
						label={ __( 'Separator' ) }
						value={ separator || '' }
						onChange={ ( nextValue ) => {
							setAttributes( { separator: nextValue } );
						} }
						help={ __( 'Enter character(s) used to separate terms.' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
