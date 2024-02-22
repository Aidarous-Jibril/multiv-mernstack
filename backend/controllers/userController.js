const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");
const cloudinary = require("cloudinary");
const validator = require("validator");


// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    if (!validator.isEmail(email)) {
      res.status(400);
      throw Error("Please enter a valid email");
    }

    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });

    const newUser = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
    const user = await User.create(newUser);
    if (user) {
      user.token = createToken(res, user._id);
    }
    res.status(201).json({
      success: true,
      user,
      msg: "User registered succcessfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Log in user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      createToken(res, user._id);
      res.status(201).json({
        success: true,
        user,
        msg: "User logged in succesfully!",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Log out user
const logoutUser = (req, res) => {
  // console.log(res.cookie)
  res.cookie("user_token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ user: {},  msg: "Logged out successfully" });
};

//update user prof
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log("USER", req.body);
  const user = await User.findById(req.body.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // const updatedUser = await user.save();
    await user.save();
    res.json({
      success: true,
      user,
      msg: "User profile updated succesfully!",
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

// get user by user-id 
const getUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
console.log("USER", user)
      if (!user) {
        res.status(400).json({ msg: "User doesn't exists" });
      }
      // console.log(user)
      res.status(200).json({
        success: true,
        user,
        msg: "User fetched successfully"
      });
    } catch (error) {
        res.status(500).json({ msg: "User not found" });
    }
  })

// user avatar
const updateUserAvatar = async (req, res, next) => {
  // console.log(req.params.id)
  try {
    let userExists = await User.findById(req.params.id);
    if (req.body.avatar !== "") {
      const imageId = userExists.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      userExists.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    // console.log(userExists)

    await userExists.save();
    // console.log(userExists)

    res.status(200).json({
      success: true,
      user: userExists,
      msg: "Avarar updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// add user address
const addUserAddress =  asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
        res.status(404)
        throw new Error("Address already exists");
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
      msg: "Address added successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// delete user address
const deleteUserAddress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user,  msg: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// update user password
const updateUserPassword = asyncHandler( async (req, res) =>  {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const passwordMatch = await user.comparePassword(req.body.oldPassword);

    if(passwordMatch) {
      res.status(400).json({msg: "Old password is incorrect!"})
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(400).json({msg: "Password doesn't matched with each other!"})
    };

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      msg: "Password updated successfully"
    });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: error.msg });
  }
})


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserAvatar,
  addUserAddress,
  deleteUserAddress,
  getUser,
  updateUserPassword
};
