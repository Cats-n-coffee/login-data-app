const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/appRoutes');
const { verifyToken, requireToken } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUser = process.env.MONGO_USER ;
const mongoPassword = process.env.MONGO_PASSWORD ;
const mongoDatabase = process.env.MONGO_DATABASE ;

const dbUri = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xwfkn.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(result => app.listen(PORT, () => { console.log('listening on port 3000') }))
.catch(err => console.log(err))

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', verifyToken);
app.get('/portal', requireToken, (req, res) => {
    res.render('portal', { title: 'My Portal' });
})
app.use(userRoutes);