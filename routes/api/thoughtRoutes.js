// to do, add all the routes we create in thoughtController.js

const router = require('express').Router();
const {
  getThoughtById,
  getThoughts,
  createThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtById);

module.exports = router;