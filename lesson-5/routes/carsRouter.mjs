import { Router } from 'express'
import CarController from "../controllers/carController.mjs";

const router = Router()

router.get('/cars', CarController.getAllCars)
router.get('/car/:id', CarController.getCarById)

router.post('/update-car/:id', CarController.updateCar)
router.get('/update-car/:id', CarController.getCarForm)

router.get('/create-car', CarController.getCarForm)
router.post('/create-car', CarController.createCar)

router.delete('/cars', CarController.deleteCar)

export default router