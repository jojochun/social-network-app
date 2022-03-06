const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<thoughtId>   to add comment to a thought
router.route('/:thoughtId')
    .post(addComment);

// /api/comments/<thoughtId>/<commentId>  to remove a comment need two parameters 
router.route('/:thoughtId/:commentId')
    .put(addReply)
    .delete(removeComment);

// /api/comments/<thoughtId>/<commentId>/<replyId>
router.route('/:thoughtId/:commentId/:replyId')
    .delete(removeReply);


module.exports = router;
