import Book from "../models/bookModel.mjs";

class BookController {
    static getAllBooks(req, res) {
        try {
            const { title, year } = req.query
            let booksList = Book.loadBooksList()

            if (title) { booksList = booksList.filter(book => book.title.toLowerCase().includes(title.toLowerCase())) }
            if (year) { booksList = booksList.filter(book => Number(book.year) === Number(year))}
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
            const id = req.params.id
            const bookData = req.body
            // console.log('----book data', bookData, '----id', id);
            Book.updateBook(id, bookData)
            res.redirect('/books')
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error updating book',
                error
            })
        }
    }
    static getBookForm(req, res) {
        try {
            const book = req.params.id ? Book.getBookById(req.params.id) : {}
            const backUrl = req.get('referer') || '/'
            res.render('books/bookForm', {
                title: 'Book Form',
                book,
                backUrl
            })
        } catch (error) {
            res.status(500).render('error', {
                message: 'Error loading form',
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
    static deleteBook(req, res) {
        try {
            const id = req.body.id
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