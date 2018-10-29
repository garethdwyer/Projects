import React from 'react'
import Playlist from './components/Playlist/Playlist.js'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import {Spotify} from './util/Spotify.js'
import "./App.css"
import './loading.gif'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      searchResults:[{
        name:"",
        artist:"",
        album:"",
        id:"",
        loading:false
      }],
      playlistName:'',
      playlistTracks:[{
        name:"",
        artist:"",
        album:"",
        id:""
      }]
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this)
  }

  componentDidMount() {
    if (document.referrer && document.referrer.indexOf('facebook'||'spotify') !== 0)
    {this.search()}
    console.log('componentDidMount ' + document.referrer)
    console.log('windpw'+window.location.protocol + "//" + window.location.host);
  }

  savePlaylist() {
let trackURIs = this.state.playlistTracks.map(track => track.uri);
Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=>{
  this.setState({playlistTracks:[],playlistName:'New Playlist'})
})
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return;
}else{
  let tracks = this.state.playlistTracks;
  tracks.push(track);
  this.setState({playlistTracks:tracks})
}
}
updatePlaylistName(name) {
  this.setState({playlistName:name})
}
removeTrack(track) {
let tracks=this.state.playlistTracks;
tracks=tracks.filter(currentTrack=>currentTrack.id !==track.id);
this.setState({playlistTracks:tracks})
}
search(term) {
  this.setState({loading:true})
  Spotify.search(term).then(results=> {
    this.setState({searchResults:results,loading:false})
  })
  console.log('Search')
}

    render() {
    return (<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
  <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      {this.state.loading
        ? <div><img src='../loading.gif' alt='loading' /></div>
        : <SearchResults
      searchResults={this.state.searchResults}
      onAdd={this.addTrack}
      />}
      <Playlist
      playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}
      />
    </div>
  </div>
</div>)
  }
}
export default App
