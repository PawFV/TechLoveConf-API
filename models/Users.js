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
   }
});

module.exports = mongoose.model('Users', PostSchema);

 // email: {
   //    type: String,
   //    required: true
   // },
   // contact: {
   //    type: String,
   //    required: true
   // },
   // avatarUrl: {
   //    type: String,
   //    required: true
   // },