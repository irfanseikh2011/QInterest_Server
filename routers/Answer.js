const express = require("express");
const router = express.Router();
const answerDB = require("../Models/Answer");


router.post("/", async (req, res) => {
    const answerData = new answerDB({
      question_id: req.body.question_id,
      answer: req.body.answer,
      user: req.body.user,
    });
  
    await answerData
      .save()
      .then((doc) => {
        res.status(201).send({
            status:true,
            data:doc
        });
      })
      .catch((err) => {
        res.status(400).send({
            status:false,
          message: "Error while adding answer",
        });
      });
  });


  router.put('/delete/:answerId', async (req, res) => {
    const { answerId } = req.params;
  
    try {
      // Find the answer by its ID and delete it
      const deletedAnswer = await answerDB.findByIdAndDelete(answerId);
  
      if (!deletedAnswer) {
        return res.status(404).json({ error: 'Answer not found' });
      }
  
      // Optionally, you can perform additional cleanup or actions here
  
      return res.json({ message: 'Answer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });



  router.put('/:answerId/like', async (req, res) => {
    try {
      const answerId = req.params.answerId;
      const email = req.body.user.email; // Assuming user ID is passed in the request body
    
      // Find the post by ID
      const post = await answerDB.findById(answerId);
  
      if (!post) {
        return res.status(404).json({ error: 'Answer not found' });
      }

       // Check if the user has already liked the post
    const likedIndex = post.liked_by.indexOf(email);
    if (likedIndex > -1) {
      // User has already liked the post, remove the like
      post.liked_by.splice(likedIndex, 1);
      post.likesCount -= 1;
    } else {
      // User hasn't liked the post, add the like
      post.liked_by.push(email);
      post.likesCount += 1;
    }
      // Save the updated post
      await post.save();
  
      return res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });


  module.exports = router;