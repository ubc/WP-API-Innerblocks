# Resource Datetime Block

- This block functions very similar to the [Post Date block](https://wordpress.org/documentation/article/post-date-block/ "Post Date block") from WordPress core.
- This block accept type array from context, so that user can choose one of the provided datetime to display.
- Datetime string provided must in UTC.
- Must be child block of the resource template block.

## Context

### PHP
```php
'images' => array(
	array(
		'label' => 'image_label1',
		'title' => 'image_title1',
		'alt' => 'image_alt1',
		'src' => 'https://imagesource1.test/',
		'link' => 'https://google.ca',
	),
	array(
		'label' => 'image_label2',
		'title' => 'image_title2',
		'alt' => 'image_alt2',
		'src' => 'https://imagesource2.test/',
		'link' => 'https://google.ca',
	),
),
```