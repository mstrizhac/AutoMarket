const User = require("../storage/models/userSchema");
const jwt = require("jsonwebtoken");
const Car = require('../storage/models/carSchema');
const {uploadCar} = require('../storage/s3Manager');
const addCar = async (req, res) => {
    const {name, price, mileage, year, fuel, city, description, condition, transmission} = req.body;
    if (!name || !price || !year) {
        return res.status(400).json({message: 'Fill required fields'});
    }

    let photos = []
    if (req.files) {
        if (req.files.length > 6) {
            return res.status(400).json({message: 'Cant load more than 6 images'});
        }

        const uploadPromises = req.files.map(f => {
            return uploadCar(f)
        });
        photos = await Promise.all(uploadPromises);
    }

    const newCar = new Car({
        name,
        user: req.user.email,
        price: Number(price),
        mileage: Number(mileage),
        year: Number(year),
        fuel,
        city,
        description,
        photos, // Url array
        condition,
        transmission
    });
    await newCar.save();
    res.status(200).json();
}

const getAllCars = async (req, res) => {
    const cars = await Car.find()
        .sort({createdAt: -1})

    res.status(200).json(cars);
};

const getCarsByUserEmail = async (req, res) => {
    const {email} = req.params;
    const cars = await Car.find({user: email}).sort({createdAt: -1});
    res.status(200).json(cars);
};

const deleteCar = async (req, res) => {
    const {id} = req.params;

    const car = await Car.findById(id);

    if (!car) {
        return res.status(404).json({message: 'Car not found'});
    }

    if (car.user !== req.user.email) {
        return res.status(403).json({message: 'You dont have permission to delete the car'});
    }

    await Car.findByIdAndDelete(id);

    res.status(200).json({message: 'Car deleted successfully'});
};

module.exports = {addCar, getAllCars, getCarsByUserEmail, deleteCar};
