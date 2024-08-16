/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import {
	useSettings,
} from '@wordpress/block-editor';

const SCALE_OPTIONS = (
	<>
		<ToggleGroupControlOption
			value="cover"
			label={ _x( 'Cover', 'Scale option for Image dimension control' ) }
		/>
		<ToggleGroupControlOption
			value="contain"
			label={ _x(
				'Contain',
				'Scale option for Image dimension control'
			) }
		/>
		<ToggleGroupControlOption
			value="fill"
			label={ _x( 'Fill', 'Scale option for Image dimension control' ) }
		/>
	</>
);

const DEFAULT_SCALE = 'cover';

const scaleHelp = {
	cover: __(
		'Image is scaled and cropped to fill the entire space without being distorted.'
	),
	contain: __(
		'Image is scaled to fill the space without clipping nor distorting.'
	),
	fill: __(
		'Image will be stretched and distorted to completely fill the space.'
	),
};

const DimensionControls = ( {
	clientId,
	attributes: { width, height, scale },
	setAttributes,
	media,
} ) => {
	const [ availableUnits ] =
		useSettings(
			'spacing.units'
		);
	const units = useCustomUnits( {
		availableUnits: availableUnits || [ 'px', '%', 'vw', 'em', 'rem' ],
	} );

	const onDimensionChange = ( dimension, nextValue ) => {
		const parsedValue = parseFloat( nextValue );
		/**
		 * If we have no value set and we change the unit,
		 * we don't want to set the attribute, as it would
		 * end up having the unit as value without any number.
		 */
		if ( isNaN( parsedValue ) && nextValue ) {
			return;
		}
		setAttributes( {
			[ dimension ]: parsedValue < 0 ? '0' : nextValue,
		} );
	};
	const scaleLabel = _x( 'Scale', 'Image scaling options' );

	const showScaleControl =
		height || 'auto';

	return (
		<>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! height }
				label={ __( 'Height' ) }
				onDeselect={ () => setAttributes( { height: undefined } ) }
				resetAllFilter={ () => ( {
					height: undefined,
				} ) }
				isShownByDefault
				panelId={ clientId }
			>
				<UnitControl
					label={ __( 'Height' ) }
					labelPosition="top"
					value={ height || '' }
					min={ 0 }
					onChange={ ( nextHeight ) =>
						onDimensionChange( 'height', nextHeight )
					}
					units={ units }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! width }
				label={ __( 'Width' ) }
				onDeselect={ () => setAttributes( { width: undefined } ) }
				resetAllFilter={ () => ( {
					width: undefined,
				} ) }
				isShownByDefault
				panelId={ clientId }
			>
				<UnitControl
					label={ __( 'Width' ) }
					labelPosition="top"
					value={ width || '' }
					min={ 0 }
					onChange={ ( nextWidth ) =>
						onDimensionChange( 'width', nextWidth )
					}
					units={ units }
				/>
			</ToolsPanelItem>
			{ showScaleControl && (
				<ToolsPanelItem
					hasValue={ () => !! scale && scale !== DEFAULT_SCALE }
					label={ scaleLabel }
					onDeselect={ () =>
						setAttributes( {
							scale: DEFAULT_SCALE,
						} )
					}
					resetAllFilter={ () => ( {
						scale: DEFAULT_SCALE,
					} ) }
					isShownByDefault
					panelId={ clientId }
				>
					<ToggleGroupControl
						__nextHasNoMarginBottom
						label={ scaleLabel }
						value={ scale }
						help={ scaleHelp[ scale ] }
						onChange={ ( value ) =>
							setAttributes( {
								scale: value,
							} )
						}
						isBlock
					>
						{ SCALE_OPTIONS }
					</ToggleGroupControl>
				</ToolsPanelItem>
			) }
		</>
	);
};

export default DimensionControls;