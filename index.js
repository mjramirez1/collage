const express = require('express')
const expressFileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

// Server ON
app.listen(3000)
console.log('server ON http://localhost:3000')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static public
app.use('/', express.static('public'))

// Restricciones de archivo
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido ',
}))

//Rutas HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html')
})

app.get('/collage', (req, res) => {
    res.sendFile(__dirname + '/collage.html')
})

// Ruta post escribe imagen y entrega posición
app.post('/imagen', (req, res) => {
    console.log(req.body)
    const { target_file } = req.files
    const { posicion } = req.body
    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        //res.send('Archivo cargado con exito')
        res.redirect('/collage')

    })
})

// Ruta get elimina imagen
app.get('/deleteImg/:nombre', (req, res) => {
    const { nombre } = req.params
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
        //res.send(`Archivo ${nombre} eliminado con éxito`) - Mensaje para mostrar archivo eliminado
        res.redirect('/collage')
    })
})
