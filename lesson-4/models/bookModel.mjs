import DataFileManager from "../utils/DataFileManager.mjs";

class Book {
    static loadBooksList() {
        try {
            return DataFileManager.loadData()
        } catch (error) {
            throw new Error('Не вдалось заватажити список')
        }
    }
    static addNewBook(book) {
        try {
            DataFileManager.addItem({ id: new Date().getTime(), ...book })
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static getBookById(id) {
        try {
            return DataFileManager.getItemById(id)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static updateBook(id, bookData) {
        try {
            DataFileManager.updateItemById(id, bookData)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
    static deleteBookById(id) {
        try {
            DataFileManager.deleteItemById(id)
        } catch (error) {
            throw new Error('Операція з даними не пройшла!')
        }
    }
}

export default Book