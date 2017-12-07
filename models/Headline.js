// Headline.js (this is the new version of the Article.js)

var mongoose = require("mongoose");

// This creates a reference to the Schema constructor
var Schema = mongoose.Schema;


// Using Schema constructor, this will create a new HeadlineSchema OBJECT

var HeadlineSchema = new Schema({
    title: {
        type: String,
        required: true,
        // unique: { index: { unique: true } }
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: String,
    date: String,
    saved: {
        type: Boolean,
        default: false

        // },
        // the note object is storing an id and then the ref links the id to the model. Now, we can store a custom note.
        // note: {
        //    type: Schema.Types.ObjectId,
        //    ref: "Note"
    }
});

// Schema is now the source of the new model 
var Headline = mongoose.model("Headline", HeadlineSchema);


// put a bow on it and send it off
module.exports = Headline;