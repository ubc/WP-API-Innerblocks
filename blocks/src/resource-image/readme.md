# Resource Datetime Block

- This block functions very similar to the [Post Date block](https://wordpress.org/documentation/article/post-date-block/ "Post Date block") from WordPress core.
- This block accept type array from context, so that user can choose one of the provided datetime to display.
- Datetime string provided must in UTC.
- Must be child block of the resource template block.

## Context

### PHP
```php
'datetimes' => array(
	array(
		'label' => 'datetime_1_label',
		'value' => '2024-07-02T08:37:48',
	),
	array(
		'label' => 'datetime_2_label',
		'value' => '2024-06-02T08:37:48',
	)
),
'link'      => 'https://test.com' // Optional
```

### JavaScript
```javascript
datetimes: [
	 {
		 label: 'datetime_1_label',
		 value: '2024-07-02T08:37:48'
	 },
	 {
		 label: 'datetime_2_label',
		 value: '2024-06-02T08:37:48'
	 }
 ],
 link: 'https://test.com' // Optional
```
