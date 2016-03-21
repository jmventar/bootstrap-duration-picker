# bootstrap-duration-picker

Javascript library for selecting duration. It's a fork from https://github.com/koss-lebedev/bootstrap-duration-picker updated to use Bootstrap and includes moment.js to manage all dates. Target input to which plugin is applied should contain duration in seconds.

This plugin works with miliseconds and relies on moment.js for i18n using it's humanize() function.
Also added max and min values for the picker.

## Example

![Bootstrap-Duration-Picker](demo.png)

##Dependencies

- jQuery 1.*
- Bootstrap 3.* (used for popovers)
- moment.js 2.11 http://momentjs.com/

## Usage

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>

<link rel="stylesheet" href="../src/jquery-duration-picker.css">
<script src="../src/jquery-duration-picker.js"></script>
```

```js
$('.duration-picker').durationPicker();

// or

$('.duration-picker').durationPicker({
    lang: 'en',
    formatter: some_function // a function that gets numbers displayed in input and returns a formatted one,
    showSeconds: false // defines whether to show seconds or not 
});
```