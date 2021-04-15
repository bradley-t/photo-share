const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photos = require("./photos.js");
const Photo = photos.model;

const CommentSchema = new mongoose.Schema({
  comment: String,
  photo: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

router.post('/:id', validUser, async (req, res) => {
  try{
    let photo = Photo.findById(req.params.id);
    if (!photo){
      return res.sendStatus(404);
    }
    let comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        photo: req.params.id,
      });
      await comment.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
  try{
    let photo = await Photo.findById(req.params.id);
    if (!photo){
      return res.sendStatus(404);
    }
    let comments = await Comment.find({
      photo: req.params.id
    }).populate('user');
    return res.send(comments);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

module.exports = {
  model: Comment,
  routes: router,
}
