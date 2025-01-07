const express = require('express');
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const taskRoutes = require('./routes/task.route');
const authRoutes = require ('./routes/user.route');
const db = require('./config/db');

const app = express();

const dotenv = require ('dotenv');
dotenv.config();

//connecting to mongoDB
db.connectToMongoDB();

//set static and static file
app.set ('view engine', 'ejs')
app.set ('views', 'views');

// Middleware's
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: process.env.JWT_SECRET, 
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    cookie: { secure: true,
        maxAge: 60 * 60
     }
})); 


app.get( '/',(req,res)=>{
res.render('index')
}); 

app.use('/', authRoutes);
app.use('/tasks', taskRoutes); 

// Handle 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: 'This Route is Not Found' });
}); 

//Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;