var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
const credentials = require('../credentials/credentials')

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

  
  var content = `name: ${name} \n email: ${email} \n  enquiryType: ${enquiryType} \n  message: ${comments} `

  var mail = {
    from: name,
    to: 'tsgardinerdevtesting@gmail.com',  //Change to email address that you want to receive messages on
    subject: enquiryType,
    text: content
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

module.exports = router
