/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
} from '@wordpress/block-editor';


import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			{ /** Fake pagination as we don't expect the pagination to be working in the editor on purposely. */}
			<ul className="ubc-api__pagination">
				<li className="ubc-api__pagination__buttons">Previous Page</li>
				<li><a href="">1</a></li>
				<li><a href="">2</a></li>
				<li>3</li>
				<li><a href="">4</a></li>
				<li><a href="">5</a></li>
				<li>...</li>
				<li><a href="">8</a></li>
				<li className="ubc-api__pagination__buttons">Next Page</li>
			</ul>
		</div>
	);
}
