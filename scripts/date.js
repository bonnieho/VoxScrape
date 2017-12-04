var makeDate = function() {

    // starts out as an empty string, then different date parts get added in.
    var d = new Date();
    var formattedDate = "";

    // we add one here since the months are indexed like array elements and we don't want January to be 0, Feb = 1, etc.
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = makeDate;