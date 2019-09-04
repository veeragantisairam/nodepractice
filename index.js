// console.log("hello")
const express = require('express');
const myParser = require("body-parser");
const app = express();

const fs = require('fs');
var port = 3002;
let rawdata = fs.readFileSync('data.json');
let dataJson = JSON.parse(rawdata);

var bodyParserJSON = myParser.json();

app.use(bodyParserJSON);
//app.use(myParser.urlencoded({ extended: true }));



//get all users
app.get('/', function(req, res) {
    //res.send('Hello World');
    //console.log(rawdata);
    //console.log(dataJson);
    res.send(dataJson);

});


//get userby id
app.get('/:id', (req, res) => {
    console.log(req.params)
        // res.send(req.params);
    console.log(dataJson)
        //console.log(dataJson)
    for (let i = 0; i < dataJson.length; i++) {
        console.log(dataJson[i].id, req.params.id);
        console.log(dataJson[i])
        if (req.params.id == dataJson[i].id) {
            console.log(dataJson[i])
            res.send(dataJson[i])
        } else {
            res.send(req.params.id + "not found")
        }
    }
})

// create user
app.post('/createdata', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.delete('/:id', (req, res) => {
    console.log(req.params.id);

    for (let i = 0; i < dataJson.length; i++) {
        // console.log(dataJson[i].id, req.params.id);
        // console.log(dataJson[i])
        if (req.params.id == dataJson[i].id) {
            console.log(dataJson[i])
            res.send(JSON.stringify(dataJson[i]) + "deleted")
        }
        // else {
        //     res.send(req.params.id + "not found to delete")
        // }
    }
})


app.listen(port, console.log('serverlistening port num:' + port))