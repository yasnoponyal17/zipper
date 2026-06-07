const express = require('express')
const multer = require('multer')
const zlib = require('zlib')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const upload = multer({ storage: multer.memoryStorage() })

app.get('/login', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send('1155290')
})

app.post('/zipper', upload.any(), (req, res) => {
    const file = req.files && req.files[0]

    if (!file) {
        return res.status(400).send('No file uploaded')
    }

    zlib.gzip(file.buffer, (err, compressed) => {
        if (err) {
            return res.status(500).send('Compression error')
        }

        res.set({
            'Content-Type': 'application/gzip',
        })
        res.send(compressed)
    })
})

app.listen(port, () => {
    console.log(`Сервер запущен http://localhost:${port}`)
})