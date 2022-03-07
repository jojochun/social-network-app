const res = require('express/lib/response');
const { User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {                                // created Thought _id, then push _id into thoughts array
                return User.findOneAndUpdate(
                    { _id: params.userId },                     // associated user's (thought's array field)
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find()
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbthoughtData => {
                // If no thought is found, send 404
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    // create reaction stored in a single thought's reaction field
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
            .populate({
                path: 'reaction',
                select: '-__v'
            })
            .select('-__v')
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // remove reaction by the reaction's reactionId
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { reactionId: params } } },
            { new: true }
        )
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

};

module.exports = thoughtController;