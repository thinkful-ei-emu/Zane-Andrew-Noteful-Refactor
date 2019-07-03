import React from 'react';

const SidebarContext = React.createContext({
  folders: [],
  addFolder: () => {},
  setCurrentFolder: () => {}
});

export {
  SidebarContext
}