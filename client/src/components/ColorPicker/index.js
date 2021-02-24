import React from 'react';
import { SketchPicker } from 'react-color';
/**
 * Example taken from https://casesandberg.github.io/react-color/
 */
class SketchExample extends React.Component {
    state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  
    handleClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
  
    handleClose = () => {
      this.setState({ displayColorPicker: false })
    };
  
    handleChange = (color) => {
      this.setState({ color: color.rgb })
    };
  
    render() {
  
      const styles = {
        color: {
            width: '100%',
            height: '1em',
            borderRadius: '2px',
            background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          },
          swatch: {
            width: '100%',
            height: '100%',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
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
      };
  
      return (
        <div>
          <div style={ styles.swatch } onClick={ this.handleClick }>
            <div style={ styles.color } />
          </div>
          { this.state.displayColorPicker ? 
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
          </div> : null 
          }
  
        </div>
      )
    }
  }
  
  export default SketchExample
/**
 * 
 * @param {*} param0 
 * 
 * 
 const ColorPicker = ({targetState}) => {
    state={
      displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        },
    };
  
    handleClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
  
    handleClose = () => {
      this.setState({ displayColorPicker: false })
    };
  
    handleChange = (color) => {
      this.setState({ color: color.rgb })
    };
  
    return (
      <Box>
            <Box bg={rgba({this.state.color.r},{this.state.color.g},{this.state.color.b},{this.state.color.a})}>
  
            </Box>
            <div style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.color } />
            </div>
            { this.state.displayColorPicker ? 
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />: null 
            }
      </Box>
    )
  }
 */
  