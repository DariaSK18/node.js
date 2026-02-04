import { Router } from 'express'
import CarController from "../controllers/carController.mjs";
import uploadImg from "../middleware/uploadImg.mjs";

const router = Router()

router.get('/cars', CarController.getAllCars)
router.get('/car/:id', CarController.getCarById)

router.post('/update-car/:id',
uploadImg.array('images', 10), CarController.updateCar)
router.get('/update-car/:id', CarController.getCarForm)

router.get('/create-car', CarController.getCarForm)
router.post('/create-car', uploadImg.array('images', 10), CarController.createCar)

router.delete('/cars', CarController.deleteCar)

export default router