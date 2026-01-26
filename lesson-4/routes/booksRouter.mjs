import { Router } from 'express'
import BookController from "../controllers/bookController.mjs";

const router = Router()

router.get('/books', BookController.getAllBooks)
router.get('/book/:id', BookController.getBookById)

router.post('/update-book/:id', BookController.updateBook)
router.get('/update-book/:id', BookController.getBookForm)

router.get('/create-book', BookController.getBookForm)
router.post('/create-book', BookController.createBook)

router.delete('/books', BookController.deleteBook)

export default router