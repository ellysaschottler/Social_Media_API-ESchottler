const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;


// to do: add the new routes for:
// to do: put - to update a user by its _id
// to do : delete - to remove a user by its _id
// to do bonus - remove a user's thoughts when deleted
// to do post - add a new friend to a user's friend list
// to do delete - remove a friend from a user's friend list