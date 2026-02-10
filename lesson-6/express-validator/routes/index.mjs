import { Router } from 'express'
import carsRouter from "./carsRouter.mjs";

const router = Router()

router.use(carsRouter)

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

export default router