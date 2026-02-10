import DataFileManager from "../utils/DataFileManager.mjs";

class Car {
    static loadCarsList() {
        try {
            return DataFileManager.loadData()
        } catch (error) {
            throw new Error('Не вдалось заватажити список')
        }
    }
    static addNewCar(car) {
        try {
            DataFileManager.addItem({ id: new Date().getTime(), ...car })
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static getCarById(id) {
        try {
            return DataFileManager.getItemById(id)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static updateCar(id, carData) {
        try {
            DataFileManager.updateItemById(id, carData)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static deleteCarById(id) {
        try {
            DataFileManager.deleteItemById(id)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
}

export default Car