const express = require('express') 
const {json} = require('express') 
const router = require('./routes/index.js')
const { PORT } = require('./config/config.js')
const { handleHttpError } = require('./utils/handleError.js')
const dbConnect = require('./config/mongo.js')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(json())
app.use(express.static("storage"))

app.use('/api', router)
app.use(function(req, res) {
    handleHttpError(res, "No se encontró un endpoint para esa ruta", 404);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
dbConnect()