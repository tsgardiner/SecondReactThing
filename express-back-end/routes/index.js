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
