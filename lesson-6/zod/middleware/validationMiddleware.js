import Car from "../models/carModel.mjs";
import { currentYear } from "../utils/getFullYear.mjs";

export function formValidationMiddleware(validationSchema) {
    return (req, res, next) => {
        const id = req.params.id
        const result = validationSchema.safeParse(req.body)
        if (!result.success) {
            console.log(result.error.issues);
            let img = []
            if (id) {
                const car = Car.getCarById(id)
                img = car?.images || []
            }
            return res.render('cars/carForm', {
                title: 'Car Form',
                car: { ...req.body, id, images: img },
                errors: result.error.issues,
            })
        }
        req.validatedData = result.data
        next()
    }
}

export function filterValidationMiddleware(validationSchema) {
    return (req, res, next) => {
        const result = validationSchema.safeParse(req.query)
        if (!result.success) {
            // console.log(result.error.issues);
            
            const carsList = Car.loadCarsList()
            res.render('cars/carsList', {
                title: 'Cars List',
                cars: carsList,
                filteredList: carsList,
                maxYear: currentYear,
                errors: result.error.issues.map(err => err.message),
            })
        }
        req.validatedData = result.data
        next()
    }
}