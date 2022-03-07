const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend
} = require('../../controllers/User-controller');

// Set up GET all and POST at /api/User
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/User/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)



module.exports = router;