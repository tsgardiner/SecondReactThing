
//Gmail OAuth2 settings for sending email using a gmail account
//Guide followed for setting up account with OAuth2: https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react
//Guide on how to make refresh tokens work: http://masashi-k.blogspot.co.nz/2013/06/sending-mail-with-gmail-using-xoauth2.html
const user = 'tsgardinerdevtesting@gmail.com'
const clientId = '738582413182-vo04l0k27ufau26mvlol0hpj8drmbakd.apps.googleusercontent.com'
const clientSecret = 'khwB8o_5zRDRJzzIy8mEPyMr'
const refreshToken = '1/zDSGCtx6wn6f5FIg37UncUYhYpE8Prqb4SRqsM6WjiE'
//const accessToken = 'ya29.GluzBfPpLuS5utrsC1dWg_cq58qAA63d754A7Ux9POcCUttIazDEThCt8XnMrKPKvnCinHhJMwQoTKaSNi4UPXk_A9N4Qcm1XNQhTkAwyySWgCaklK58Yr8lpFL1'


module.exports = {
	user,	
	clientId,
	clientSecret,
	refreshToken,
}

