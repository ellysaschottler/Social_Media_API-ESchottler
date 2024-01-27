const {User, Thought} = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


// to do: put - to update a user by its _id
// to do : delete - to remove a user by its _id, bonus - remove a user's thoughts when deleted
async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    const thought = await Thought.findOneAndUpdate(
      { users: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thoughts to delete' });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},


// to do post - add a new friend to a user's friend list
// to do delete - remove a friend from a user's friend list


//end bracket for exports
};