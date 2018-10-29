import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Spotify from '../../util/spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [ ],
      playlistName: 'My playlist',
      playlistTracks: [ ]
    };
    this.SearchInSpotify = this.SearchInSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack  = this.removeTrack.bind(this);
    this.savePlaylist  = this.savePlaylist.bind(this);
    this.updatePlaylistName  = this.updatePlaylistName.bind(this);
  }

  SearchInSpotify(term){
    Spotify.search(term).then(track=>{
      this.setState({searchResults:track});
    })

  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let currentPlaylistArray = this.state.playlistTracks.concat(track);
    this.setState({ playlistTracks: currentPlaylistArray });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  removeTrack(track) {
    let currentPlaylistArray = this.state.playlistTracks;
    this.setState({ playlistTracks: currentPlaylistArray.filter(checkTrack => checkTrack.id !== track.id) });
  }

  savePlaylist() {
    let playlistArray = this.state.playlistTracks;
    let uriArray = playlistArray.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, uriArray);
    this.setState({
      playlistTracks: []
    });
    this.updatePlaylistName('New playlist');
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar SearchInSpotify={this.SearchInSpotify} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
            <PlayList
              name={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
