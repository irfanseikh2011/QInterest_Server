const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionDB = require("../Models/Question");

router.post("/", async (req, res) => {
  const questionData = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,
    user: req.body.user,
  });

  await questionData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        status:false,
        message: "Error adding question",
      });
    });
});


router.get('/', async (req,res) => {
    QuestionDB.aggregate([
        {
            $lookup: {
                from:"comments",
                let: {question_id : "$_id"},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            comment: 1,
                            created_at: 1,
                        }
                    }
                ],
                as: "comments",
            }
        },
        {
            $lookup: {
                from: "answers",
                let: {question_id:"$_id"},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],
                            }
                        }
                    },
                    {
                        $project: {
                            _id:1,
                        }
                    }
                ],
                as: "answerDetails",
            }
        },
        {
            $project: {
                __v: 0,
            }
        }
    ])
    .exec()
    .then((questionDetails) => {
        res.status(200).send(questionDetails);
    }).catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
    })
})

router.get("/:id", async (req, res) => {
    try {
      // const question = await QuestionDB.findOne({ _id: req.params.id });
      // res.status(200).send(question);
      QuestionDB.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "answers",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  user: 1,
                  answer: 1,
                //   // created_at: 1,
                  question_id: 1,
                  created_at: 1,
                  liked_by: 1
                },
              },
            ],
            as: "answerDetails",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  question_id: 1,
                  user: 1,
                  comment: 1,
                  // created_at: 1,
                  // question_id: 1,
                  created_at: 1,
                },
              },
            ],
            as: "comments",
          },
        },
        // {
        //   $unwind: {
        //     path: "$answerDetails",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $project: {
            __v: 0,
            // _id: "$_id",
            // answerDetails: { $first: "$answerDetails" },
          },
        },
      ])
        .exec()
        .then((questionDetails) => {
          res.status(200).send(questionDetails);
        })
        .catch((e) => {
          console.log("Error: ", e);
          res.status(400).send(error);
        });
    } catch (err) {
      res.status(400).send({
        message: "Question not found",
      });
    }
  });


  router.put('/:postId/like', async (req, res) => {
    try {
      const postId = req.params.postId;
      const email = req.body.user.email; // Assuming user ID is passed in the request body
    
      // Find the post by ID
      const post = await QuestionDB.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
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


router.put('/delete/:questionId', async (req,res) => {
  try {
    const {questionId} = req.params;

    const deletedQuestion = await QuestionDB.findByIdAndDelete(questionId);
    const remainingQuestion =await QuestionDB.find();
  
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Optionally, you can perform additional cleanup or actions here

    return res.json({ message: 'Question deleted successfully', data: remainingQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


router.get('/questions/search', async (req,res) => {
  try {
    const {title} = req.query;

    const foundQuestions = await QuestionDB.find({
      $or: [
        { title: {$regex: title, $options: 'i'}},
        { body: {$regex: title, $options: 'i'}}
      ]
    });

    if(foundQuestions.length < 1){
      return res.status(400).json({message: "Questions Not found"})
    }

    return res.json(foundQuestions);
  } catch(err){
    console.log(err);
    res.status(500).json({error: "server error"});
  }
})


router.get('/questions/filter', async (req,res) => {
  try {
    const {tag} = req.query;

    const foundQuestions = await QuestionDB.find({
      $or: [
        { tags: {$regex: tag, $options: 'i'}},
      ]
    });

    if(foundQuestions.length < 1){
      return res.status(400).json({message: "Questions Not found"})
    }

    return res.json(foundQuestions);
  } catch(err){
    console.log(err);
    res.status(500).json({error: "server error"});
  }
})


module.exports = router;