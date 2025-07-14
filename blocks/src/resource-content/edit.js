/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import {
	useBlockProps,
} from '@wordpress/block-editor';

import { unescape } from 'lodash';

import './editor.scss';

export default function Edit( { name, context } ) {
	const blockContext = context[ name ];
	const description = blockContext.description ? blockContext.description : '';

	const renderDescription = () => {
		return <div { ...useBlockProps() }><RawHTML>{ unescape( description ) }</RawHTML></div>
	}

	return (
		<>
			{ renderDescription() }
		</>
	);
}
