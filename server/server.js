const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const cors = require('cors');

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const petfinderRouter = require('./routes/petfinder.router')
const favoriteRouter = require('./routes/favorite.router')
const requestRouter = require('./routes/request.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000/', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/****** ROUTES ******/
app.use('/api/user', userRouter);
// handle GET request to petfinder API
app.use('/api/animal', petfinderRouter)
// handle GET, DELETE, POST requests for user's favorite animals
app.use('/favorite', favoriteRouter)
// handle DELETE and PUT requests for user's submission 
app.use('/request', requestRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});