// const mongoose = require('mongoose');

// const subCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
// });

// module.exports = mongoose.model('SubCategory', subCategorySchema);

// subCategoryModel.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subsubcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSubCategory' }],
  mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);

