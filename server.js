const express = require('express')
const multer = require('multer')
const zlib = require('zlib')
const fs = require('fs')
const { promisify } = require('util');
const gzipAsync = promisify(zlib.gzip);
const upload = multer({ dest: 'uploads/' })

const app = express()

const uploadFile = upload.single('file')

app.get('/login', function (req, res) {
    res.send('1155290')
})

app.post('/zipper', uploadFile, async function (req, res, next) {
    try {
        const inputBuffer = fs.readFileSync(req.file.path)
        const compressedBuffer = await gzipAsync(inputBuffer, { level: 9 });


        res.setHeader('Content-Type', 'application/gzip')
        res.send(compressedBuffer)
    } catch (error) {
        console.error('Ошибка:', error);
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен: http://localhost:3000')
})