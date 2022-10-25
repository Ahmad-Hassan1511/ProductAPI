const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

productModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productModel);
