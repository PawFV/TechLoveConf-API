const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');

// CORS ENABLED
app.use(cors());
// BODY PARSER
app.use(bodyParser.json());

// CONNECT DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;

app.use('/public/images', express.static(__dirname + '/public/images'))
// ROUTES
const usersRoute = require('./routes/users');
const uploadRoute = require('./routes/upload');
app.use('/api/users', usersRoute);
app.use('/api/upload', uploadRoute);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log("Mongo Online");
});

app.listen(PORT, () => console.log(`Node Online ${PORT}`));