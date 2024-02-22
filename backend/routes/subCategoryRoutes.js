const express = require('express');
const router = express.Router();
const {
    createSubCategory, 
    getSubCategories, 
    getSubCategoryById, 
    updateSubCategory, 
    deleteSubCategory
} = require('../controllers/subCategoryController')


// Create a new subcategory
router.post('/create-subcategory', createSubCategory);

// Get all 
router.get('/', getSubCategories);

// Get a single subcategory by ID
router.get('/:id', getSubCategoryById);

// Update a subcategory by ID
router.put('/:id', updateSubCategory);

// Delete a subcategory by ID
router.delete('/:id', deleteSubCategory);

module.exports = router;

