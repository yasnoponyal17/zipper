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

app.post('/zipper', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file');
    }

    zlib.gzip(req.file.buffer, (err, compressed) => {
        if (err) {
            return res.status(500).send('Compression error');
        }

        res.set({
            'Content-Type': 'application/gzip',
            'Content-Disposition': 'attachment; filename=result.gz'
        });

        res.send(compressed);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен http://localhost:${port}`)
})