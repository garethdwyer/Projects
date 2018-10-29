import React from 'react'
import "./SearchResult.css"
import TrackList from '../TrackList/TrackList.js'
class SearchResults extends React.Component {
  render() {
    return (<div className="SearchResults">
  <h2>Results</h2>
  <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
</div>)
  }
}
export default SearchResults
