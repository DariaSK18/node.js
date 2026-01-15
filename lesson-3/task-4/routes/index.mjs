import { Router } from 'express'
import ProducsRouter from "./products.mjs";

const router = Router()

router.use(ProducsRouter)

router.get('/', (req, res) => {
res.render('index', { title: 'Express' })
})

export default router