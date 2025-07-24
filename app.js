const express = require('express');
const passport = require('passport');
const session = require('express-session');
const indexRouter = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();


// Settings
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routers
app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/api', uploadRoutes);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});