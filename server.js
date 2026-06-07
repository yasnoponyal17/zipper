const express = require('express');
const multer = require('multer');
const zlib = require('zlib');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const LOGIN = '1155290';

app.get('/login', (req, res) => {
    res.type('text/plain').send(LOGIN);
});

app.post('/zipper', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('file required');
    }

    zlib.gzip(req.file.buffer, (err, gz) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.set({
            'Content-Type': 'application/gzip',
            'Content-Disposition': 'attachment; filename="result.gz"',
        });

        res.send(gz);
    });
});

const port = process.env.PORT || 3000;
app.listen(port);