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
  var firstName = req.body.firstName
  console.log(firstName)
  var lastName = req.body.lastName
  var name = firstName + ' ' + lastName
  console.log(name)
  var enquiryType = req.body.enquiryType
  var email = req.body.email
  var comments = req.body.comments
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
        console.log('Made it here?')
      })
    }
  })
})


module.exports = router
