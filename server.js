import express from 'express';
import path from 'path';
const app = express();

app.use(express.static('dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join('dist', 'index.html'));
});

app.listen(9060, () => console.log('Écoute sur le port 9060'));