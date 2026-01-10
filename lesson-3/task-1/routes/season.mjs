import { Router } from 'express'
import { getSeason } from "../utils/dateUtils.mjs";

const router = Router()

router.get('/season', (req, res) => {
    
res.render('dateInfo', { title: 'Season', content: getSeason() })
})

export default router