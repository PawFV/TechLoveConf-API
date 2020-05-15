const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Users = require('../models/Users');
const multer = require('multer');
require('dotenv/config');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/images')
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
   } else {
      cb(null, false);
   }
}
// const upload = multer({ dest: 'public/images/' })
const upload = multer({
   storage: storage, limits: {
      fileSize: 500000
   },
   fileFilter: fileFilter
})


router.put('/', verify, upload.single('file'), async (req, res) => {
   const file = req.file;
   const userId = req.headers.userid;

   try {
      const updatedUser = await Users.findByIdAndUpdate({ _id: userId }, {
         $set: {
            avatarUrl: process.env.URL + 'public/images/' + file.originalname
         }
      }, {
         new: true
      });

      res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
   } catch (error) {
      res.status(400).json({ message: `Can't upload your file. Allowed extensions: png/jpg. Max size 500kb.` });
      console.log(error)
   }
})


module.exports = router;