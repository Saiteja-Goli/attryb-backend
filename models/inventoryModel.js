const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "oem_specs",
  },
  carImage: String,
  carTitle: String,
  kilometersOnOdometer: { type: Number },
  majorScratches: { type: Boolean },
  originalPaint: { type: Boolean },
  accidentsReported: { type: Number },
  previousBuyers: { type: Number },
  registrationPlace: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const inventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = inventoryModel;
