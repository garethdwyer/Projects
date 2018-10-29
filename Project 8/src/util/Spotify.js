let accessToken = null;
const clientId = '4eadf71e83ca442aa1a2c720980d3244';
const redirectUri = 'http://localhost:3000/';
const spotifyAuthScopes = 'playlist-modify-private user-read-private playlist-modify-private';
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURI(spotifyAuthScopes)}`;

const Spotify = {
	getAccessToken () {
		if (accessToken !== null) {
			return accessToken;
		}

		if (window.location.hash !== '') {
			const accessTokenMatch = window.location.hash.match(/access_token=([^&]*)/);
			const expiresInMatch = window.location.hash.match(/expires_in=([^&]*)/);

			if (accessTokenMatch !== null && expiresInMatch !== null) {
				[, accessToken] = accessTokenMatch;
				const [, expiresIn] = expiresInMatch;

				window.setTimeout(() => accessToken = '', expiresIn * 1000);
				window.history.pushState('Access Token', null, '/');

				return accessToken;
			}
			window.location = spotifyAuthUrl;

			return '';
		}
		window.location = spotifyAuthUrl;

		return '';
	},

	async search(term) {
		// Check if we need a new token
		if (this.getAccessToken() === '') {
			return [];
		}

		try {
			const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURI(term)}`, {
				headers: { Authorization: `Bearer ${accessToken}` }
			});

			if (response.ok) {
				const jsonResponse = await response.json();
				const tracksArr = [];
				jsonResponse.tracks.items.forEach(track => {
					tracksArr.push({
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
					});
				});

				return tracksArr;
			}

			throw new Error('Request Failed!');

		} catch (error) {
			return [];
		}
	},

	async savePlaylist(name, tracks) {
		if (name === '' || tracks.length === 0) {
			return 0;
		}
		let userId = '';
		const headers = { Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json' };
		let response = null;
		let jsonResponse = null;
		let playlistID = null;

		try {
			response = await fetch('https://api.spotify.com/v1/me', { headers });

			if (response.ok) {
				jsonResponse = await response.json();
				userId = jsonResponse.id;

			} else {
				throw new Error('Could not retreive user id');
			}

			response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
				headers,
				method: 'POST',
				body: JSON.stringify({
					name,
					public: false
				})
			});

			if (response.ok) {
				jsonResponse = await response.json();
				playlistID = jsonResponse.id;
			} else {
				throw new Error('Could not create playlist');
			}

			response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
				headers,
				method: 'POST',
				body: JSON.stringify({ uris: tracks })
			});

			if (!response.ok) {
				throw new Error('Could not add tracks to playlist');
			}
		} catch (error) {
			console.log(error);

			return 0;
		}

		return 1;
	}
};

export default Spotify;
