import React from 'react';
import NoteThumbnail from './note-thumbnail';
import { PageContext } from './Contexts/PageContext';
import {Link} from 'react-router-dom';

class FolderPage extends React.Component {

  static contextType = PageContext;

  render() {

    const { notes } = this.context;

    const folderId = this.props.match.params.folderId;
    const filteredNotes = notes.filter(note => {
      return note.folderId === folderId;
    });

    const mappedNotes = filteredNotes.map(note => {
      return (
        <NoteThumbnail
          key={note.id}
          noteId={note.id}
          modified={note.modified}
          name={note.name}
        />
      );
    });
    return <div>
      
      {notes.length ? mappedNotes : 'Nothing was Found.'}
    </div>;
  }
}

export default FolderPage;