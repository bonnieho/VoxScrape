

// Grab the articles as a json
$.getJSON("/articles", function(data) {
	console.log(data);
  // For each one
  for (var i = 0; i < data.length; i++) {
    // for each article the scraper picks up, make an entry
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});
