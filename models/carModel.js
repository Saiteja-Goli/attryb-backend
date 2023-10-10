const mongoose = require("mongoose");

// Define the car schema
const carSchema = new mongoose.Schema({
  modelName: String,
  year: String,
  listPrice: Number,
  mileage: Number,
  powerBHP: Number,
  maxSpeed: Number,
  imageUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Create the Car model
const carModel = mongoose.model("Car", carSchema);

module.exports = carModel;
