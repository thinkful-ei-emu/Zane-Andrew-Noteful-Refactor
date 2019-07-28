import React from 'react';
import { PageContext } from './Contexts/PageContext';


class NotePage extends React.Component {

  static contextType = PageContext;

  render() {

    const { notes,deleteNote } = this.context;

    const noteId = this.props.match.params.noteId;
    const note = notes.find(note => note.id == noteId);
   
    return (
      <div className='note-stuff'>
        {note ?
          <>
            <header>
              <h2>
                {note.note_name}
              </h2>
              <p>
                {new Date(note.modified_date).toLocaleDateString()}
              </p>
              <button onClick={()=>{document.getElementById('back-button').click()
                deleteNote(noteId)}}>Delete Note</button>
            </header>
            <p>
              {note.description}
            </p>
          </> :
          'Nothing was Found.'
        }
      </div>);
  }
}
NotePage.propTypes={

}

export default NotePage;