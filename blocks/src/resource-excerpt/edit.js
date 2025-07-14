/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { ToggleControl, RangeControl, PanelBody } from '@wordpress/components';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls
} from '@wordpress/block-editor';

import { unescape } from 'lodash';
import clsx from 'clsx';

import './editor.scss';

const ELLIPSIS = '…';

export default function Edit( { attributes, setAttributes, context, name } ) {
	const blockContext = context[ name ];

	const { textAlign, moreText, showMoreOnNewLine, excerptLength } = attributes;
	const { excerpt = '', link } = blockContext;

	const blockProps = useBlockProps( {
		className: clsx(
			`has-text-align-${ textAlign } wp-block-post-excerpt` ,
		),
	} );

	const excerptClassName = clsx( 'wp-block-post-excerpt__excerpt', {
		'is-inline': ! showMoreOnNewLine,
	} );

	/**
	 * translators: If your word count is based on single characters (e.g. East Asian characters),
	 * enter 'characters_excluding_spaces' or 'characters_including_spaces'. Otherwise, enter 'words'.
	 * Do not translate into your own language.
	 */
	const wordCountType = _x( 'words', 'Word count type. Do not translate!' );

	/**
	 * When excerpt is editable, strip the html tags from
	 * rendered excerpt. This will be used if the entity's
	 * excerpt has been produced from the content.
	 */
	const strippedRenderedExcerpt = useMemo( () => {
		const document = new window.DOMParser().parseFromString(
			unescape( excerpt ),
			'text/html'
		);
		return document.body.textContent || document.body.innerText || '';
	}, [ excerpt ] );

	const readMoreLink = (
		<RichText
			identifier="moreText"
			className="wp-block-post-excerpt__more-link"
			tagName="a"
			aria-label={ __( '“Read more” link text' ) }
			placeholder={ __( 'Add "read more" link text' ) }
			value={ moreText }
			onChange={ ( newMoreText ) =>
				setAttributes( { moreText: newMoreText } )
			}
			withoutInteractiveFormatting
		/>
	);

	let trimmedExcerpt = '';
	if ( wordCountType === 'words' ) {
		trimmedExcerpt = strippedRenderedExcerpt
			.split( ' ', excerptLength )
			.join( ' ' );
	} else if ( wordCountType === 'characters_excluding_spaces' ) {
		/*
		 * 1. Split the excerpt at the character limit,
		 * then join the substrings back into one string.
		 * 2. Count the number of spaces in the excerpt
		 * by comparing the lengths of the string with and without spaces.
		 * 3. Add the number to the length of the visible excerpt,
		 * so that the spaces are excluded from the word count.
		 */
		const excerptWithSpaces = strippedRenderedExcerpt
			.split( '', excerptLength )
			.join( '' );

		const numberOfSpaces =
			excerptWithSpaces.length -
			excerptWithSpaces.replaceAll( ' ', '' ).length;

		trimmedExcerpt = strippedRenderedExcerpt
			.split( '', excerptLength + numberOfSpaces )
			.join( '' );
	} else if ( wordCountType === 'characters_including_spaces' ) {
		trimmedExcerpt = strippedRenderedExcerpt
			.split( '', excerptLength )
			.join( '' );
	}

	const isTrimmed = trimmedExcerpt !== strippedRenderedExcerpt;

	const excerptContent = (
		<p className={ excerptClassName }>
			{ ! isTrimmed
				? strippedRenderedExcerpt || __( 'No excerpt found' )
				: trimmedExcerpt + ELLIPSIS }
		</p>
	);

	const renderExcerpt = () => {
		return <div { ...blockProps }>
			{ excerptContent }
			{ ! showMoreOnNewLine && ' ' }
			{ showMoreOnNewLine ? (
				<p className="wp-block-post-excerpt__more-text">
					{ readMoreLink }
				</p>
			) : (
				readMoreLink
			) }
		</div>
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( newAlign ) =>
						setAttributes( { textAlign: newAlign } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					{ link ? <ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show link on new line' ) }
						checked={ showMoreOnNewLine }
						onChange={ ( newShowMoreOnNewLine ) =>
							setAttributes( {
								showMoreOnNewLine: newShowMoreOnNewLine,
							} )
						}
					/> : null }
					<RangeControl
						label={ __( 'Max number of words' ) }
						value={ excerptLength }
						onChange={ ( value ) => {
							setAttributes( { excerptLength: value } );
						} }
						min="10"
						max="100"
					/>
				</PanelBody>
			</InspectorControls>
			{ renderExcerpt() }
		</>
	);
}
