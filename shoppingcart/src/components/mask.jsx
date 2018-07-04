import React from 'react'

export default (props) => <div {...props} style={
  {
    width: '100%',
    height: '100%',
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'fixed',
    top: 0,
    left: 0,
    cursor: 'pointer'
  }
}></div>
