import React from 'react'
import "./SearchBar.css"
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
        this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this)
    this.handleKeypress=this.handleKeypress.bind(this)
  }
  search() {
    if (localStorage.getItem('search')) {
      this.props.onSearch(localStorage.getItem('search'))
    }else{
    this.props.onSearch(this.state.searchTerm)
    console.log('searchbar')}
              }
  handleKeypress(event) {
    if (event.key==='Enter') {
      this.search()
    }
  }
  handleTermChange(event) {
    this.setState({searchTerm:event.target.value})
    localStorage.setItem('search',event.target.value)
            console.log(this.state.searchTerm)
    console.log("this is a local storage " +localStorage.getItem('search'))
    }
  render() {
    return (<div className="SearchBar">
  <input placeholder="Enter a Song Here" onChange={this.handleTermChange} onKeyPress={this.handleKeypress} defaultValue={localStorage.getItem('search')}/>
  <a onClick={this.search}>SEARCH</a>
</div>)

}
}
export default SearchBar
console.log(localStorage.getItem('search'))
