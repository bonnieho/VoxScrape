$(document).ready(function() {
    // this is a reference to the article-container div that holds the dynamic content
    var articleContainer = $(".article-container");
    // also adding event listeners to save articles that have been generated dynamically
    // also adding scape new article buttons
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    // after page is ready, this starts everything going
    initPage();

    function initPage() {
        // clear the articles container first and check for unsaved articles
        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function(data) {
            // if there are new headlines, show 'em
            if (data && data.length) {
                renderArticles(data);
            } else {
                // display a message that there aren't any new articles
                renderEmpty();
            }
        });
    }


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
        // ??? It constructs a jQuery element containing all fo the formatted HTML for the
        // ??? article panel
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
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
        // ???  This function renders some HTML to the page explaining we don't hav eany articles to view
        // ???  Using a joined array of HTML string data because it's easier to read/change than a concatenated string
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Sorry - there are not any new articles</h4>",
                "</div>";
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body txet-center'>",
                "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
                "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        // ??? Appending this data to the page
        articleContainer.append(emptyAlert);
    }



    function renderNotesList(data) {
        // ?? This function handles rendering note list items to our notes modal
        // ?? Setting up an array of notes to render after finisehd
        // ?? Also setting up a currentNotev ariable to store each note
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            // ?? If we have no notes, just display a message saying this
            currentNote = [
                "<li class='list-group-item'>",
                "No Notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            // ?? If we do have notes, go through eacho ne
            for (var i = 0; i < data.notes.length; i++) {
                // ?? Constructs an li element to contain ourn oteText and a delete button
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-dangern note-delete'>x</button>",
                    "</li>"
                ].join(""));
                // ?? Store the note id on the delete button for easy access when trying to delete
                currentNote.children("button").data("_id", data.notes[i]._id);
                // ?? Adding out currentNote to the notesToRender array
                notesToRender.push(currentNote);
            }
        }
        // ?? Now append the notesToRender to the note-container inside the note n=modal
        $("note-container").append(notesToRender);
    }

    function handleArticleDelete() {
        // ?? This function handles the deletion of articles/headlines
        // ?? First we grab the id of the article we want to delete from the pane lelement the delete bottn sits inside

        var articleToDelete = $(this).parents("panel").data;
        // ??  Using a DELETE method here just to be semantic since we are deleting an article/headline
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }
});

function handleArticleNotes() {
    // ?? This function handles appending the notes modal and displaying our notes
    // ?? We grab the id of the article to get notes for from the panel element the delete button sits inside
    var currentArticle = $(this).parents(".panel").data();
    // ?? Grab any notes with this headline/article id
    $.get("/api/notes/" + currentArticle._id).then(function(data) {
        // ?? Consrtuction our intital HTML to add to the notes modal
        var modalText = [
            "<div class='container-fluid text-center'>",
            "<h4>Notes For Article: ",
            currentArticle._id,
            "</h4>",
            "<hr />",
            "<ul class='list-group note-container'>",
            "</ul>",
            "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
            "<button class='btn btn-success save'>Saved Note</button>",
            "</div>"
        ].join("");
        // ?? Adding the formatted HTML to the Note modal
        bootbox.dialog({
            message: modalText,
            closeButton: true
        });
        var noteData = {
            _id: currentArticle._id,
            notes: data || []
        };
        // ?? Adding some informationa bout the article and article note sto the save button for easy access when trying toa dd a new note
        ///////35.33 // $(".btn.save").data("article")
        $("btn.save").data("article", noteData);
        // ?? renderNotesList will populate the actual not HTM Linside of the model we just rendered
        renderNotesList(noteData);
    });
}

function handleNoteSave() {
    //  ?? This function handles what happens when au ser tries to save a new note for an article
    // ?? Setting a variable to holds ome formatted data about our note, 
    // ?? grabbing the note typed into the inputb ox
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    // ?? If we actually have data typed into the note input field, fomrat it
    // ?? and post it to the "/api/notes" route ands end the formatted noteData as wel
    if (newNote) {
        noteData = {
            _id: $(this).data("article")._id,
            noteText: newNote
        };
        $.post("/api/notes", noteData).then(function() {
            // ?? When complete, close the modal
            bootbox.hideAll();
        });
    }
}


function handleNoteDelete() {
    // ?? This function handles the deletion of notes
    // ?? First we grab the id of the note we want to delete
    // ?? We stored this data on the delete button when we created it
    var noteToDelete = $(this).data("_id)";
        // ??  Perform a DELETE request to "/api/notes/" with the id of the note we're deleting as a parameter
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function() {
            // ?? When done, hide the modal
            bootbox.hideAll();
        });
    }
});