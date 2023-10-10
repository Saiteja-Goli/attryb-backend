const express = require("express");
const inventoryModel = require("../models/inventoryModel");
const secHandCarRouter = express.Router();

// GET route to retrieve all inventory items along with matching OEM data
secHandCarRouter.get("/", async (req, res) => {
  try {
    // Use an aggregation pipeline to perform a lookup and match operation
    const secHandCars = await inventoryModel.aggregate([
      {
        $lookup: {
          from: "oem_specs",
          localField: "carTitle",
          foreignField: "modelName",
          as: "oemData",
        },
      },
      {
        $unwind: "$oemData",
      },
    ]);

    res.json(secHandCars);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching inventory data." });
  }
});

secHandCarRouter.post("/filtercars", async (req, res) => {
  const { filterPrice, filterMileage } = req.body; // Get filter criteria from the request body
  console.log(filterPrice, filterMileage)
  const data = await inventoryModel.find();
  // Perform filtering based on criteria
  const filteredCars = data.filter((car) => {
    if (
      (filterPrice === "asc" && car.oemData.listPrice < 50000) || // Replace with your price filtering condition
      (filterPrice === "desc" && car.oemData.listPrice >= 50000) // Replace with your price filtering condition
    ) {
      return false;
    }
    if (
      (filterMileage === "asc" && car.oemData.mileage >= 100000) || // Replace with your filterMileage filtering condition
      (filterMileage === "desc" && car.oemData.mileage < 100000) // Replace with your mileage filtering condition
    ) {
      return false;
    }
    return true;
  });

  // Send the filtered cars as a response
  res.json(filteredCars);
});
module.exports = secHandCarRouter;
