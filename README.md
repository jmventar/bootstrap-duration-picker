# bootstrap-duration-picker

Javascript library for selecting duration. It's a fork from https://github.com/koss-lebedev/bootstrap-duration-picker updated to use Bootstrap and includes moment.js to manage all dates. Target input to which plugin is applied should contain duration in milliseconds (ms).

Added maximum range and some other options.

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
    lang: 'en', // ISO code of the language, default is EN.
    showDays: true, // defines whether to show days or not. Default is true
    showSeconds: false // defines whether to show seconds or not. Default is false
    checkRanges: false, // defines a maximum range that will accept the picker. If the value is larger applies that maximum range. Default is false
	totalMax: 31556952000, // Only applies if checkRanges is true. Default maximum range is 1 year in ms. 
            
             
});
```