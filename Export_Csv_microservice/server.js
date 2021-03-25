var express = require('express')
var app = express();
var port = process.env.PORT || 5000;
var fetch = require('node-fetch');
var mongoose = require('mongoose');
let dbConfig = require('./database/db');
const userSchema = require('./models/User');
const converter = require('json-2-csv');

const fs = require('fs');


const { readFile, writeFile } = require('fs').promises;
// var routes = require('./api/routes');
// routes(app);
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    // useNewUrlParser: true
}).then(() => {
    console.log('Database sucessfully connected!')
},
    error => {
        console.log('Could not connect to database : ' + error)
    }
)

function getDataFromUrl(resp) {
    userSchema.find((error, data) => {
        if (error) {
          return next(error)
        } else {
        //   res.json(data)
        console.log("user data = ", data)
        resp(data)
        }
      })
}

getDataFromUrl(function (userData) {
    // res.send(userData);
    console.log("in function data = ", userData);

    // convert JSON array to CSV string
converter.json2csv(userData, (err, csv) => {
    if (err) {
        throw err;
    }

    // print CSV string
    console.log("CSV data = ",csv);
    fs.writeFileSync('usersData.csv', csv);
});
    
});
app.listen(port, function () {
    console.log('Server started on port: ' + port);
});