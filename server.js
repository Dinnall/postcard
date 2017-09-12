const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
// inlineBase64 - convert base64 an actual image for email attachments

/////
const jsonParser = bodyParser.json({limit:1024*1024*20, type:'application/json'});
const urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' })
/////

const transporter = nodemailer.createTransport(smtpTransport({
	  service: 'gmail',
	  auth: {
		    user: 'postcardJS@gmail.com',
		    pass: 'access code'
		  }}));


/////
app.use(jsonParser);
app.use(urlencodedParser);
//////

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({limit: '50mb',extended: true,parameterLimit:50000
}));
app.use(express.static('public'));

app.post('/api/email', (req, res) => {
	const mailOptions = {
	  from: 'postcardJS@gmail.com',
	  to: req.body.email,
	  subject: 'Your friend sent you a postcard!',
	  html: `<img src=${req.body.image}></img>`
	};

console.log("Current BODY:",req.body.email)
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
	    console.log(error);
	  } else {
	    res.send(`Email sent: ${info.response}`);
	  }
	});	
})



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

console.log("Listening on port 5000");
app.listen(5000);

module.exports = app;