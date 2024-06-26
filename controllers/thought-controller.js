const { Thought, User, Reaction } = require("../models");

const ThoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;

      // Create the new thought
      const newThought = await Thought.create({
        thoughtText,
        username,
      });

      // Push the created thought's _id to the associated user's thoughts array field
      await User.findOneAndUpdate({
        username: username,
      }, {
        $push: { thoughts: newThought._id },
      });

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Reaction not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
          "reactions.reactionId": req.params.reactionId,
        },
        { $set: { "reactions.$.reactionBody": req.body.reactionBody } },
        { runValidators: true, new: true }
      );

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Reaction not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Reaction not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// Export ThoughtController
module.exports = ThoughtController;
