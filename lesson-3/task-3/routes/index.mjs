import { Router } from 'express'
import { sites, films, goals } from "../utils/constants.mjs";

const router = Router()
router.get('/', (req, res) => {
    res.render('index', { title: 'Home', user: 'Daria' })
})

router.get('/goals', (req, res) => {
    res.render('goals', { title: 'Goals', goals: goals })
})

router.get('/info/:myLink', (req, res) => {
    const { myLink } = req.params

    let info = null
    if (myLink === 'sites') info = sites
    if (myLink === 'films') info = films
    if (myLink === 'me') info = [{ title: 'My website', description: 'This is info about me' }]

    res.render('info', { title: myLink, info })
})

export default router