const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

app.use(express.json());

// spotify api client id, secret, and redirect uri 
const client_id = 'e6844aab50c045bcaeeefe104bef4f4b'; // Your client id
const client_secret = 'cb60640e4a2146919f50e7d2fc1e3a56'; // Your secret
const redirect_uri = 'http://localhost:3000/modal'; // Your redirect uri.  in our case: '/modal'

// random sring and number generator
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

// statically serve everything in the public folder (bundle.js and index.html). 
// cors() sets default headers to {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
// cookieParser middleware parses cookies attached to the client request object
app.use(express.static(path.join(__dirname, '../public')))
	.use(cors())
	.use(cookieParser());

app.use('/', (req, res) => {
	// this should display the option to go to the landing page/login page
});

app.use('/login', (req, res) => {
	// redirect to oauth
	const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization.  redirecting to the spotify authorization page
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.use('/modal', 
	// this should display the "create playlist" page (GET)
	// should create a new playlist with the name entered in the input field (POST)
	createPlaylist,
	(req, res) => {
	// redirect to the main page
});

app.use('/compile', 
	// this should display the main page (GET)
	// search for an artist(s) ID (GET)
	searchArtist,
	// search for the artist(s)'s top 10 songs (GET)
	getTopTen,
	// add the top 10 songs to the playlist (PUT)
	addSongsToPlaylist,
	(req, res) => {
		// what do here? confirmation page? redirect to...???
});


// ******error handlers*******
app.use((req, res) =>
	res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	// console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/