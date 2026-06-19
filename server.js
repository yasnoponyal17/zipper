const express = require('express')
const multer = require('multer')
const zlib = require('zlib')
const fs = require('fs')
const { promisify } = require('util');
const gzipAsync = promisify(zlib.gzip);
const upload = multer({ dest: 'uploads/' })

const app = express()

const uploadFile = upload.any()

app.get('/login', function (req, res) {
    res.send('1155290')
})

app.post('/zipper', uploadFile, async function (req, res, next) {
    console.log('req.files:', req.files)

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Файл не получен')
    }

    const file = req.files[0]

    try {
        const inputBuffer = fs.readFileSync(file.path)
        const compressedBuffer = await gzipAsync(inputBuffer, { level: 9 })
        res.setHeader('Content-Type', 'application/gzip')
        res.send(compressedBuffer)
    } catch (error) {
        console.error('Ошибка:', error)
        res.status(500).send('Ошибка сжатия')
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен: http://localhost:3000')
})