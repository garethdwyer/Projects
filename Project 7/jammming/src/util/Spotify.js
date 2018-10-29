let accessToken = '';
let expiresIn = '';
const clientID = 'd2a0070c8bd54fccaa4ae0028a730cfa'
const redirectURI = 'https://rejam.surge.sh';

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiredToken = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expiredToken) {
      accessToken = accessToken[1];
      const expiresIn = Number(expiredToken[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?${clientID}&response_type=token&scope=playlist-modify-public&${redirectURI}`;
    }
  },

  search(term) {

    return fetch('https://api.spotify.com/v1/search?type=track&q=${term}', {
        headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.album.name
        }))
      })
  },

  savePlaylist(playlistName, trackURI) {
    if (!playlistName.length === 0 || !trackURI.length === 0) {
      accessToken = Spotify.getAccessToken();
      let userID = '';
      const endpoint = 'https://api.spotify.com/v1/me';
           const headers = {headers: {Authorization: `Bearer ${accessToken}`} };
           fetch(endpoint, headers).then(response => {
               if(response.ok) {
                   return response.json();
               }
           }).then(jsonResponse => {
               userID = jsonResponse.id;
               const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
               const playlistOptions = { headers: {Authorization: `Bearer ${accessToken}`}, method: 'POST', body: JSON.stringify({name: playlistName})};
               return fetch(createPlaylistEndpoint, playlistOptions).then(response => {
                   if(response.ok) {
                       return response.json();
                   }
               }).then(jsonResonse => {
                   let playlistID = jsonResonse.id;
                   const addTracksEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
                   const addTracksOptions = {
                     headers: {
                       Authorization: `Bearer ${accessToken}`, "Content-Type": 'application/json'
                     }, method: 'POST', body: JSON.stringify({uri: trackURI})
                   };
                   fetch(addTracksEndpoint, addTracksOptions);
               });
           });
       } else {
           return;
       }
   }

}


export default Spotify;
