var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// =======  scraping tools  ========
// Axios is a promise-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

// mongoose setup for JavaScript ES6 Promises
// second Promise is built into node (uses node promise library)
mongoose.Promise = Promise;

// Initializing Express
var app = express();



// +++++++++   Configuring the middleware  +++++++++++++++

// logging requests with morgan
app.use(logger("dev"));

// body-parser for form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// express.static sets the public folder as a static directory
app.use(express.static(__dirname + "/public"));



//  ============  port configuration =================

var PORT = process.env.PORT || 3000;

// +++++ Connecting to the Mongo DB using mongoose  +++++
// If deployed, use the deployed database. Otherwise use the local mongoVoxFeed database    
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoVoxFeed";



// ++++++ configuring db (for mongojs) +++++++
// saving the URL of the database and also the name of collection
// var databaseUrl = "mongoVoxFeed";
// var collections = ["Voxarticles"];

// +++++ if using mongojs, this is how we hook up the database to the db variable  +++++
// var db = mongojs(databaseUrl, collections);

/* ++++++  confirming mongojs db connection ++++++  */

/* db.on("error", function(error) {
  console.log("mongojs Database Error:", error);
}); */



// Database configuration with mongoose
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});
// this original one returned a warning about deprecated commands in mongoose
// mongoose.connect("mongodb://localhost/mongoVoxFeed");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});





// ==========   Routes   ==============

// main index route
app.get('/', function(req, res) {
    res.send(index.html);
});


// A GET route for scraping the vox.com website
app.get('/scrape', function(req, res) {

    // First, we grab the body of the html with request
    axios.get("http://www.vox.com/").then(function(response) {

        console.log("here I am first time");

        // Then, we load that into cheerio and save it to $ for a jQuery-flavored shorthand selector
        var $ = cheerio.load(response.data);

        // Save an empty result object
        var results = [];

        // Now, we grab every h2 within an div tag (this is how Vox has their news page set up), and do the following:
        $('div h2').each(function(i, element) {

            // Save an empty result object
            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            // checking that it exists using ternary if statement, hence the ? mark
            // result.title = ($(this).children('a').text()) ? $(this).children('a').text() : "";
            // result.link = ($(this).children('a').attr('href')) ? $(this).children('a').attr('href') : "";
            if ($(this).children('a').text() && $(this).children('a').attr('href')) {
                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');
                results.push(result);
            }
        });

        console.log("results built");

        // Create a new Article using the 'result' object built from scraping
        Article
            .create(results)
            .then(function(dbArticle) {

                console.log("inside Article");

                // This message is sent if we were able to successfully scrape and SAVE an Article.
                res.send('Scrape Complete');
            })
            .catch(function(err) {
                // If there's an error, send it to the client
                res.json(err);
            });
    });
});



// Route for getting all articles from the db
app.get('/articles', function(req, res) {
    // Grab every document in the articles collection
    Article
        .find({})
        .then(function(dbArticle) {
            // If we were able to successfully find articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If there's an error, send it to the client
            res.json(err);
        });
});

// ==========  END routes  =============



// ==========  starting the server  ===========

app.listen(PORT, function() {
    console.log('App running on port ' + PORT);
});