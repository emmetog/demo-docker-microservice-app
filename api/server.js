var express = require('express'),
    app = express(),
    cors = require('cors');
var bodyParser = require('body-parser');
var assert = require('assert');
var redis = require('redis'),
    redisClient = redis.createClient({
        'host': 'redis'
    });

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://mongo:27017/favourite-foods';

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

    app.get('/', function (req, res) {
        res.send(`
<h3>Welcome to the favourite foods API!</h3>
This API is consumed by the web service, it simply sends messages to
a Redis queue. Since you're here you're probably looking for the "favourite-foods" endpoint of this API:<br><br>
<a href="/favourite-foods">/favourite-foods</a><br><br>
Or, if you're looking for the web frontend (which uses this API behind the scenes), it's on port 81<br>
`)
    });

    app.get('/favourite-foods', function (req, res) {

        // TODO: get the foods from the db
        console.log('getting foods from db');
        db.collection('favourite-foods').find()
            .toArray(function (err, docs) {
                assert.equal(null, err);
                res.send({data: docs});
            });
    });

    app.post('/favourite-foods', function (req, res) {
        console.log('Creating a new favourite food', req.body);
        var person = {person: req.body.person, food: req.body.food};
        redisClient.lpush('new-foods', JSON.stringify(person));
        res.send({data: person});
    });

    app.listen(80, function () {
        console.log('App running on port 80');
    });
});