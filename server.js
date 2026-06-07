const express = require('express')
const multer = require('multer')
const zlib = require('zlib')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/login', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send('1155290')
})

app.post('zipper', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Ошибка: Файл не загружен.')
    }
    zlib.gzip(req.file.buffer, (err, compressedBuffer) => {
        if (err) {
            console.error("Ошибка сжатия:", err)
            return res.status(500).send('Ошибка сервера при сжатии')
        }
        res.set({
            'Content-Type': 'application/gzip',
            'Content-Disposition': 'attachment; filename="result.gz"',
            'Content-Length': compressedBuffer.length
        })
        res.send(compressedBuffer)
    })
})

app.listen(port, () => {
    console.log(`Сервер запущен http://localhost:${port}`)
})