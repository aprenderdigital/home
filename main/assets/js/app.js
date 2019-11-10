$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'GET',
			url: 'https://us-central1-aprender-digital-ugugho.cloudfunctions.net/reservarONDG',
			dataType: 'text html',
			cache: false,
			data: formData
		})
		.done(function(response) {
			
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#adNome').val('');
			$('#adCidade').val('');
			$('#adTelefone').val('');
		})
		.fail(function(data, textStatus, errorThrown) {
			console.log(textStatus, errorThrown, data.readyState, data.status, data.statusText, data.getAllResponseHeaders());
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
