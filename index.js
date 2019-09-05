// console.log("hello")
const express = require('express');
const myParser = require("body-parser");
const app = express();

const fs = require('fs');
var port = 3003;
let rawdata = fs.readFileSync('data.json');
let dataJson = JSON.parse(rawdata);
var bodyParserJSON = myParser.json();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydatabase";




MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    console.log("Database created!");
    console.log("Switched to " + db.databaseName + " database");
    // console.log(db)
    app.set('database', db);

});


// MongoClient.connect(url, function(err, db) {

//     db.collection('Persons', function(err, collection) {

//         collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
//         collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
//         collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });



//         db.collection('Persons').count(function(err, count) {
//             if (err) throw err;

//             console.log('Total Rows: ' + count);
//         });
//     });

// });





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
app.get('/createdb', (req, res) => {



    var db = app.get("database")
    console.log("db....", db)
    db.createCollection("test", function(err, data) {
        console.log("abc")
    })

    // db.createCollection("users", function(err, result) {
    //     if (err) throw err;
    //     console.log("Collection is created!");
    //     // close the connection to db when you are done with it
    //     // db.close();
    // });


    // console.log(req.params)
    //     // res.send(req.params);
    // console.log(dataJson)
    //     //console.log(dataJson)
    // for (let i = 0; i < dataJson.length; i++) {
    //     console.log(dataJson[i].id, req.params.id);
    //     console.log(dataJson[i])
    //     if (req.params.id == dataJson[i].id) {
    //         console.log(dataJson[i])
    //         res.send(dataJson[i])
    //     } else {
    //         res.send(req.params.id + "not found")
    //     }
    // }
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