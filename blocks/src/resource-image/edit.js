/**
 * External dependencies
 */
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody, SelectControl } from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles,
	useBlockEditingMode
} from '@wordpress/block-editor';

import { BlockNotSupportMessage } from '../components';
import DimensionControls from './dimension-controls';

import './editor.scss';

export default function Edit( { clientId, attributes, setAttributes, context } ) {

	if ( ! context.images || context.images.length === 0 ) {
		return <BlockNotSupportMessage>
			Block not supported, missing context "images".
		</BlockNotSupportMessage>;
	}

	const { images } = context;

	const {
		imageSource,
		isLink,
		height,
		width,
		scale
	} = attributes;

	if ( ! imageSource || imageSource === '' ) {
		setAttributes( { imageSource: images[0].label } );
	}

	// Get datetime string based on currently selected imageSource.
	let image = images.filter( ( img ) => {
		return img.label === imageSource;
	});

	if ( image.length === 0 ) {
		return <BlockNotSupportMessage>
			Block error, please recreated the block.
		</BlockNotSupportMessage>;
	}

	image = image[0];
	//

	const borderProps = useBorderProps( attributes );
	const shadowProps = getShadowClassesAndStyles( attributes );
	
	const blockProps = useBlockProps( {
		style: { width, height },
	} );
	const blockEditingMode = useBlockEditingMode();

	const imageStyles = {
		...borderProps.style,
		...shadowProps.style,
		height: height,
		width: '100%',
		objectFit: !! ( height ) && scale,
	};

	const controls = blockEditingMode === 'default' && (
		<>
			<InspectorControls group="dimensions">
				<DimensionControls
					clientId={ clientId }
					attributes={ attributes }
					setAttributes={ setAttributes }
					media={ image }
				/>
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label="Image Source"
						value={ imageSource }
						options={ context.images.map( ( img ) => {
							return { label: img.label, value: img.label };
						} ) }
						onChange={ ( newImageSource ) => {
							setAttributes( { imageSource: newImageSource } );
						} }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Link to resource' ) }
						onChange={ () => setAttributes( { isLink: ! isLink } ) }
						checked={ isLink }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);

	return (
		<>
			{ controls }
			<figure { ...blockProps }>
				{ image.src ? (
					<img
						src={ image.src }
						style={ imageStyles }
					/>
				) : (
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" preserveAspectRatio="none" class="components-placeholder__illustration" aria-hidden="true" focusable="false">
						<path vector-effect="non-scaling-stroke" d="M60 60 0 0"></path>
					</svg>
				) }
			</figure>
		</>
	);
}