import React, { Component } from 'react'
import Selections from './selections.jsx'
import { Menu, MenuItem} from 'material-ui'


//refactor into css file
const style = {
  marginRight: '32',
  marginBottom: '32',
  float: 'left',
  position: 'relative',
  zIndex: 0
};


class DataEntry extends Component { 
  constructor() {
    super();
    this.state = {
      current: 'Users',
      selections: {
        Cars: {
          color: false,
          make: false,
          model: false
        },
        Users: {
          name: false,
          email: false,
          address: false
        },
        Animals: {
          species: false,
          region: false,
          diet: false
        },
        Bands: {
          members: false,
          style: false,
          city: false
        },
        Trees: {
          bark: false,
          region: false,
          height: false,
          width: false
        }
      }
    }
  }
  renderSelection(selected) {
    let selection = this.state.selections[selected]
    return (
      <Selections selection={selection}/>
    )
  }
  onSelectTable(e) {
    console.log('holler', e)
    this.setState({
      current: e
    })
  }

  render () {
    let selections = this.state.selections;
    return (
      <div className='dataEntry'>
        <Menu style={style}>
          {Object.keys(selections).map((s)=> {
            return <MenuItem 
            maxHeight={200}
            onClick={() => this.onSelectTable(s)}
            primaryText={s}/>
          })}
        </Menu>
        {this.renderSelection(this.state.current)}
      </div>
    )
  }
}

export default DataEntry