const express = require('express')
const expressFileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.listen(3000, () => {
    console.log('Server On http://localhost/3000')
})

// Body Parser config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
)
// Ruta a HTML Formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html')
})

// Ruta a HTML collage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/collage.html')
})

app.post("/imagen", (req, res) => {
    console.log(req.body)
    const { target_file } = req.files
    const { posicion } = req.body
    target_file.mv(`${__dirname}/public/img/imagen-${posicion}.jpg`,
        (err) => {
            res.send("Archivo cargado con éxito")
        })
})

