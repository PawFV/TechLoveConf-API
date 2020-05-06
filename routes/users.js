const express = require('express');
const router = express.Router();
const Users = require('../models/Users')


// GET ONE
router.get('/:id', async (req, res) => {
   const userId = req.params.id;
   try {
      const userFound = await Users.findById(userId);
      res.status(200).json(userFound);

   } catch (err) {
      res.status(400).json({ msg: `Sorry we couldn't find user with id ${userId}` });
   }
});

// GET ALL
router.get('/', async (req, res) => {
   try {
      const userList = await Users.find().limit(20);
      res.status(200).json(userList);
   } catch {
      res.status(404).json({ msg: "sorry bad request." });
   }
});

// POST
router.post('/', async (req, res) => {
   const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
   });

   try {
      const savedPost = await user.save();
      res.json(savedPost)
   } catch (error) {
      res.json({ msg: error })
   }
})

// DELETE
router.delete('/:id', async (req, res) => {
   const userId = req.params.id;
   try {
      await Users.remove({ _id: userId });
      res.status(200).json({ msg: "User deleted!" })
   } catch (err) {
      res.status(404).json({ msg: `Sorry we couldn't find user with id ${userId}` })
   }
})

// UPDATE
router.patch('/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      await Users.updateOne({ _id: userId }, {
         $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
         }
      });

      const updatedUser = await Users.findById(userId);
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(400).json({ msg: `You must include firstName or lastName` });
   }
})

module.exports = router;