const fs = require('fs');
const path = require('path');

const fileController = {};

fileController.createPlaylist = (req, res, next) => {
    // create a playlist with the name found in the input field
    // store the returned playlist id in res.locals??
    // POST https://api.spotify.com/v1/users/{user_id}/playlists
};

fileController.searchArtist = (req, res, next) => {
    // search for artist ID(s)
    // make sure to be able to handle multiple artists
    // store the returned artist ID(s) in res.locals??
    // https://developer.spotify.com/documentation/web-api/reference/#category-artists
    // GET https://api.spotify.com/v1/search
};

fileController.getTopTen = (req, res, next) => {
    // search for the top 10 songs from all of the artist ID's
    // store the returned song ID's in res.locals??
    // GET https://api.spotify.com/v1/artists/{id}/top-tracks
};

fileController.addSongsToPlaylist = (req, res, next) => {
    // add all of the top 10 songs to the playlist
    // will need the previously stored playlist ID from the createPlaylist middleware
    // POST https://api.spotify.com/v1/playlists/{playlist_id}/tracks
};

module.exports = fileController;