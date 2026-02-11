import Car from "../models/carModel.mjs";
export function formValidationMiddleware(validationSchema) {
    return (req, res, next) => {
        const id = req.params.id
        const result = validationSchema.safeParse(req.body)
        if (!result.success) {
            let img = []
            if (id) {
                const car = Car.getCarById(id)
                img = car?.images || []
            }
            return res.render('cars/carForm', {
                title: 'Car Form',
                car: { ...req.body, id, images: img },
                errors: result.error.issues.map(err => err.message),
            })
        }
        req.validatedData = result.data
        next()
    }
}