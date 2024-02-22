const express = require('express');
const { createSubSubcategory, getAllSubSubcategories, getSubSubcategoryById, deleteSubSubCategory } = require('../controllers/subSubCategoryCtrl');
const router = express.Router();



// Create a new subcategory
router.post('/create-sub-subcategory', createSubSubcategory);

// Get all 
router.get('/', getAllSubSubcategories);

// Get a single subcategory by ID
router.get('/:id', getSubSubcategoryById);

// Delete a subcategory by ID
router.delete('/:id', deleteSubSubCategory);

// // Update a subcategory by ID
// router.put('/:id', deleteSubSubCategory);

module.exports = router;

