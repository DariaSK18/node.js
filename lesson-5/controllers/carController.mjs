import Car from "../models/carModel.mjs";
import { currentYear } from "../utils/getFullYear.js";

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
                message: 'Error loading books',
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
                message: 'Error loading book',
                error
            })
        }
    }
    static updateCar(req, res) {
        // try {
        //     const id = req.params.id
        //     const bookData = req.body
        //     // console.log('----book data', bookData, '----id', id);
        //     Book.updateBook(id, bookData)
        //     res.redirect('/books')
        // } catch (error) {
        //     res.status(500).render('error', {
        //         message: 'Error updating book',
        //         error
        //     })
        // }
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
            Car.addNewCar(carData)
            res.redirect('/cars')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error creating book',
                error
            })
        }
    }
    static deleteCar(req, res) {
        try {
            const id = req.body.id
            Car.deleteCarById(id)
            res.status(204).end()
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error deleting book',
                error
            })
        }
    }
}

export default CarController