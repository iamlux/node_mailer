var mysql      = require('mysql');
var nodemailer = require('nodemailer');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'carloscruz'
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'myemail@gmail.com',
    pass: 'mypassword'
  }
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected made successfully');
});

var select_query = 'SELECT * from users';

connection.query(select_query, function (error, results, fields) {
	if (error) throw error;

	transporter.sendMail({
	  from: 'test@test',
	  to: 'test@test',
	  subject: 'Sending Email using Node.js',
	  text: JSON.stringify(results)
	}, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});