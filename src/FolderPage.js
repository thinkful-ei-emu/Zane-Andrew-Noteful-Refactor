import React from 'react';
import NoteThumbnail from './NoteThumbnail';
import { PageContext } from './Contexts/PageContext';
import {Link} from 'react-router-dom';

class FolderPage extends React.Component {

  static contextType = PageContext;

  render() {

    const { notes } = this.context;

    const folderId = this.props.match.params.folderId;
    const filteredNotes = notes.filter(note => {
      return note.folder_id == folderId;
    });

    const mappedNotes = filteredNotes.map(note => {
      return (
        <NoteThumbnail
          key={note.id}
          noteId={note.id}
          modified={note.modified_date}
          name={note.note_name}
        />
      );
    });
    return <div>
      
      {notes.length ? mappedNotes : 'Nothing was Found.'}
    </div>;
  }
}

export default FolderPage;