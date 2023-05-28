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


  module.exports = router;