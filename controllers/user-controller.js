const { User } = require('../models');

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


// get one user by id
async getUserById({ params }, res) {
  try {
    const userData = await User.findOne({ _id: params.id });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
},


// create a user
async createUser({ body }, res) {
  try {
    const userData = await User.create(body);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
},

// update a user by id
async updateUser({ params, body }, res) {
  try {
    const userData = await User.findOneAndUpdate({ _id: params.id },
      body, { new: true, runValidators: true });  
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
},

// delete a user by id
async deleteUser({ params }, res) {
  try {
    const userData = await User
      .findOneAndDelete({ _id: params.id });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
},

// add a friend to a user's friend list
async addFriend({ params }, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    );
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
},

// remove a friend from a user's friend list
async deleteFriend({ params }, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    );
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
}
};

module.exports = userController;







