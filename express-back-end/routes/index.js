var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
const credentials = require('../credentials/credentials')
const PDFDocument = require('pdfkit')
var GeneratePDF = require('../pdf/GeneratePDF')

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
	
	console.log(firstName)
	console.log('')
	
	var lastName = req.body.formData.lastName
	var name = firstName + ' ' + lastName
	
	console.log(name)
	console.log('')
	
	var enquiryType = req.body.formData.enquiryType
	var email = req.body.formData.email
	var comments = req.body.formData.comments


	//Creating PDF 
	const doc = new PDFDocument()
	let fileName = 'EnquiryPDF'
	fileName = encodeURIComponent(fileName) + '.pdf'
	console.log(fileName)

	res.setHeader('Content-type', 'application/pdf')
	res.setHeader('Content-disposition', 'attachment; filename="' + fileName + '"')
	
	doc.y = 300
	doc.text(comments, 50, 50)
	doc.pipe(res)
	doc.end()

	console.log('PDF DOC THING')
	//console.log(doc)



	var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `

	var mail = {
		from: name,
		to: 'tsgardinerdevtesting@gmail.com',  //Change to email address that you want to receive messages on
		subject: enquiryType,
		text: content,
		attachments: [{
    		filename: fileName,
    		content: new Buffer(doc, 'base64'),
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
