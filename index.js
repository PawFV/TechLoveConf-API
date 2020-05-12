const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');
require('dotenv/config');

// BODY PARSER
app.use(bodyParser.json());

// CONNECT DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


// ROUTES
app.use('/api/users', usersRoute);

app.get('/', (req, res) => {
   res.send("<h1>My api</h1>")
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log("Mongo Online");
});

app.listen(PORT, () => console.log(`Node Online ${PORT}`));