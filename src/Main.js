import React from 'react';
import PropTypes from 'prop-types';

function Main(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

Main.propTypes={
  children:PropTypes.object,
}

export default Main;