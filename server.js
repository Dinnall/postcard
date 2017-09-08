const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'postcardJS@gmail.com',
    pass: 'access code'
  }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({limit: '5000gb'}));
app.use(bodyparser.urlencoded({limit: '5000gb', extended: true, parameterLimit:50000}));
app.use(express.static('public'));

app.post('/api/email', (req, res) => {
	const mailOptions = {
	  from: 'postcardJS@gmail.com',
	  to: req.body.email,
	  subject: 'Your friend sent you a postcard!',
	  html: `<img src=${req.body.image}></img>`
	};

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