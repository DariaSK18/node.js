import { Router } from 'express'
import { getDay } from "../utils/dateUtils.mjs";

const router = Router()

router.get('/day', (req, res) => {
    
res.render('dateInfo', { title: 'Day', content: getDay() })
})

export default router