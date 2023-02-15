const handleHttpError = (res, message = 'Algo sucedió', err = "", code = 403) => {
    return res.status(code).json({
        message: message,
        error: err
    })
}
module.exports = {handleHttpError}