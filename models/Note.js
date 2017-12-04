var mongoose = require("mongoose");


// This creates a reference to the Schema constructor
var Schema = mongoose.Schema;



// Using Schema constructor, this will create a new NoteSchema OBJECT
/* var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
  	type: String
  }
});
*/

var NoteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});


// the new Schema is now the source of the new model 
var Note = mongoose.model("Note", NoteSchema);



// put a bow on it and send it off
module.exports = Note;