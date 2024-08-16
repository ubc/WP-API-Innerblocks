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

export default function Edit( { attributes: { level, textAlign, isLink, rel, linkTarget }, setAttributes, context } ) {
	const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const name = context.name ? context.name : '';

	const renderTitle = () => {
		const TagName = level === 0 ? 'p' : `h${ level }`;
		return isLink ? <a href="#"><TagName { ...blockProps }>{ unescape( name ) }</TagName></a> : <TagName { ...blockProps }>{ unescape( name ) }</TagName>
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
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Make title a link' ) }
						onChange={ () =>
							setAttributes( { isLink: ! isLink } )
						}
						checked={ isLink }
					/>
					{ isLink && (
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
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}
