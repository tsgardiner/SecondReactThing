const pdfDocument = require('pdfkit')
const emailSender = require('../routes/index')


//Create pdf file 
exports.GeneratePDF = function(formData) {	
	var doc = new pdfDocument()

	console.log(formData)

	var firstName = formData.firstName	
	var lastName = formData.lastName
	var name = firstName + ' ' + lastName	
	var enquiryType = formData.enquiryType
	var email = formData.email
	var comments = formData.comments
	var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `


	//PDF Content
	let fileName = firstName + lastName + 'Enquiry' + '.pdf'
	doc.text(name, 50, 50)
	doc.text(email)
	doc.text(enquiryType)
	doc.text(comments)
	doc.end()

	let buffers = []
	doc.on('data', buffers.push.bind(buffers))

	doc.on('end', () => {

		var pdfData = Buffer.concat(buffers)			

		var mail = {
			from: name,
			to: 'tsgardinerdevtesting@gmail.com',  //Change to email address that you want to receive messages on
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


	}) //END OF DOC ON END
}

