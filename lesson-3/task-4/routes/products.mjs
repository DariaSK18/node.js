import { Router } from 'express'
import { products } from "../utils/constants.mjs";

const router = Router()

router.get('/products', (req, res) => {
res.render('products', { title: 'Products', products })
})

router.get('/add-product', (req, res) => {
res.render('add-product', { title: 'Add product' })
})

export default router