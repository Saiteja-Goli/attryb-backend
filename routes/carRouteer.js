const express = require("express");
const authentication = require("../middleware/authentication");
const carModel = require("../models/carModel");

const carRouter = express.Router();

// Handle the GET request to get all cars by user ID
carRouter.get("/get", authentication, async (req, res) => {
  try {
    const cars = await carModel.find({ userId: req.user._id });
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving cars" });
  }
});

// Handle the POST request to add a car
carRouter.post("/create", authentication, async (req, res) => {
  try {
    const {
      modelName,
      year,
      listPrice,
      mileage,
      powerBHP,
      maxSpeed,
      imageUrl,
    } = req.body;
    req.body.userId = req.user._id;
    console.log(req.body);
    const newCar = new carModel(req.body);
    await newCar.save();
    res.status(200).json({ message: "Car Added Successfully", car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding car" });
  }
});

//delete
// Handle the DELETE request to delete a car by ID
carRouter.delete("/delete/:id", authentication, async (req, res) => {
  try {
    const car = await carModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting car" });
  }
});

// Handle the PUT request to update a car by ID
carRouter.put("/edit/:id", authentication, async (req, res) => {
  try {
    const {
      modelName,
      year,
      listPrice,
      mileage,
      powerBHP,
      maxSpeed,
      imageUrl,
    } = req.body;
    const updatedCar = await carModel.findOneAndReplace(
      { _id: req.params.id },
      { modelName, year, listPrice, mileage, powerBHP, maxSpeed, imageUrl,userId:req.user._id },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating car" });
  }
});

module.exports = carRouter;
