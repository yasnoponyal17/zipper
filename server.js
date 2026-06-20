const express = require('express')
const Busboy = require('busboy')
const zlib = require('zlib')
const fs = require('fs')
const { promisify } = require('util')
const gzipAsync = promisify(zlib.gzip)

const app = express()

app.get('/login', function (req, res) {
    res.send('1155290')
})

app.post('/zipper', function (req, res) {
    const busboy = Busboy({ headers: req.headers })
    const chunks = []

    busboy.on('file', (fieldname, file, info) => {
        file.on('data', (data) => {
            chunks.push(data)
        })
    })

    busboy.on('finish', async () => {
        const inputBuffer = Buffer.concat(chunks)
        try {
            const compressedBuffer = await gzipAsync(inputBuffer, { level: 9 })
            res.setHeader('Content-Type', 'application/gzip')
            res.send(compressedBuffer)
        } catch (error) {
            res.status(500).send('Ошибка сжатия')
        }
    })

    req.pipe(busboy)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен: http://localhost:3000')
})