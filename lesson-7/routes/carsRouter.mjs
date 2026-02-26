import { Router } from 'express'
import CarController from "../controllers/carController.mjs";
import uploadImg from "../middleware/uploadImg.mjs";
import { filterValidationMiddleware, formValidationMiddleware } from "../middleware/validationMiddleware.js";
import { filterValidationSchema, formValidationSchema } from "../validation/validationSchema.js";

const router = Router()

router.get('/cars', filterValidationMiddleware(filterValidationSchema), CarController.getAllCars)
router.get('/car/:id', CarController.getCarById)

router.post('/update-car/:id',
uploadImg.array('images', 10), 
formValidationMiddleware(formValidationSchema), CarController.updateCar)
router.get('/update-car/:id', CarController.getCarForm)

router.get('/create-car', CarController.getCarForm)
router.post('/create-car', uploadImg.array('images', 10), formValidationMiddleware(formValidationSchema), CarController.createCar)

router.delete('/cars', CarController.deleteCar)

export default router