
import React, { Component } from 'react'
import { createTable } from '../utils/utils.js'
import Selections from './selections.jsx'
import Dropdown from './dropdown.jsx'
import faker from 'faker'
import h from '../config/helpers'
/*
  == Material UI componenets ==
*/
import Paper from 'material-ui/lib/paper'
import { Menu, MenuItem} from 'material-ui'

//refactor into css file
const selectStyle = {
  backgroundColor: "#F2F3F7"
};

  // <Paper style={selectStyle} className='selectionList'>
    // <div>
      // <Selections selected={CurrentSelections}/>  
    // </div>
  // </Paper>

class DataEntry extends Component {

  componentDidMount() {
    //subscribe to the store
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      console.log('updatin disptachid');
      this.forceUpdate()
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const { MenuOptions, CurrentSelections } = this.context.store.getState().buildTable;
    return (
      <div className='dataEntry'>
        <Paper style={selectStyle} className='select'>
          <Dropdown menuOptions={MenuOptions} className='dropdown'/>
        </Paper>
      </div>
    )
  }
}
DataEntry.contextTypes = {
  store: React.PropTypes.object
}

export default DataEntry
