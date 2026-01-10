import { Router } from 'express'
import { getTime } from "../utils/dateUtils.mjs";

const router = Router()

router.get('/time', (req, res) => {
    
res.render('dateInfo', { title: 'Time of the day', content: getTime() })
})

export default router