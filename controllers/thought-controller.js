const res = require('express/lib/response');
const { Thought, thought } = require('../models');

const ThoughtController = {
    // add Thought to thought
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { Thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },

    addReply({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.ThoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove Thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.ThoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                return thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { Thoughts: params.ThoughtId } },
                    { new: true }
                );
            })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },

    removeReply({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.ThoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => res.json(err));
    }

};

module.exports = ThoughtController;