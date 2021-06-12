const Profile = require("../models/profile");

exports.getAllUserInfo = (req, res) => {
  Profile.find()
    .populate("user", ["name", "email", "_id"])
    .populate("profile.user", ["name", "email", "_id"])
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error: "Error in finding the User Profile",
        });
      }
      return res.status(200).json({
        profile: result,
      });
    });
};

exports.setUserProfile = (req, res, next, id) => {
  Profile.findOne({ user: id })
    .populate("user", ["name", "email", "_id"])
    .then((userProfile) => {
      if (!userProfile) {
        return res.status(400).json({
          message: "No User Found",
          error: true,
        });
      }

      userProfile.password = undefined;

      req.user = userProfile;
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Error in finding user profile",
        error: true,
      });
    });
};

exports.getUserProfileInfo = (req, res) => {
  //If req.user_id = undefined
  if (!req.user) {
    return res.status(400).json({
      error: true,
      message: "No user profile found",
    });
  }

  return res.status(200).json({
    details: req.user,
    error: false,
    message: "user profile found",
  });
};

exports.updateUserProfile = (req, res) => {
  Profile.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    (error, userProfile) => {
      if (error) {
        return res.status(400).json({
          message: "Error in updating user profile",
          error: true,
        });
      }
      return res.status(200).json({
        message: "Profile Updated Successfull",
        error: false,
      });
    }
  );
};
