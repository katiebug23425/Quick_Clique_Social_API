// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThoughtById,
    updateThoughtById,
    createReaction,
    deleteReaction,
    updateReaction,
} = require('../../controllers/thought-controller');

// Define the routes for GET and POST all Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Define the routes for GET, PUT and DELETE Thoughts
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThoughtById);

// Define the route for POST & PUT reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction).put(updateReaction);

// Define the route for DELETE reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// Export the router
module.exports = router;

