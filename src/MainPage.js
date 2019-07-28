import React from 'react';
import NoteList from './NoteList';
import { Link } from 'react-router-dom';
import MainSidebar from './MainSidebar';

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