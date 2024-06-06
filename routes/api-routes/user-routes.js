//imports
const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Define the routes for GET and POST all Users
router.route("/").get(getAllUsers).post(createUser);

// GET user id, PUT update user id and DELETE user by id
router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// POST add friend and DELETE remove Friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
// Export the router
module.exports = router;
