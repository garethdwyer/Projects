import React from 'react';
import PropType from 'prop-types';
import { TrackList } from '../TrackList/TrackList';
import './Playlist.css';


export class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(ev) {
		this.props.onNameChange(ev.target.value);
	}

	render () {
		return (
			<div className="Playlist">
				<input
					defaultValue={this.props.playlistName}
					onChange={this.handleNameChange}/>
				<TrackList
					tracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemoval={true}/>
				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

Playlist.propTypes = {
	playlistName: PropType.string.isRequired,
	playlistTracks: PropType.arrayOf(PropType.shape({
		name: PropType.string.isRequired,
		artist: PropType.string.isRequired,
		album: PropType.string.isRequired,
		id: PropType.string.isRequired
	})).isRequired,
	onRemove: PropType.func.isRequired,
	onNameChange: PropType.func.isRequired,
	onSave: PropType.func.isRequired
};
