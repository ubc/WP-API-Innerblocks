/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';

import { unescape } from 'lodash';
import clsx from 'clsx';

import './editor.scss';

export default function Edit( { name, attributes: { level, textAlign, isLink, rel, linkTarget }, setAttributes, context } ) {
	const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const blockContext = context[ name ];
	const { title = '', link } = blockContext;

	const renderTitle = () => {
		const TagName = level === 0 ? 'p' : `h${ level }`;
		return isLink && link ? <a href="#"><TagName { ...blockProps }>{ unescape( title ) }</TagName></a> : <TagName { ...blockProps }>{ unescape( title ) }</TagName>
	}

	return (
		<>
			{ renderTitle() }
			<BlockControls group="block">
				<HeadingLevelDropdown
					value={ level }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
			/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					{ link ? <ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Make title a link' ) }
						onChange={ () =>
							setAttributes( { isLink: ! isLink } )
						}
						checked={ isLink }
					/> : null }
					{ isLink && link ? (
						<>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Open in new tab' ) }
								onChange={ ( value ) =>
									setAttributes( {
										linkTarget: value
											? '_blank'
											: '_self',
									} )
								}
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								__nextHasNoMarginBottom
								label={ __( 'Link rel' ) }
								value={ rel }
								onChange={ ( newRel ) =>
									setAttributes( { rel: newRel } )
								}
							/>
						</>
					) : null }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
