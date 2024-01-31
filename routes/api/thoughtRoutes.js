// to do, add all the routes we create in thoughtController.js

const router = require('express').Router();
const {
  getThoughtById,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router
  .route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

///api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)


module.exports = router;