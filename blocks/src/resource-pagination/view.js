/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

store( "ubc-wp-api-innerblocks", {
    actions: {
      *navigate(e) {
        e.preventDefault();

        const url = e.target.href;

        const { actions } = yield import(
            '@wordpress/interactivity-router'
        );

        yield actions.navigate( url );
      },
    },
} );