const {Thought, User} = require('../models');


module.exports = {
// to do : get - to get all thoughts
async getThoughts(req, res) {
try {
    const thoughts = await Thought.find();
    res.json(thoughts);
} catch (err) {
    res.status(500).json(err)
}
},

// to do : get - to get a single thougth by its _id
async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// to do : post - to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created the thought');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// to do: put - to update a thought by its _id
// to do: delete - to remove a thought by its _id

///api/thoughts/:thoughtId/reactions
// to do: post - to create a reaction stored in a single thought's reactions array field
// to do: delete - to pull and remove a reaction by the reaction's reactionId value




//closing bracket for exports:
}