const { User } = require('../models');

const userController = {
    // the functions will go in here as methods
    // get all users
    getAlluser(req, res) {
        User.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbuserData => res.json(dbuserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getuserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbuserData => {
                // If no user is found, send 404
                if (!dbuserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbuserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // createuser
    createuser({ body }, res) {
        User.create(body)
            .then(dbuserData => res.json(dbuserData))
            .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateuser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })     // true returns a new version, not the original
            .then(dbuserData => {
                if (!dbuserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbuserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteuser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbuserData => {
                if (!dbuserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbuserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;