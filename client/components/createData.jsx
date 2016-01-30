import React, { Component } from 'react'
import Selections from './selections.jsx'
import { Menu, MenuItem} from 'material-ui'
import {  createTable } from '../utils/utils.js'
import fixtures from '../data/fixtures'
import faker from 'faker'
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
    this.state = fixtures
  }

  renderSelection(selected) {
    let selection = this.state.selections[selected]
    return (
      <Selections onSubmit={this.onSubmit.bind(this)} selection={selection}/>
    )
  }
  onSelectTable(e) {
    this.setState({
      current: e
    })
  }
  onSubmit(checked) {
    //faker tests
  }
  onDelete() {
    //enter an 'editing' view and send a new 
    //selection object that reflects the changes
    //that were made
  }
  onUpdate() {
    //
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