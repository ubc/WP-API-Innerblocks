# Resource Template Block

- This block controls the layout of individual resource. Works very similar as the Post Template block from WordPress Core.
- Must be a direct child block of the Main block(eg, CTLT Events Block).

## Context
The Resource Template block receives "resources" context from the main block. Which is an array of resource.

Within the Resource Template block, there is a loop mechanism that iterates over each resource in the collection and pass the single resource context down to each set of innerblocks in the loop.


### PHP
```php
resources => array(
	array(
		name:
		description:
		...
	),
	array(
		name:
		description:
		...
	),
	array(
		name:
		description:
		...
	)
)
```