# Resource Pagination Block

- This block renders paginatioon links.
- Pagination is implement using WP Interactivity API. Very similar to WordPress Core Enhanced Pagination.
- Must be a direct child block of the Main block(eg, CTLT Events Block).

## Context

### PHP
Require both instance_id and total_pages from the main block. Refer to CTLT Events Block as an example.

**instance_id** - a unique ID for each block instance that renders on the screen. Saved as block attribute. Refer to documentation at https://github.com/WordPress/gutenberg/blob/trunk/packages/compose/src/hooks/use-instance-id/README.md

**total_pages** - The number of total pages received from API response.

### JavaScript
Context is not needed on JavaScript side since in the editor, we only render a fake pagination.
