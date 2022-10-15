const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema(
  {
    name: { type: String },
    imgURL: { type: String },
    price: { type: Schema.Types.Decimal128 },
    quantity: { type: Schema.Types.Number },
    cateogryID: { type: Schema.ObjectId },
  }
);

module.exports = mongoose.model('Product', productModel);
