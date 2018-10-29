let accessToken = '';
let client_id = '9ce9cfc646114faaa079428895e9aefa';
let redirect_URI = "http://localhost:3000/";

const Spotify = {
	getAccessToken(){
		if(accessToken){
			return accessToken;
		} else if (window.location.href.match(`access_token=`)) {
			accessToken = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
			let expiresIn = window.location.href.match(/expires_in=(\d+)/g).toString().slice(11);
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			window.location.replace(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirect_URI}`);
		}
	},

	search(searchTerm){
	this.getAccessToken();
	return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
	{
		headers: {
			'Authorization': `Bearer ${accessToken}` 
		}
	}).then(response => {
		return response.json();
	}).then(jsonResponse => {
		if(jsonResponse.tracks) {
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}))
			} else {
			return [];
			}
		})
	},

	savePlaylist(playlistName, trackURIs){
		let headers = {'Authorization': `Bearer ${accessToken}`};
		let user_id = '';
		let playlist_id = '';
		return fetch(`https://api.spotify.com/v1/me`, {
					headers: headers	
				}).then(response => {
					return response.json();
				}).then(jsonResponse => {
					return user_id = jsonResponse.id;
				}).then(user_id => {return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
									method: 'POST',
									headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
									body: JSON.stringify({name: playlistName})
									})
				}).then(response => {
					return response.json();
				}).then(jsonResponse => {
					return playlist_id = jsonResponse.id;
				}).then(playlist_id => {return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
									method: 'POST',
									headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
									body: JSON.stringify({uris: trackURIs})
									})
			})
	}
}
export default Spotify;