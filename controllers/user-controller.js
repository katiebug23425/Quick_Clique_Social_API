const { User } = require("../models");

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
      const userData = await User.findOne({ _id: params.userId });
      if (!userData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      return res.json(userData);
    } catch (err) {
      return res.status(500).json(err);
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
  async updateUserById({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: params.userId }, body, {
        new: true,
        runValidators: true,
      });
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // delete a user by id
  async deleteUserById({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.userId });
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json({ message: "User deleted successfully!", userData });
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
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // remove a friend from a user's friend list
async removeFriend({ params }, res) {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    );

    if (!dbUserData) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    // Check if friend was removed
    const removed = dbUserData.friends.indexOf(params.friendId) === -1;

    // Return response with appropriate message
    if (removed) {
      res.json({ message: "Friend removed successfully!", dbUserData });
    } else {
      res.json({ message: "Friend not found or not removed.", dbUserData });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred while removing the friend.", error: err });
  }
},
};

module.exports = userController;
