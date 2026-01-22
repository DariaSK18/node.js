import { Router } from 'express'
import BookController from "../controllers/bookController.mjs";

const router = Router()

router.get('/books', BookController.getAllBooks)
router.get('/book/:id', BookController.getBookById)
router.post('/update-book', BookController.updateBook)
router.post('/create-book', BookController.createBook)
router.delete('/books', BookController.deleteeBook)

export default router