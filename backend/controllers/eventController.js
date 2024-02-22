const Store = require("../models/storeModel");
const Event = require("../models/eventModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const SubCategory = require("../models/subCategory");
const SubSubCategory = require("../models/subSubCategory");
const MainCategory = require("../models/mainCategory");

const createEvent = catchAsyncErrors(async (req, res, next) => {
  const { category, subcategory, subSubcategory } = req.body;
  console.log(category, subcategory, subSubcategory)
  try {
    const storeId = req.body.storeId;
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(400).json({ message: "Store Id is invalid!" });
    } else {
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "events",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const existingMainCategory = await MainCategory.findById(category);
      const existingSubCategory = await SubCategory.findById(subcategory);
      const existingSubSubCategory = await SubSubCategory.findById(subSubcategory);

      if (!existingMainCategory || !existingSubCategory || !existingSubSubCategory) {
          return res.status(400).json({ message: "Invalid category, subcategory, or child category ID" });
      }

      const eventData = {
        name: req.body.name,
        description: req.body.description,
        mainCategory: existingMainCategory, 
        subCategory: existingSubCategory, 
        subSubCategory: existingSubSubCategory, 
        brand: req.body.brand,
        model: req.body.model,
        size:  req.body.size,
        color: req.body.color,
        originalPrice: req.body.originalPrice,
        discountPrice: req.body.discountPrice,
        stock: req.body.stock,
        start_Date: req.body.start_Date,
        finish_Date: req.body.finish_Date,
        storeId: storeId,
        store: store,
        images: imagesLinks,
      };

      const event = await Event.create(eventData);
      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});


// get all events of a store
const getAllStoreEvents = catchAsyncErrors(async (req, res) => {
  try {
    const events = await Event.find({ storeId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

// delete event of a store
const deleteEvent = catchAsyncErrors(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    console.log(event);
    if (event) {
      await event.remove();
    }
    res.status(201).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    throw new Error("Product not found");
  }
});

// get all events of website
const getAllEvents = catchAsyncErrors(async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = {
  createEvent,
  getAllStoreEvents,
  deleteEvent,
  getAllEvents,
};
