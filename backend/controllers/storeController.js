const jwt = require("jsonwebtoken");
const Store = require("../models/storeModel");
const asyncHandler = require("express-async-handler");
const createToken = require("../utils/createToken");
// const sendMail = require("../utils/sendMail");
const cloudinary = require("cloudinary");
const validator = require('validator');
const createStoreToken = require("../utils/storeToken");



const registerStore = async (req, res, next) => {
  console.log(req.body);
  const { name, email, phoneNumber, address, zipCode, password, avatar } =
    req.body;

  try {
    const storeExists = await Store.findOne({ email });
    //Validation
    if (storeExists) {
      throw Error("Email alreday in use for another store");
    }
    if (!validator.isEmail(email)) {
      throw Error("Please enter a valid email");
    }
    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      throw Error("Password is not strong enough: e.g: Test123!");
    }

    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });
    console.log("CLOUDS", myCloud);
    const newStore = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: address,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
    };
    const store = await Store.create(newStore);
    res.status(201).json({
      success: true,
      store,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Log in store
const loginStore = async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.login(email, password);
    if (store) {
      createStoreToken(res, store._id);

      res.status(201).json({
        success: true,
        store,
        // _id: store._id,
        // name: store.name,
        // email: store.email,
        // address: store.address,
        // phoneNumber: store.phoneNumber,
        // role: store.role,
        // zipCode: store.zipCode,
        // createdAt: store.createdAt,
        msg: "Store logged in succcessfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid store data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Log out store
const logoutStore = (req, res) => {
  res.cookie("store_token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ user: {},  msg: "Logged out successfully" });
};

// Get store profile
const getStoreInfo = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).select("-password");
    // console.log("STORE_INFO", store)
    if (store) {
      res.status(201).json({
        success: true,
        store,
      });
    } else {
      res.status(400);
      throw new Error("Invalid store id");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStoreProfile = asyncHandler(async (req, res) => {
  // name, description, address, phoneNumber, zipCode, id
  try {
    const store = await Store.findById(req.body.id);
    
    if (!store) {
      return res.status(500).json({ msg: "Store not found"});
    }

    store.name = req.body.name || store.name;
    store.description = req.body.description || store.description;
    store.address = req.body.address || store.address;
    store.phoneNumber = req.body.phoneNumber || store.phoneNumber;
    store.zipCode = req.body.zipCode || store.zipCode;

    await store.save();
    console.log("STORE:", store)
    res.json({
      success: true,
      store,
      msg: "Store profile updated succesfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const updateStoreAvatar = async (req, res, next) => {
  console.log(req.params.id)
  try {
    let storeExists = await Store.findById(req.params.id);
    if (req.body.avatar !== "") {
      const imageId = storeExists.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      storeExists.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    console.log(storeExists)

    await storeExists.save();

    res.status(200).json({
      success: true,
      store: storeExists,
      msg: "Avarar updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  registerStore,
  loginStore,
  logoutStore,
  getStoreInfo,
  updateStoreProfile,
  updateStoreAvatar
};
