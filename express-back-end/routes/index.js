const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const pdfDocument = require('pdfkit')
const credentials = require('../credentials/credentials')
var pdfGenerator = require('../pdf/generate-pdf')


const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: { 
		type: 'OAuth2',
		...credentials
	}
})

transporter.verify((error, success) => {
	if (error) {
		console.log(error)
	} else { 
		console.log('Server is ready')
	}
})

router.post('/send', (req, res, next) => {

	var formData = req.body.formData

	//Create pdf document
	pdfGenerator.GeneratePDF(formData)
	
	/*var firstName = req.body.formData.firstName	
	var lastName = req.body.formData.lastName
	var name = firstName + ' ' + lastName	
	var enquiryType = req.body.formData.enquiryType
	var email = req.body.formData.email
	var comments = req.body.formData.comments
	var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `*/

	//Creating PDF 
	//The pdf creation and buffer will get moved to generate-pdf once it's working
	//let doc = new pdfDocument()	
	//let fileName = firstName + lastName + 'Enquiry' + '.pdf'

	//PDF Content
	/*doc.text(name, 50, 50)
	doc.text(email)
	doc.text(enquiryType)
	doc.text(comments)*/

	//doc.end()

	/*let buffers = []
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

		transporter.sendMail(mail, (err, data) => {
			if (err) {
			  res.json({
			    msg: 'fail'
			  })
			} else {    	
			  res.json({
			    msg: 'success'
			  })
			}
		})	

	}) //END OF DOC ON END*/
	

	/*console.log('')
	console.log('.........................................................................')
	console.log('pdfData after doc.on finish')
	console.log(pdfData)*/

	/*console.log('')
	console.log('.........................................................................')
	console.log('pdfData in doc.on')
	console.log(pdfData)*/
})


//Sends email once pdf has been created
exports.SendMail = function(mail) {
		transporter.sendMail(mail, (err, data) => {
			if (err) {
			  res.json({
			    msg: 'fail'
			  })
			} else {    	
			  res.json({
			    msg: 'success'
			  })
			}
		})	
}

//Catch all routes that resulted in an error and display on console.
router.use(function (err, req, res, next) {
	if (err) {
		console.log('Error', err);
	} else {
		console.log('404')
	}
})


module.exports = router
