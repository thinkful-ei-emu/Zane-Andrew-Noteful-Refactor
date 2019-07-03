import React from 'react';
import { Link } from 'react-router-dom';
import {PageContext}from './Contexts/PageContext'

class NoteThumbnail extends React.Component {
  static contextType=PageContext;
  
  
  render() {
    const {deleteNote}=this.context;
    return (
      <div>
        <Link to={`/note/${this.props.noteId}`}>
          <h2>{this.props.name}</h2>
          <p>Modified on: {new Date(this.props.modified).toLocaleDateString()}</p>
          </Link>
          <button onClick={()=>{deleteNote(this.props.noteId);}}>Delete Note</button>
        
      </div>);
  }
}

export default NoteThumbnail;