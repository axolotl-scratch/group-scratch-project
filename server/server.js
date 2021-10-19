const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const spotifyController = require('./newControllers'); //-> uncomment this to connect the controllers when they are ready

app.use(express.json());

// storing accesstoken that we can export from here into our spotifyapi controller file
let storedAccessToken;

// spotify api client id, secret, and redirect uri 
const client_id = 'e6844aab50c045bcaeeefe104bef4f4b'; // Your client id
const client_secret = 'cb60640e4a2146919f50e7d2fc1e3a56'; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri.

// random sring and number generator
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
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
// ^this statically sends the page that has the option to go to the landing page/login page 


app.use('/login', (req, res) => {
  // redirect to oauth with res.redirect
  console.log('hit the login endpoint');
  
	const state = generateRandomString(16);
  res.cookie(stateKey, state);
  
  // your application requests authorization.  redirecting to the spotify authorization page
  const scope = 'user-read-private user-read-email playlist-modify playlist-modify-private';
  
	/*
	scopes:
	user-read-private gives us access to searching
	user-read-email gives us access to the user profile
	playlist-modify-private lets us create and add songs to playlists
	*/
  
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
});

app.get('/callback', function(req, res) {
  
  // your application requests refresh and access tokens after checking the state parameter
  
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  
  if (state === null || state !== storedState) {
    res.redirect('/#' +
    querystring.stringify({
      error: 'state_mismatch'
    }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        
        const access_token = body.access_token,
        refresh_token = body.refresh_token;
        
				// reassigning storedAccessToken for importing into spotifyAPIcontrollers
				storedAccessToken = access_token;
        console.log('STORED ACCESS TOKEN FROM SERVER.JS LN110', storedAccessToken);
        
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          // console.log(body);
        });
        
        // we can also pass the token to the browser to make requests from there
        // this is where we would redirect to '/modal'
        // but we would still want the access token saved somewhere (maybe a cookie or database) so we can access it in the next api call
        // res.redirect('/#' +
        // querystring.stringify({
        //   access_token: access_token,
        //   refresh_token: refresh_token
        // }));
        res.cookie('successful-login', storedAccessToken); //-> Note for iteration group: This is terrible security. Please encrypt this. 
        res.redirect('/');
      } else {
        res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
      }
    });
  }
});

app.get('/modal', 
  (req, res) => {
    // display the create playlist page
});

app.post('/modal', (req, res, next) => {
  res.locals.token = storedAccessToken;
  console.log('RES.LOCALS.TOKEN LINE 150******',res.locals.token);
  next();
},
  spotifyController.newMiddleware,
  spotifyController.createPlaylist,
  (req, res) => {
    // console.log('storedAccessToken in server.js line152', storedAccessToken);
    res.status(200)
})

app.use('/compile', 
  // spotifyController.searchArtists, //-> search for artist(s) ID(s)
  // spotifyController.getArtistTopTracks, //-> search for artist(s)'s top 10 songs
  // spotifyController.addTracksToPlaylist, //-> add the top 10 songs to the playlist
(req, res) => {
  //res.status(200)
  // what do here? confirmation page? redirect to...???
});


// app.use('/', (req, res) => {
//   res.status(200);
// });

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

exports.storedAccessToken = storedAccessToken;