# Style Form Attachments

The `form-attachments.js` is a module that will handle the creation, function, and validation for the file attachments. The unique beauty of this module will enable you to easily customize the `input[type='file']` from the standerd ugly style.

![File Attachments image][data/fileAttachments.png]

## Getting Started

Getting started is super easy. All you need to do is add the following `div` wherever you want in your form:

```html
<div class="file-attachment"></div>
```

Then add the following javascript source and code:

```javascript
<script src="/library/scripts/form-attachments.js"></script>
<script>
  var form_options = new Form_Options();
  form_options.Initialize({
    file_attachment_section: '.file-attachment'
  });
</script>
```
By default one input file will be added to the `.file-attachment` div tag. That is all you need to get started! It really is that simple.

## Add Multiple Attachments

There are times where you want the user to be able to attach multiple attachments. There are two ways of accomplshing this and you can decide which one is oppropiate for you. You might even want to use both.

The first and easy way is to add the `multiple` option. This will enable the user to select multiple attachments with just a single file input.

```javascript
multiple_attachments: true
```

The second method and probably the more practical option is to add a data set to the `.file-attachment` element which then will add x number of input files to that div. This is best if you are wanted to limit the number of attachments that can be uploaded.

```html
<div class="file-attachment" data-attachment-max="3"></div>
```

Additionally if you need to add the file attachments in more than one places in your form you can add the `<div class="file-attachment"></div>` wherever you need as many times as you want.

## Validating Attachment Extensions

Validation is important especially when you want users only uploading certian attachment types. The validation built into `form-attachment.js` will validate the attachment immediatly upon selecting. Add the following option:

```javascript
file_extensions_allowed: 'png|jpg|jpeg'
```

In this example we are expecting the user to only input attachments whose extensions are png, jpg, or jpeg.

**Note:** It is important to add the `|` in between each of the extension rather than a space or comma.

By default the error message will appear as an alert. If you want to place the error message inside an element you can do so by adding the following option:

```javascript
error_message_display: 'replace-label'
```
