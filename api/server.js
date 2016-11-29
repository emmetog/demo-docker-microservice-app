var express = require('express'),
    app = express(),
    cors = require('cors');
var bodyParser = require('body-parser');
var assert = require('assert');


var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://mongo:27017/favourite-foods';

foods = [
    {id: 1, person: 'Peter', food: 'Pasta Bolognese'},
    {id: 2, person: 'John', food: 'Pizza'},
    {id: 3, person: 'Maria', food: 'Omelet'},
];

mongoOptions = {
    autoReconnect: true,
    reconnectTries: 30,
    reconnectInterval: 5000,
    connectionTimeoutMS: 30000
};

mongoClient.connect(mongoUrl, mongoOptions, function (err, db) {

    assert.equal(null, err);

    if (err) {
        console.log('Could not connect to mongo server at ' + mongoUrl);
        return;
    }

    console.log("Connected successfully to mongo server");

    app.use(cors());
    app.use(bodyParser.json());       // to support JSON-encoded bodies

    app.get('/favourite-foods', function (req, res) {

        // TODO: get the foods from the db
        console.log('getting foods from db');
        var dbFoods = db.collection('favourite-foods').find()
            .toArray(function (err, docs) {
                assert.equal(null, err);
                console.log('foods from db are: ', docs);
                res.send({data: docs});
            });
    });

    app.post('/favourite-foods', function (req, res) {
        console.log('Creating a new favourite food', req.body);
        var person = {person: req.body.person, food: req.body.food};
        db.collection('favourite-foods').insertOne(person);
        res.send({data: person});
    });

    app.listen(80, function () {
        console.log('App running on port 80');
    });
});