'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class CustomColorPicker extends React.Component {

    state = {
        displayColorPicker: false,
        color: '#D5D5D5',
    };

    constructor(props) {
        super();
        this.setState({ color: props.color });
    }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color, e) => {
    this.setState({ color: color.hex });

    if (this.props.onChangeComplete) {
        this.props.onChangeComplete(color, e);
    }
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '50px',
          height: '30px',
          borderRadius: '2px',
          background: this.props.color,
          marginLeft:"20px"
        },
        swatch: {
          padding: '5px',
          cursor: 'pointer',
          display:"flex",
          alignItems: "center",
          color:"#fff"
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
           <h1>Choose Color: </h1> 
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default CustomColorPicker