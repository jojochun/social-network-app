const router = require('express').Router();
const { addthought, removethought, addReply, removeReply } = require('../../controllers/thought-controller');

// /api/thoughts/<thoughtId>   to add thought to a thought
router.route('/:thoughtId')
    .post(addthought);

// /api/thoughts/<thoughtId>/<thoughtId>  to remove a thought need two parameters 
router.route('/:thoughtId/:thoughtId')
    .put(addReply)
    .delete(removethought);

// /api/thoughts/<thoughtId>/<thoughtId>/<replyId>
router.route('/:thoughtId/:thoughtId/:replyId')
    .delete(removeReply);


module.exports = router;
