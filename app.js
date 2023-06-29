var connection=require('./service/connection')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));






//backend running port
const port = 5000;


//test endpoint
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use(cors());
app.listen(port, function () {
  console.log('Example app listening on port 5000!');
});

// Inform Emergency

// define an API endpoint that handles the form submission
app.post('/submit-emergency-form', (req, res) => {
  res.send('Hello Worldfgjf!');
 const query = 'INSERT INTO fastmove.Emergency (Emergeny_type,Journey_Id, Bus_no, Route_no, Date, time,Location) VALUES ( ?, ?, ?, ?, ?,?,?)';
  const values = [  req.body.emergencyType,req.body.journeyId,  req.body.busNo,  req.body.routeNo,  req.body.date,  req.body.time ,req.body.location];

  connection.query(query, values, (err, data) => {
  if (err) {
    console.error('Error executing query:', err);
    return res.json(err);
  }
  console.log('Emergency data inserted successfully.');
  return res.json({ message: 'Update Emergency Successfully.' });
});
});


//Get  conductor details
app.get("/ConductorProfile", (req, res) => {
  var condprof = "SELECT * FROM fastmove.conductor WHERE Email= 'hnwanniarachchi98@gmail.com';";
  connection.query(condprof, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//update conductor details
app.post("/api/updateConductor", (req, res) => {
  const { conductorId, newuserName, newMobileNumber, newEmail, newNicScanCopy, newConductorLicen } = req.body;

  const updateQuery = `UPDATE fastmove.conductor_registration 
                       SET username = ?, mobileNumber = ?, email = ?, nicScanCopy = ?, conductorLicen = ?
                       WHERE conductorId = 2`;

  const values = [newuserName, newMobileNumber, newEmail, newNicScanCopy, newConductorLicen, conductorId];

  connection.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating user information:', err);
      return res.json(err);
    }

    console.log('User information updated successfully');
    return res.json({ message: 'User information updated successfully' });
  });
});


//Get conductor activity shedule details
app.get("/ConductorActivity", (req, res) => {
  var condprof = "SELECT * FROM fastmove.timetable WHERE conductorId= '1';";
  connection.query(condprof, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});