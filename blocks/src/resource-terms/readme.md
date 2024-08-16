# Resource Terms Block

- This block renders taxonomy terms from the resource. Accept type array from context, so that user can choose one of the provided taxonomy to display.
- Must be child block of the resource template block.

## Context

### PHP
```php
'terms' => array(
	array(
		'taxonomy' => 'post_tag',
		'terms' => array(
			array(
				'id' => 1,
				'name' => 'Tag 1',
				'link'.   => 'https://test.com'
			),
			array(
				'id' => 2,
				'name' => 'Tag 2',
				'link'.   => 'https://test.com'
			)
		)
	),
	array(
		'taxonomy' => 'category',
		'terms' => array(
			array(
				'id' => 1,
				'name' => 'category 1',
				'link'.   => 'https://test.com'
			),
			array(
				'id' => 2,
				'name' => 'category 2',
				'link'.   => 'https://test.com'
			)
		),
	)
)
```

### JavaScript
```javascript
terms: [
	 {
		 taxonomy: 'post_tag',
		 terms: [
		 	{
				id: 1,
				name: 'Tag 1',
				link: 'https://test.com'
			}
			{
				id: 2,
				name: 'Tag 2',
				link: 'https://test.com'
			}
		 ],
	 },
	 {
		 taxonomy: 'category',
		 terms:[
		 	{
				id: 1,
				name: 'category 1',
				link: 'https://test.com'
			}
			{
				id: 2,
				name: 'category 2',
				link: 'https://test.com'
			}
		 ],
	 }
 ]
```
