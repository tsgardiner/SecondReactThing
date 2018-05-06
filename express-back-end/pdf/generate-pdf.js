const pdfDocument = require('pdfkit')
const moment = require('moment')
const emailSender = require('../routes/index')

//Create pdf file and call send with mail data on completion.
exports.GeneratePDF = function(formData) {	
	var pdfDoc = new pdfDocument()
	var currentDate = moment().format('MMMM Do YYYY, h:mm')
	//console.log(formData)

	//Address emails will be sent to.
	var sendToEmail = 'tsgardinerdevtesting@gmail.com'

	var firstName = formData.firstName	
	var lastName = formData.lastName
	var name = firstName + ' ' + lastName	
	var enquiryType = formData.enquiryType
	var email = formData.email
	var comments = formData.comments

	//Content for standard email text.
	var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} `


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
	  		  .text ('Enquiry Form', { align: 'center' })	

  		pdfDoc.moveDown()  
  		pdfDoc.font('Times-Roman')
		pdfDoc.fontSize(10)
		pdfDoc.text(currentDate, {align: 'right'}) //Needs a table to be placed on the same line as name.
		pdfDoc.text('From: ' + name)		
		pdfDoc.text('Email: ' + email)
		pdfDoc.text('Enquiry Topic: ' + enquiryType)

		pdfDoc.moveDown(4)  
  		pdfDoc.font('Helvetica')  		
		pdfDoc.fontSize(14)
		pdfDoc.text(comments) //This looks better with more text
	}
}




