/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody, SelectControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { getSettings as getDateSettings } from '@wordpress/date';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	__experimentalDateFormatPicker as DateFormatPicker,
} from '@wordpress/block-editor';

import { BlockNotSupportMessage, getDateFromGmt } from '../components';
import clsx from 'clsx';

import './editor.scss';

export default function Edit( { attributes: { dateType, textAlign, format, isLink }, setAttributes, context, name } ) {
	const blockContext = context[ name ];

		const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign
		} ),
	} );

	const dateSettings = getDateSettings();

	const [ siteFormat = dateSettings.formats.date ] = useEntityProp(
		'root',
		'site',
		'date_format'
	);

	if ( ! blockContext.datetimes || blockContext.datetimes.length === 0 ) {
		return <BlockNotSupportMessage>
			Block not supported, missing context "datetimes".
		</BlockNotSupportMessage>;
	}

	const { datetimes } = blockContext;

	if ( ! dateType || dateType === '' ) {
		setAttributes( { dateType: datetimes[0].label } );
	}

	// Get datetime string based on currently selected dateType.
	let datetime = datetimes.filter( ( dt ) => {
		return dt.label === dateType;
	});

	if ( datetime.length === 0 ) {
		return <BlockNotSupportMessage>
			Block error, please recreated the block.
		</BlockNotSupportMessage>;
	}

	datetime = datetime[0];
	//

	let postDate = (
		<time dateTime={ getDateFromGmt( datetime.value, format ? format : siteFormat ) }>
			{ getDateFromGmt( datetime.value, format ? format : siteFormat ) }
		</time>
	);

	if ( isLink && datetime.link ) {
		postDate = (
			<a
				href="#"
				onClick={ ( event ) => event.preventDefault() }
			>
				{ postDate }
			</a>
		);
	}

	return (
		<>
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
						label="Date Type"
						value={ dateType }
						options={ blockContext.datetimes.map( ( dt ) => {
							return { label: dt.label, value: dt.label };
						} ) }
						onChange={ ( newDateType ) => {
							setAttributes( { dateType: newDateType } );
						} }
						__nextHasNoMarginBottom
					/>
					<DateFormatPicker
						format={ format }
						defaultFormat={ siteFormat }
						onChange={ ( nextFormat ) =>
							setAttributes( { format: nextFormat } )
						}
					/>
					{ datetime.link ? <ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Link to resource' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/> : null }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>{ postDate }</div>
		</>
	);
}