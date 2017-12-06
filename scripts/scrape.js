// script for SCRAPING

// required packages
// =======  scraping tools  ========
// Axios is a promise-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    // First, we grab the body of the html with request
    // ===== this IS different on the video =======
    // axios.get("http://www.vox.com/").then(function(response) {

    // =============================
    // Use the request package to take in the body of the page's html
    request("https://www.vox.com/", function(err, res, body) {
        // body is the actual HTML on the page. Load this into cheerio
        console.log("scraping");
        // =============================
        console.log("here I am for the first time");

        // Then, we load that into cheerio and save it to $ for a jQuery-flavored shorthand selector
        // ===== this IS different on the video =======
        // var $ = cheerio.load(response.data);

        // =============================
        // Saving this to $ creates a virtual HTML page we can minipulate and
        // traverse with the same methods as jQuery
        var $ = cheerio.load(body);
        // =============================

        // Save an empty results object
        var results = [];

        // Now, we grab every h2 within an div tag (this is how Vox has their news page set up), and do the following:
        $('div h2').each(function(i, element) {

            var title = $(this).children('a').text();
            var link = $(this).children('a').attr('href');

            if (title && link) {
                var dataToAdd = {
                    title: title,
                    link: link
                };
                results.push(dataToAdd);
            }
        });
        cb(results);


        // Save an empty result object
        /* var result = {}; */
        // Add the text and href of every link, and save them as properties of the result object
        // checking that it exists using ternary if statement, hence the ? mark
        // result.title = ($(this).children('a').text()) ? $(this).children('a').text() : "";
        // result.link = ($(this).children('a').attr('href')) ? $(this).children('a').attr('href') : "";
        /* if ($(this).children('a').text() && $(this).children('a').attr('href')) {
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            results.push(result);
        } */
    });
};

module.exports = scrape;