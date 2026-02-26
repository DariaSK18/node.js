import express from 'express'
import connectDB from './db/db.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.mjs'
import { __dirname, __filename } from "./settings.mjs";
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

connectDB()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

app.use('/', indexRouter) // catch 404 and forward to error handler

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// error handler
app.use(errorHandler)
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//     // render the error page
//     res.status(err.status || 500)
//     res.render('error')
// })
export default app