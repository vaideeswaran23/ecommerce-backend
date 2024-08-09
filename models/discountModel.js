const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["percentage", "fixed"], required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
