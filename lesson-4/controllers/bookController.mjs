import Book from "../models/bookModel.mjs";

class BookController {
    static getAllBooks(req, res) {
        const booksList = Book.loadBooksList()
        res.render('books/booksList', {
            books: booksList,
        })
    }
    static getBookById(req, res) {
        const id = req.params.id
        const book = Book.getBookById(id)
        res.render('books/bookDetail', {
            book,
        })
    }
    static updateBook(req, res) {
       
    }
    static createBook(req, res) {
        const bookData = req.body
        Book.addNewBook(bookData)
        res.redirect('/books')
    }
    static deleteeBook(req, res) {
        const id = req.params.id
        Book.deleteBookById(id)
        res.status(204).end()
    }
}

export default BookController