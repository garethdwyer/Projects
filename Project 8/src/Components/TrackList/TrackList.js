import React from 'react';
import { Track } from '../Track/Track';
import PropType from 'prop-types';
import './TrackList.css';


export class TrackList extends React.Component {
	render () {
		return (
			<div className="TrackList">
				{this.props.tracks.map(track => <Track
					key={track.id}
					track={track}
					isRemoval={this.props.isRemoval}
					onAdd={this.props.onAdd}
					onRemove={this.props.onRemove}/>
				)}
			</div>
		);
	}
}

TrackList.propTypes = {
	tracks: PropType.arrayOf(PropType.shape({
		name: PropType.string.isRequired,
		artist: PropType.string.isRequired,
		album: PropType.string.isRequired,
		id: PropType.string.isRequired,
		uri: PropType.string.isRequired
	})).isRequired,
	onAdd: PropType.func,
	onRemove: PropType.func,
	isRemoval: PropType.bool
};
