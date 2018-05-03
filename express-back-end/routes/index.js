var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
const fs = require('fs')
const base64 = require('base64-stream')
const credentials = require('../credentials/credentials')
const PDFDocument = require('pdfkit')
const pdfGenerator = require('../pdf/generate-pdf')



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
	console.log('')
	console.log('I think things start going wrong here')
	console.log('.....................................')
	console.log('')
	console.log('req')
	console.log(req.body)
	console.log('')
	//console.log('res')
	//console.log(res)
	var firstName = req.body.formData.firstName	
	var lastName = req.body.formData.lastName
	var name = firstName + ' ' + lastName	
	var enquiryType = req.body.formData.enquiryType
	var email = req.body.formData.email
	var comments = req.body.formData.comments

	//Creating PDF 
	//The pdf creation and buffer will get moved to generate-pdf once it's working
	let doc = new PDFDocument()	
	
	let fileName = 'EnquiryPDF'
	fileName = encodeURIComponent(fileName) + '.pdf'
	console.log(fileName)

	res.setHeader('Content-type', 'application/pdf')
	res.setHeader('Content-disposition', 'attachment; filename="' + fileName + '"')

	let buffers = []
	doc.on('data', buffers.push.bind(buffers))
	
	doc.on('end', () => {

		let pdfData = Buffer.concat(buffers)	

		var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `

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

	}) //END DOC ON

	//PDF Content
	doc.text(name, 50, 50)
	doc.text(email)
	doc.text(enquiryType)
	doc.text(comments)
	doc.end()
})

//Catch all routes that resulted in an error and display on console.
router.use(function (err, req, res, next) {
	if (err) {
		console.log('Error', err);
	} else {
		console.log('404')
	}
})


module.exports = router
