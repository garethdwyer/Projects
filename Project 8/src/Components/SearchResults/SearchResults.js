import React from 'react';
import { TrackList } from '../TrackList/TrackList';
import PropType from 'prop-types';
import './SearchResults.css';


export class SearchResults extends React.Component {
	render () {
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
			</div>
		);
	}
}

SearchResults.propTypes = {
	searchResults: PropType.arrayOf(PropType.shape({
		name: PropType.string.isRequired,
		artist: PropType.string.isRequired,
		album: PropType.string.isRequired,
		id: PropType.string.isRequired,
		uri: PropType.string.isRequired
	})).isRequired,
	onAdd: PropType.func.isRequired
};
