const express = require("express");
const authentication = require("../middleware/authentication");
const inventoryModel = require("../models/inventoryModel");
const inventoryRouter = express.Router();

// POST route to create a new inventory item
inventoryRouter.post("/post", authentication, async (req, res) => {
  const {
    carId,
    carTitle,
    carImage,
    registrationPlace,
    previousBuyers,
    accidentsReported,
    kilometersOnOdometer,
    majorScratches,
    originalPaint,
  } = req.body;

  req.body.userId = req.user._id;
  try {
    // Create a new inventory item based on the request body
    const newInventory = new inventoryModel(req.body);

    // Save the new inventory item to the database
    const savedInventory = await newInventory.save();

    // Respond with the saved inventory item as JSON
    res.status(201).json(savedInventory);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding inventory." });
  }
});

//GET route
inventoryRouter.get("/get", authentication, async (req, res) => {
  try {
    const myCars = await inventoryModel.find({ userId: req.user._id });
    res.status(200).json(myCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving cars" });
  }
});

//GET Honda
inventoryRouter.get("/getByTitle/:title", authentication, async (req, res) => {
  try {
    const title = req.params.title;
    const hondaCars = await inventoryModel.find({
      carTitle: title, // Filter by car title
    });
    res.status(200).json(hondaCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving Honda cars" });
  }
});
//Delete Route
inventoryRouter.delete("/delete/:id", authentication, async (req, res) => {
  try {
    const car = await inventoryModel.findOneAndDelete({
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

//Edit Route
inventoryRouter.put("/edit/:id", authentication, async (req, res) => {
  try {
    const {
      carImage,
      carTitle,
      kilometersOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
    } = req.body;
    const updatedCar = await inventoryModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        carImage,
        carTitle,
        kilometersOnOdometer,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
      },
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

module.exports = inventoryRouter;
