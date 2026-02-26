import { Router } from 'express'
import CarController from "../controllers/carController.mjs";
import uploadImg from "../middleware/uploadImg.mjs";
import FormValidator from "../utils/validationSchema.js";
import { checkSchema } from 'express-validator';

const router = Router()

router.get('/cars', FormValidator.filterValidationChain, CarController.getAllCars)
router.get('/car/:id', CarController.getCarById)

// --- chain validator ---
router.post('/update-car/:id', uploadImg.array('images', 10), FormValidator.formValidationChain, CarController.updateCar)

// --- schema validation ---
// router.post('/update-car/:id',
// uploadImg.array('images', 10), checkSchema(FormValidator.formValidationSchema), CarController.updateCar)

router.get('/update-car/:id', CarController.getCarForm)

router.get('/create-car', CarController.getCarForm)

// --- chain validator ---
router.post('/create-car', uploadImg.array('images', 10), FormValidator.formValidationChain, CarController.createCar)

// --- schema validation ---
// router.post('/create-car', uploadImg.array('images', 10), checkSchema(FormValidator.formValidationSchema), CarController.createCar)

router.delete('/cars', CarController.deleteCar)

export default router