$(document).ready(function() {
    // this is a reference to the article-container div that holds the dynamic content
    // also adding event listeners to save articles that have been generated dynamically
    // also adding scape new article buttons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // after page is ready, this starts everything going
    initPage();

    function initPage() {
        // clear the articles container first and check for unsaved articles
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function(data) {
                // if there are new articles, show 'em
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    // display a message that there aren't any new articles
                    renderEmpty();
                }
            })
    };


    // Rendering articles
    function renderArticles(articles) {
        // Here's where data from the db gets plunked into the correct html elements
        // This is done by passing a JSON array into the html
        var articlePanels = [];
        // Passing each article JSON object into the createPanel bootstrap panel w/ article data
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        // Once all are pulled, append them into panel
        articleContainer.append(articlePanels);
    }

    // Creating the panel
    function createPanel(article) {
        // ??? This function takes in a single JSON object for an article/headline
        // ??? It constructs a jQuery element containing all of the formatted HTML for the
        // ??? article panel
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "<h3>",
                "<a href='",
                article.link,
                "'>",
                article.title,
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                "<div class='summary'>",
                article.summary,
                "</div>",
                "<br />",
                "<div class='sublink'>",
                "<a href='",
                article.link,
                "'>",
                article.link,
                "</a>",
                "</div>",
                "</div>",
                "</div>",
            ].join(""));
        // ??? We attach the article's id to the jQuery element
        // ??? We will use this when trying to figure out which article the user wants to save
        panel.data("_id", article._id);
        // ??? We return the constructed panel jQuery element
        return panel;
    }

    // build renderEmpty function  29:49
    function renderEmpty() {
        // ???  This function renders some HTML to the page explaining we don't have any articles to view
        // ???  Using a joined array of HTML string data because it's easier to read/change than a concatenated string
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Sorry - there are not any new articles</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
                "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        // ??? Appending this data to the page
        articleContainer.append(emptyAlert);
    }


    // build renderNoteModal function
    function renderNoteModal() {
        // 
    };



    function handleArticleSave() {
        renderNoteModal();
        // ?? This function is triggered when the user wants to save an article
        // ??  When we rendered the article initially, we attached a javascript object containing the headline id
        // ?? the the element using the .data method. Here we retrieve that
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        // ?? Using a patch method to be semantic since this is an update to an existing record in our collection
        console.log(articleToSave);
        $.ajax({
                method: "PATCH",
                url: "/api/headlines",
                data: JSON.stringify(articleToSave),
                contentType: 'application/json'
            })
            .then(function(data) {
                // ?? if successful, mongoose will send back an object containing a key of 'ok' with the value of 1
                // ?? (which casts to 'true')
                if (data.ok) {
                    // ?? Run the initPage function again. This will reload the entire list of articles
                    initPage();
                }
            });
    }


    function handleArticleScrape() {
        // ?? This function handles the user clicking any "scrape new articles" buttons
        $.get("/api/fetch")
            .then(function(data) {
                // ?? If we are able to successfully scrape the NYTIMES and compare the articles to those
                // ?? already in our collection, re-render the articles on the page
                // ?? and let the user know how many unique articles we were able to save
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
            });
    }


});



/*
// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // for each article the scraper picks up, make an entry
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});


// Anytime you click on a p tag, it goes to get the article and empties notesl
$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .done(function(data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// this saves a note
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // Once changes are made...
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // reset form fields to clear out
    $('#titleinput').val('');
    $('#bodyinput').val('');
});

*/