import { Router } from 'express'

import homeRouter from "./home.mjs";
import seasonRouter from "./season.mjs";
import dayRouter from "./day.mjs";
import timeRouter from "./time.mjs";

const router = Router()

router.use(timeRouter, seasonRouter, dayRouter, homeRouter)

export default router