export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.status || 500)
    if (req.accepts('json')) {

        res.json({ error: err.message || 'Internal Server Error' })
    } else {
        res.render('error', { error: err })
    }
}