const { User } = require("../models/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");
const updateUser = async (req, res, next) => {
  //check id of user
  // console.log(req.user);
  // if (req.body.id !== req.params.userId) {
  //     return next(errorHandler('403', 'You Are Not Allowed To Update This User'));
  // }
  //password validation
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler("400", "Password must be at least 6 characters")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  //username length validation
  if (req.body.username) {
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(errorHandler("400", "The Username must be between 7 and 20"));
    }
  }
  //username space validation
  // if (req.body.username.includes(' ')) {
  //     return next(errorHandler(400, 'Username cannot contain spaces'));
  //   }
  //username lowercase validation
  // if (req.body.username!== req.body.username.toLowerCase()) {
  //   return next(errorHandler(400, "Username must be lowercase"));
  // }
  //username special char validation
  // if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
  //   return next(
  //     errorHandler(400, "Username can only contain letters and numbers")
  //   );
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};
//sign out function
const signout=async(req, res ,next)=>{
  try {
    res.clearCookie("acess_token").status(200).json("user has been successfully signout")
  } catch (error) {
    next(error)
  }
}

//fetch all users
const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 7;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
//delete user code logic
module.exports = { updateUser, deleteUser ,signout , getUsers};
