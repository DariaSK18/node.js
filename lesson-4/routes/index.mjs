import { Router } from 'express'
import booksRouter from "./booksRouter.mjs";

const router = Router()

router.use(booksRouter)

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

export default router