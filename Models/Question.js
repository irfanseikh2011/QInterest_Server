const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags:[],
    created_at:{
        type:Date,
        default: Date.now(),
    },
    user: Object,
    comment_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    },
    liked_by: {
        type:[{ type: String }]
    },

    likesCount: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Questions", questionSchema);