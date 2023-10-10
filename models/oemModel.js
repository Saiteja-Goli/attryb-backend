const mongoose = require("mongoose");

// Define the car schema
const OEM_SpecsSchema = new mongoose.Schema({
    modelName: String,
    year: Number,
    listPrice: Number,
    availableColors: [String],
    mileage: Number,
    powerBHP: Number,
    maxSpeed: Number,
});

// Create the Car model
const OEM_SpecsModel = mongoose.model("oem_specs", OEM_SpecsSchema);

module.exports = OEM_SpecsModel;
