import Car from "../models/carModel.mjs";
import { currentYear } from "../utils/getFullYear.mjs";
import { deleteFileFromDir } from "../utils/deleteFile.mjs";

class CarController {
    static getAllCars(req, res) {
        try {
            const { make, model, minYear, maxYear, price, fuelType } = req.query
            const carsList = Car.loadCarsList()
            let filteredList = carsList
            if (make && make !== 'all') { filteredList = filteredList.filter(car => car.make.toLowerCase().includes(make.toLowerCase())) }
            if (model) { filteredList = filteredList.filter(car => car.model.toLowerCase().includes(model.toLowerCase())) }

            if (minYear) { filteredList = filteredList.filter(car => Number(car.year) >= Number(minYear)) }
            if (maxYear) { filteredList = filteredList.filter(car => Number(car.year) <= Number(maxYear)) }

            if (price) { filteredList = filteredList.filter(car => Number(car.price) <= Number(price)) }

            if (fuelType) {
                if (Array.isArray(fuelType)) {
                    filteredList = filteredList.filter(car => fuelType.some(type => car.fuelType.toLowerCase() === type.toLowerCase()))
                }
                else {
                    filteredList = filteredList.filter(car => car.fuelType.toLowerCase().includes(fuelType.toLowerCase()))
                }
            }
            res.render('cars/carsList', {
                title: 'Cars List',
                cars: carsList,
                filteredList: filteredList,
                maxYear: currentYear
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading cars',
                error
            })
        }
    }
    static getCarById(req, res) {
        try {
            const id = req.params.id
            const car = Car.getCarById(id)
            res.render('cars/carDetail', {
                title: 'Car Detail',
                car,
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading car',
                error
            })
        }
    }
    static updateCar(req, res) {
        try {
            const id = req.params.id
            const carData = req.body
            console.log('---req.files', req.files.length);
            // console.log('---carData.images', carData.images);
            if (req.files.length > 0) {
                const car = Car.getCarById(id)
                if (car.images) {
                    car.images.forEach(img => deleteFileFromDir('uploads', img))
                }
                carData.images = []
                req.files.forEach(file => carData.images.push(file.filename))
            }
            // console.log('---carData', carData);
            Car.updateCar(id, carData)
            res.redirect('/cars')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error updating car',
                error
            })
        }
    }
    static getCarForm(req, res) {
        try {
            const car = req.params.id ? Car.getCarById(req.params.id) : {}
            const backUrl = req.get('referer') || '/'
            res.render('cars/carForm', {
                title: 'Car Form',
                car,
                backUrl
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading form',
                error
            })
        }
    }
    static createCar(req, res) {
        try {
            const carData = req.body
            // console.log(req.files, '----req');
            if (req.files) {
                carData.images = []
                req.files.forEach(file => carData.images.push(file.filename))
            }
            // console.log('----carData', carData);
            Car.addNewCar(carData)
            res.redirect('/cars')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error creating car',
                error
            })
        }
    }
    static deleteCar(req, res) {
        try {
            // console.log('---del car controller');
            const id = req.body.id
            const car = Car.getCarById(id)
            // console.log('---car', car);
            if (car.images) {
                // console.log('---car.images', car.images);
                car.images.forEach(img => {
                    //    console.log('---img', img);
                    deleteFileFromDir('uploads', img)
                })
            }
            Car.deleteCarById(id)
            res.status(204).end()
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error deleting car',
                error
            })
        }
    }
}

export default CarController