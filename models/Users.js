const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   email: {
      type: String,
      required: true
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

