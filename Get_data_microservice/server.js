var express = require('express')
var app = express();
var port = process.env.PORT || 6000;
var fetch = require('node-fetch');
var mongoose = require('mongoose');
let dbConfig = require('./database/db');
const userSchema = require('./models/User')
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
    fetch('https://gorest.co.in/public-api/users')
        .then(function (data) {
            return data.json();

        }).then(function (parsed) {
            resp(parsed);
        });
}

getDataFromUrl(function (resp) {
    // res.send(resp);
    // console.log(resp.data);
    console.log('userData =  ', resp.data)
    userSchema.insertMany(resp.data)
        .then(function (docs) {
            // do something with docs
            console.log("data store in database succesfully =  ", docs)
        })
        .catch(function (err) {
            // error handling here
        });
});
app.listen(port, function () {
    console.log('Server started on port: ' + port);
});