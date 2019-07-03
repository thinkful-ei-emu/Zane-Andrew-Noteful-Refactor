import React from 'react';

const PageContext = React.createContext({
  notes: [],
  addNote: () => {}
})

export {
  PageContext
}