
const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }
});

module.exports = mongoose.model('SubSubCategory', subSubCategorySchema);
