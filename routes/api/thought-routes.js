const router = require('express').Router();
const { addThought, getAllThoughts, getThoughtById, updateThought,
    deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');


// getAllThoughts
router.route('/')
    .get(getAllThoughts);

// ThoughtById
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


// create Thought with association to userId 
router.route('/:userId')
    .post(addThought);


// add reaction with association to thoughtId
router.route('/:thoughtId/reactions')
    .post(addReaction);

// remove reaction
router.route('/thoughtId/reactionId')
    .delete(removeReaction);


module.exports = router;
