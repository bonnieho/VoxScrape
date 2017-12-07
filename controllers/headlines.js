// headlines.js (this handles the articles)

// bringing in the scrape.js (scraping script) and the makeDate script
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// bringing in the Headline mongoose models
var Headline = require("../models/Headline");

module.exports = {
    // fetch is going to run the scrape function and grab all articles to put into the articles collection
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
                cb(err, docs);
            });
        });
    },

    get: function(query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function(err, doc) {
                cb(doc);
            });
    },
    update: function(query, cb) {
        Headline.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    },

    delete: function(query, cb) {
        Headline.remove(query, cb);
    }
};