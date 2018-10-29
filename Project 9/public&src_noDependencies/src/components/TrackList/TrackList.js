import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

// this is looking for data in the array that we have set in app.js
class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => {
						return <Track track={track} key={track.id} onAdd={this.props.onAdd} 
						onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
					})
				}
			</div>
	    );
	  }
	}

export default TrackList;