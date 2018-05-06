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


### Created Using
[Express application generator](https://expressjs.com/en/starter/generator.html)
[Create React App](https://github.com/facebook/create-react-app)
[Nodemailer](https://nodemailer.com/about/)
[PDFKit](http://pdfkit.org/)


### Updating receiving email address
```javascript
	//Address emails will be sent to.
	var sendToEmail = 'tsgardinerdevtesting@gmail.com' 
```

This is located in express-back-end/pdf/generate-pdf.js file on line:12
![alt text](https://raw.githubusercontent.com/tsgardiner/SecondReactThing/master/images/sendToEmailAddress.JPG)