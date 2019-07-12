import React from 'react';
import PropTypes from 'prop-types';


function Sidebar(props) {

  return (<div>
    {props.children}
  </div>);
}
Sidebar.propTypes={
  children:PropTypes.object,
}

export default Sidebar;