var Form_Options = (function()
{

  // Visible Interface
  var visible = {};

  // Private Variables
  var file_attachment_section;
  var file_extensions_allowed;
  var file_attach_max;
  var multiple_attachments;
  var counter = 1;

  // Default upload icon
  var upload_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 288H384v-32h64c42.6 0 64.2-51.7 33.9-81.9l-160-160c-18.8-18.8-49.1-18.7-67.9 0l-160 160c-30.1 30.1-8.7 81.9 34 81.9h64v32H48c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48zm-400-80L288 48l160 160H336v160h-96V208H128zm400 256H48V336h144v32c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48v-32h144v128zm-40-64c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z"/></svg>';

  //****************************************
  // Initialize
  //****************************************

  visible.Initialize = function(options)
  {
    file_attachment_section = document.querySelectorAll(options.file_attachment_section) || false;
    file_extensions_allowed = options.file_extensions_allowed || false;
    multiple_attachments = options.multiple_attachments || false;
    error_text_element = document.querySelector(options.error_text_element) || false;
    required = options.required || false;

    Initiate_File_Browser_And_Button();
  }

  var Initiate_File_Browser_And_Button = function()
  {

    for(var i = 0; i < file_attachment_section.length; i++)
    {
      file_attach_max = file_attachment_section[i].dataset.attachmentMax || 1;

      // Add first file browser
      Add_File_Browser(file_attachment_section[i], file_attach_max);

      if(file_attach_max > 1)
      {
        // Create add button
        var add_button = document.createElement('button');
        add_button.type = 'button';
        add_button.innerHTML = 'Add';
        add_button.className = 'add-file-browser-button button';

        // Append child to parent
        file_attachment_section[i].parentElement.appendChild(add_button);

        // Add file button event handler
        Add_File_Button_Handler(add_button, file_attachment_section[i], file_attach_max);
      }
    }
  }

  //****************************************
  // Add file attachment button event handler
  //****************************************

  var Add_File_Button_Handler = function(add_button, file_attachment_section, max)
  {
    add_button.addEventListener('click', function()
    {
      var inputs = file_attachment_section.querySelectorAll('input');
      var count = inputs.length + 1;

      if(count <= max)
      {
        // Add file browser
        Add_File_Browser(file_attachment_section);

        // Hide add file browser button if equal max
        if(count == max)
        {
          add_button.style.display = 'none';
        }
      }
    })
  }

  //****************************************
  // Append file attachment to div
  //****************************************

  var Add_File_Browser = function(file_attachment_section)
  {
    // Create file browser name
    var file_browser_name = "xFILE_UPLOAD_" + counter + '[]';

    // Create file browser input
    var file_browser = document.createElement('input');
    file_browser.type = "file";
    file_browser.name = file_browser_name;
    file_browser.id = file_browser_name;
    file_browser.dataset.multipleCaption = "{count} files selected";
    file_browser.multiple = (multiple_attachments) ? true : false;
    file_browser.required = (required) ? true : false;

    if(required)
    {
      file_browser.dataset.errorTextLocation = "#attachment-message"
    }

    // Create file browser label
    var file_label = document.createElement('label');
    file_label.setAttribute('for', file_browser_name);

    var label_text = document.createElement('div');
    label_text.classList.add('label-text');
    label_text.innerHTML = 'Choose a file...';

    // Create upload icon
    var upload_element = document.createElement('div');
    upload_element.classList.add('upload-icon');
    upload_element.innerHTML = upload_icon;

    // Append upload icon  and text label to file browser label
    file_label.appendChild(upload_element);
    file_label.appendChild(label_text);

    // Append file browser input label child to parent
    file_attachment_section.appendChild(file_browser);
    file_attachment_section.appendChild(file_label);

    // Add event handler
    File_Browser_Text(file_browser);

    counter += 1;
  }

  //****************************************
  // File browser text
  //****************************************

  var File_Browser_Text = function(input)
  {
    var label = input.nextElementSibling;
    var label_value = label.lastChild.innerHTML;

    input.addEventListener('change', function(e)
    {
      // Validate file extensions
      Validate_File_Extensions(input);

      var file_name = '';

      if(this.files && this.files.length > 1)
      {
        // If there are multiple files display the count
        file_name = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      }
      else
      {
        // Display the file name
        file_name = e.target.value.split('\\').pop();
      }

      // Diplay new file name
      (file_name) ? label.lastChild.innerHTML = file_name :  label.lastChild.innerHTML = label_value;
    });
  }

  //****************************************
  // Check file extension
  //****************************************

  var Validate_File_Extensions = function(file)
  {
    var message = '';

    // Regex for checking file extension
    var allowed_extensions = new RegExp('\\.(' + file_extensions_allowed + ')', 'i');

    // Formatting extensions
    var replace = new RegExp('\\|', 'g');
    extensions = file_extensions_allowed.replace(replace, ', ');
    extensions = (error_text_element) ?  '<strong>' + extensions + '</strong>' : extensions;

    // Loop through all the files (for the inputs that have multiple attachments)
    for(var i = 0; i < file.files.length; i++)
    {
      // Check to see if the file extension is valid
      if(allowed_extensions.test(file.files[i].name) === false)
      {
        // Create error message
        message = 'Wrong file type. Please select an image that contains ' + extensions + ' as the file extension';

        // Clear file browser input
        file.value = '';
      }

      // Display error message
      if(error_text_element && message)
      {
        error_text_element.innerHTML = message;
      }
      else if(message)
      {
        alert(message);
      }
    }
  }

  // Return public interface
  return visible;
})