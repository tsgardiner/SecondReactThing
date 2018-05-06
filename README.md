# React with Express 

## React contact form with Express back-end
### Email form data as pdf attachment using Nodemailer and PDFKit

## Installation

Install dependencies for both the React front-end and Express back-end.

This is assuming you have [npm](https://www.npmjs.com/get-npm) already installed.

```
$ cd express-back-end
$ npm install	

$ cd react-front-end
$ npm install
```


## Running

This will require two separate terminals.

```
$ cd express-back-end 
$ npm start
```

In a second terminal window.

```
$ cd react-front-end 
$ npm start
```

It should look something like this.
![alt text](https://raw.githubusercontent.com/tsgardiner/SecondReactThing/master/images/terminalExample.JPG)


### Updating receiving email address

```javascript
	//Address emails will be sent to.
	var sendToEmail = 'tsgardinerdevtesting@gmail.com' 
```

This is located in express-back-end/pdf/generate-pdf.js file on line:12.

![alt text](https://raw.githubusercontent.com/tsgardiner/SecondReactThing/master/images/emailAddress.JPG)


### Adding Gmail account with OAuth2

This example should keep working with the current gmail account settings.

If you wish to change these update the express-back-end/credentials/credentials.js file.

Here are two guides I used for this:

This will help get things up and running.

[React contact forms with Nodemailer](https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react)

A more detailed guide on how to use GoogleApi project settings with OAuth 2.0 Playground

[Sending mail with Gmail using OAuth2](http://masashi-k.blogspot.co.nz/2013/06/sending-mail-with-gmail-using-xoauth2.html)


### Created Using

[Express application generator](https://expressjs.com/en/starter/generator.html)

[Create React App](https://github.com/facebook/create-react-app)

[Nodemailer](https://nodemailer.com/about/)

[PDFKit](http://pdfkit.org/)