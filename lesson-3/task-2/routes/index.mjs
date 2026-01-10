import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
res.render('index', { title: 'Home' })
})
router.get('/coffee', (req, res) => {
res.render('coffee', { title: 'Coffee' })
})
router.get('/music', (req, res) => {
res.render('music', { title: 'Music' })
})
export default router