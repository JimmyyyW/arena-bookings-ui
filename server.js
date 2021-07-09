const express = require('express');

const app = express();

app.use(express.static('./dist/booking-horses-ui/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/booking-horses-ui/'}),
);

app.listen(process.env.PORT || 4200)