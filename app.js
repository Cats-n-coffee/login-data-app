const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/appRoutes');

const app = express();

const mongoUser = process.env.MONGO_USER ;
const mongoPassword = process.env.MONGO_PASSWORD ;
const mongoDatabase = process.env.MONGO_DATABASE ;

const dbUri = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xwfkn.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(result => app.listen(3000, () => { console.log('listening on port 3000') }))
.catch(err => console.log(err))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(userRoutes);
