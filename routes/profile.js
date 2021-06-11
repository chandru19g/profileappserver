// Import Dependencies
const app = require("express");
const router = app.Router();

// Controllers
const {
  getAllUserInfo,
  setUserProfile,
  getUserProfileInfo,
  updateUserProfile,
} = require("../controllers/profile");

router.get("/profile/all", getAllUserInfo);

router.param("userId", setUserProfile);

router.get("/profile/:userId", getUserProfileInfo);

router.put("/profile/update/:userId", updateUserProfile);

module.exports = router;
