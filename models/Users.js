const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: false
   },
   lastName: {
      type: String,
      required: false
   },
   date: {
      type: Date,
      default: Date.now
   },
   email: {
      type: String,
      required: false
   },
   jobTitle: {
      type: String,
      required: false
   },
   avatarUrl: {
      type: String,
      required: false
   },
   twitter: {
      type: String,
      required: false
   }
});

module.exports = mongoose.model('Users', PostSchema);

