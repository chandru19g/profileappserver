//Import Dependencies
const bcrypt = require("bcrypt");
const profile = require("../models/profile");

//Import Models
const User = require("../models/user");

let saltRounds = 10;

// @type POST
// @route /createAccount
// @desc creating new Account
// @access PUBLIC
exports.createAccount = (req, res) => {
  // Find if any other user uses the same email
  User.findOne({ email: req.body.email }, (err, prevUser) => {
    if (err || prevUser) {
      return res.status(400).json({
        message: "Email Id Already Registered",
        error: true,
      });
    }

    //Hashing Password
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      // Store hash in your Password
      req.body.password = hash;

      // Create new User and Save it to DB
      let newUser = new User(req.body);

      // Attempt to save
      newUser
        .save()
        .then((newUser) => {
          let userProfile = new profile({
            user: newUser._id,
            age: "",
            degree: "",
            profession: "",
            phone_number: "",
            company: "",
          });
          newUser.password = undefined;
          userProfile
            .save()
            .then(() =>
              res.status(200).json({
                message: "New Account Created Successfully",
                error: false,
                user: newUser,
              })
            )
            .catch((error) =>
              res.status(400).json({
                message: error,
                error: true,
              })
            );
        })
        .catch((error) => {
          res.status(400).json({
            message: "Error in creating Account",
            error: true,
          });
        });
    });
  });
};

// @type POST
// @route /login
// @desc logging in
// @access PUBLIC
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, prevUser) => {
    if (err) {
      return res.status(400).json({
        message: "Error in Logging in",
        error: true,
      });
    }

    // If no email is registered
    if (!prevUser) {
      return res.status(400).json({
        message: "No Account has been created with this Email-Id",
        error: true,
      });
    }

    //Comparing password with hashed password in DB
    bcrypt.compare(req.body.password, prevUser.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({
          message: "Mismatch Password or Email-id",
          error: true,
        });
      }

      // Hide Password before sending
      prevUser.password = undefined;

      // Login Successful
      return res.status(200).json({
        message: "Login Successfull",
        error: false,
        user: prevUser,
      });
    });
  });
};
