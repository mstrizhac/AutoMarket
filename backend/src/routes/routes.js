const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const carController = require("../controllers/carController");
const {multerUpload} = require("../storage/s3Manager");
const {authenticateToken} = require("../middlewares/auth");

router.post('/users/login', userController.login);
router.post('/users/register', userController.register);
router.post('/users/verify', userController.verify);
router.get('/users/user:email', userController.getUserByEmail);

router.post('/listing/add-car', authenticateToken, multerUpload.array('photos', 6), carController.addCar);
router.get('/listing/cars', carController.getAllCars);
router.get('/listing/cars:email', carController.getCarsByUserEmail);
router.delete('/listing/delete:id', authenticateToken, carController.deleteCar);

module.exports = router;