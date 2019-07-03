import React from 'react';
import NoteList from './note-list';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Link to='/add-folder'>
          <button>Add Folder</button>
        </Link>
        <NoteList />
      </div>);
  }
}


export default MainPage;