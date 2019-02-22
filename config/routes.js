// Server routes

var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();


// bringing in the scrape.js (scraping script) 
var scrape = require("../scripts/scrape");

// bringing in headlines and notes from the controller
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");


module.exports = function(router) {

    //  rendering home page
    router.get("/", function(req, res) {
        res.render("home");
    });

    //  rendering saved articles page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    // checking for new articles
    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Check back later."
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles."
                });
            }
        });
    });

    // getting all articles out of the database
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });


    // deleting a specific saved article
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });


    // route to update articles if needed 26:06
    router.patch("/api/headlines/", jsonParser, function(req, res) {
        headlinesController.update(req.body, function(err, data) {

            // headlinesController.update(query, function(err, data) {
            res.json(data);
        });
    });


    // route to grab all of the notes associated with the articles
    router.get("/api/notes/_headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });


    // route to delete notes
    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });


    // route to post NEW notes to articles
    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(req, data) {
            res.json(data);
        });
    });



    // END module.exports
}