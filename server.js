import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { getGames, getGame, postGame, deleteGame } from './app/routes/game';
import { signup, login, verifyAuth } from './app/routes/user';

const app = express();
const port = process.env.PORT || 8080;

// DB connection through Mongoose
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect('YOUR_MONGODB_URL', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});


// Auth API routes
app.post('/auth/login', login);
app.post('/auth/signup', signup);

// API routes
app.route('/games')
	// create a game
	.post(verifyAuth, postGame)
	// get all the games
	.get(getGames);
app.route('/games/:id')
	// get a single game
	.get(getGame)
  // delete a single game
	.delete(verifyAuth, deleteGame);

// ...For all the other requests just sends back the Homepage
app.route("*").get((req, res) => {
	res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`listening on port ${port}`);
