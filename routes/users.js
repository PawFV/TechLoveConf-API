const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const verify = require('./verifyToken');

// GET ONE
router.get('/:id', verify, async (req, res) => {
   const userId = req.params.id;
   try {
      const userFound = await Users.findById(userId);
      res.status(200).json(userFound);

   } catch (err) {
      res.status(400).json({ message: `Sorry we couldn't find user with id ${userId}` });
   }
});

// GET ALL
router.get('/', async (req, res) => {
   try {
      const userList = await Users.find();
      res.status(200).json(userList);
   } catch {
      res.status(404).json({ message: "sorry bad request." });
   }
});

// POST
router.post('/', verify, async (req, res) => {
   const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      jobTitle: req.body.jobTitle,
      avatarUrl: req.body.avatarUrl,
      twitter: req.body.twitter
   });

   try {
      const savedPost = await user.save();
      res.status(200).json(savedPost)
   } catch (error) {
      res.json({ message: error })
   }
})

// DELETE
router.delete('/:id', verify, async (req, res) => {
   const userId = req.params.id;
   try {
      await Users.remove({ _id: userId });
      res.status(200).json({ message: "User deleted!" })
   } catch (err) {
      res.status(404).json({ message: `Sorry we couldn't find user with id ${userId}` })
   }
})

// UPDATE
router.put('/:id', verify, async (req, res) => {
   const userId = req.params.id;

   try {
      const updatedUser = await Users.findByIdAndUpdate({ _id: userId }, {
         $set: req.body
      }, {
         new: true
      });

      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(400).json({ message: `You must include firstName or lastName` });
      console.log(error)
   }
})

module.exports = router;