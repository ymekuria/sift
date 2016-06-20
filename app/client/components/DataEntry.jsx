
import React, { Component } from 'react'
import { createTable } from '../utils/utils.js'
import Dropdown from './dropdown.jsx'
import faker from 'faker'
import h from '../config/helpers'
/*
  == Material UI componenets ==
*/
import Paper from 'material-ui/lib/paper'
import { Menu, MenuItem } from 'material-ui'

//refactor into css file
require('../../node_modules/react-select/dist/react-select.css')


class DataEntry extends Component {

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const { MenuOptions, CurrentSelections, loading } = this.context.store.getState().buildTable;
    return (
      <div className='dataEntry'>
        <Paper className='select'>
          <Dropdown loading={loading} currentSelections={CurrentSelections} menuOptions={MenuOptions} className='dropdown'/>
        </Paper>
      </div>
    )
  }
}
DataEntry.contextTypes = {
  store: React.PropTypes.object
}

export default DataEntry
