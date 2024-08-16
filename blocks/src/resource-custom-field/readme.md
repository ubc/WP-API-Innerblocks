# Resource Custom Field Block

- This block renders a custom field from the resource. Accept type array from context, so that user can choose one of the provided custom field to display.
- Must be child block of the resource template block.
- Content escaped with [wp_kses_post()](https://developer.wordpress.org/reference/functions/wp_kses_post/ "wp_kses_post()")

## Context

### PHP
```php
'custom' => array(
	array(
		'label' => 'cf_1_label',
		'value' => 'cf_1_value',
	),
	array(
		'label' => 'cf_2_label',
		'value' => 'cf_2_value',
	)
),
'link'      => 'https://test.com' // Optional
```

### JavaScript
```javascript
custom: [
	 {
		 label: 'cf_1_label',
		 value: 'cf_1_value',
	 },
	 {
		 label: 'cf_2_label',
		 value: 'cf_2_value'
	 }
 ],
 link: 'https://test.com' // Optional
```