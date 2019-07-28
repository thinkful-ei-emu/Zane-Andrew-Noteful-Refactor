import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarContext } from './Contexts/SidebarContext';

class MainSidebar extends React.Component {

  static contextType = SidebarContext;

  render() {
    const { folders, setCurrentFolder } = this.context;

    const folderLinks = folders.map((folder) => {
      return (
        <NavLink key={folder.id}
          to={`/folder/${folder.id}`}
          onClick={() => setCurrentFolder(folder.id)}>
          <p>{folder.folder_name}</p>
        </NavLink>
      );
    });

    return (
      <div className='main-sidebar'>
        <NavLink onClick={() => setCurrentFolder('')} to='/'><p>Home</p></NavLink>
        {folderLinks}
      </div>
    );
  }
}

MainSidebar.contextType = SidebarContext;

export default MainSidebar;