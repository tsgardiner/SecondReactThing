const pdfDocument = require('pdfkit')
const emailSender = require('../routes/index')

//Create pdf file and call send with mail data on completion.
exports.GeneratePDF = function(formData) {	
	var pdfDoc = new pdfDocument()
	//console.log(formData)

	//Address emails will be sent to.
	var sendToEmail = 'tsgardinerdevtesting@gmail.com'

	var firstName = formData.firstName	
	var lastName = formData.lastName
	var name = firstName + ' ' + lastName	
	var enquiryType = formData.enquiryType
	var email = formData.email
	var comments = formData.comments
	var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `


	//PDF Content
	let fileName = firstName + lastName + 'Enquiry' + '.pdf'
	StylePDF()
	pdfDoc.end()

	let buffers = []
	pdfDoc.on('data', buffers.push.bind(buffers))

	pdfDoc.on('end', () => {

		var pdfData = Buffer.concat(buffers)			

		var mail = {
			from: name,
			to: sendToEmail,  //Change sendToEmail to email address that you want to receive messages on.
			subject: enquiryType,
			text: content,  
			attachments: [{
	    		filename: fileName,
	    		content: pdfData, 
	    		contentType: 'application/pdf'
			}]
		}

		//Send email with all content and pdf attachment
		emailSender.SendMail(mail)

	}) //END OF pdfDoc ON END

	//Set all styling for pdf document 
	//For text styling options see: http://pdfkit.org/docs/text.html 
	function StylePDF() {

		pdfDoc.fontSize(25)
			  .text('Enquiry Form', 100, 50)

		pdfDoc.fontSize(10)
		pdfDoc.text('From: ' + name, 100, 125)
		pdfDoc.text('Email: ' + email)
		pdfDoc.text('Enquiry Topic: ' + enquiryType)
	}
}




