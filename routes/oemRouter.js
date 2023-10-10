const express = require("express");
const OEM_SpecsModel = require("../models/oemModel");
const oemRouter = express.Router();

oemRouter.get("/upload", async (req, res) => {
  try {
    // Car data for 10 cars
    const carData = [
      {
        modelName: "Honda",
        model: "Civic",
        year: 2015,
        listPrice: 25000,
        availableColors: ["Red", "Blue", "Black", "White"],
        mileage: 30, // MPG
        powerBHP: 180,
        maxSpeed: 130, // mph
      },
      {
        modelName: "Toyota",
        model: "Corolla",
        year: 2022,
        listPrice: 23000,
        availableColors: ["Silver", "Gray", "White"],
        mileage: 32, // MPG
        powerBHP: 160,
        maxSpeed: 125, // mph
      },
      {
        modelName: "Ford",
        model: "Mustang",
        year: 2022,
        listPrice: 40000,
        availableColors: ["Red", "Blue", "Yellow", "Black"],
        mileage: 25, // MPG
        powerBHP: 450,
        maxSpeed: 160, // mph
      },
      {
        modelName: "Chevrolet",
        model: "Camaro",
        year: 2022,
        listPrice: 38000,
        availableColors: ["Red", "Black", "Yellow"],
        mileage: 22, // MPG
        powerBHP: 455,
        maxSpeed: 165, // mph
      },
      {
        modelName: "BMW",
        model: "X5",
        year: 2022,
        listPrice: 60000,
        availableColors: ["Silver", "White", "Black"],
        mileage: 26, // MPG
        powerBHP: 335,
        maxSpeed: 155, // mph
      },
      {
        modelName: "Audi",
        model: "A4",
        year: 2022,
        listPrice: 42000,
        availableColors: ["Gray", "White", "Black"],
        mileage: 28, // MPG
        powerBHP: 248,
        maxSpeed: 130, // mph
      },
      {
        modelName: "Mercedes-Benz",
        model: "C-Class",
        year: 2022,
        listPrice: 52000,
        availableColors: ["Silver", "Gray", "Black"],
        mileage: 27, // MPG
        powerBHP: 255,
        maxSpeed: 140, // mph
      },
      {
        modelName: "Nissan",
        model: "Altima",
        year: 2022,
        listPrice: 24000,
        availableColors: ["Blue", "Gray", "White"],
        mileage: 31, // MPG
        powerBHP: 188,
        maxSpeed: 120, // mph
      },
      {
        modelName: "Hyundai",
        model: "Elantra",
        year: 2022,
        listPrice: 22000,
        availableColors: ["Silver", "Blue", "Gray"],
        mileage: 33, // MPG
        powerBHP: 147,
        maxSpeed: 115, // mph
      },
      {
        modelName: "Volkswagen",
        model: "Jetta",
        year: 2022,
        listPrice: 26000,
        availableColors: ["Red", "Gray", "White"],
        mileage: 29, // MPG
        powerBHP: 147,
        maxSpeed: 125, // mph
      },
    ];
    // Loop through the carData array and save each car to the database
    for (const carInfo of carData) {
      const car = new OEM_SpecsModel(carInfo);
      console.log(carInfo)
      await car.save();
    }
    res.status(200).json({ message: "Car data uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

oemRouter.get("/download", async (req, res) => {
  try {
    // Retrieve all car data from the database
    const cars = await OEM_SpecsModel.find();

    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = oemRouter;
