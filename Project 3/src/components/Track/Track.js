import React from 'react'
import "./Track.css"
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.renderAction=this.renderAction.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track)
  }
  previewSong
  renderAction() {
    if (this.props.isRemoval && this.props.track.name) {
      return <div className="Track"><div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div><a className='Track-action2' href={this.props.track.previewLink} target='_blank'>►</a><a className='Track-action' onClick={this.removeTrack}>-</a></div>;
    }else if (this.props.isRemoval === false && this.props.track.name) {
      return <div className="Track"><div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div><a className='Track-action2' href={this.props.track.previewLink} target='_blank'>►</a><a className='Track-action' onClick={this.addTrack}>+</a></div>;
    } else {
      return ""
    }
  }
  render() {
    return (<div>{this.renderAction()}</div>)
  }
}
export default Track
