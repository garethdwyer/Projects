import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term:""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
  }

  handleSearch(){
    this.props.SearchInSpotify(this.state.term);
  }

  handleTerm(event){
    const newTerm= event.target.value;
    this.setState({term:newTerm})
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTerm}
          placeholder="Enter A Song, Album, or Artist" 
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
