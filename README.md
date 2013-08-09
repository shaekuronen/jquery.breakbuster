# Breakbuster

Prevent Linebreaks on Hyphens and Dashes

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/shaekuronen/jquery-break-buster/master/dist/breakbuster.min.js
[max]: https://raw.github.com/shaekuronen/jquery-break-buster/master/dist/breakbuster.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/breakbuster.min.js"></script>
<script>
jQuery(function($) {
  // get the elements you want to prevent linebreaks in
  $('h1, h2, h3, h4, h5, h6, p').breakbuster({
    // defaults to hyphen, en dash, em dash but can override and prevent break on any character
    characters: ['-', '–']
  });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
