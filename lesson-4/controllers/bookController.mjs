import Book from "../models/bookModel.mjs";

class BookController {
    static getAllBooks(req, res) {
        try {
            const booksList = Book.loadBooksList()
            res.render('books/booksList', {
                title: 'Books List',
                books: booksList,
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading books',
                error
            })
        }
    }
    static getBookById(req, res) {
        try {
            const id = req.params.id
            const book = Book.getBookById(id)
            res.render('books/bookDetail', {
                title: 'Books Detail',
                book,
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading book',
                error
            })
        }
    }
    static updateBook(req, res) {
        try {
            const id = req.params
            const bookData = req.body
            Book.updateBook(id, bookData)
            res.redirect('/books')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error updating book',
                error
            })
        }
    }
    static createBook(req, res) {
        try {
            const bookData = req.body
            Book.addNewBook(bookData)
            res.redirect('/books')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error creating book',
                error
            })
        }
    }
    static deleteeBook(req, res) {
        try {
            const id = req.params.id
            Book.deleteBookById(id)
            res.status(204).end()
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error deleting book',
                error
            })
        }
    }
}

export default BookController