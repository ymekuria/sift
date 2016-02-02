import React, { Component } from 'react'
import { createTable } from '../utils/utils.js'
import Selections from './selections.jsx'
import Dropdown from './dropdown.jsx'

import data from '../data/write.js'
import faker from 'faker'
/*
  == Material UI componenets ==
*/
import Paper from 'material-ui/lib/paper'



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
      categories: data.categories,
      selections: {}
    }
  }

  addToList (selection, category) {
    let currentSelections = this.state.selections;
    if (!currentSelections[category]) {
      currentSelections[category] = {};
      currentSelections[category][selection] = true;
    } 
    else if(!currentSelections[category][selection]) {
      currentSelections[category][selection] = true
    }

    this.setState({
      selections: currentSelections
    })
  }
  onSubmit(checked) {
    //faker tests
  }
  removeFromList(category, subCategory) {
    let selections = this.state.selections;
    delete selections[category][subCategory];

    this.setState({
      selections: selections
    })
  }

  render () {
    return (
      <div className='dataEntry'>
        <Paper className='select'>
          <Dropdown 
          className='dropdown' 
          categories={this.state.categories}
          addToList={this.addToList.bind(this)}/>
        </Paper>
        <Paper className='buildTable'>
          <Selections 
          removeFromList={this.removeFromList.bind(this)}
          selections={this.state.selections}/>
        </Paper>
      </div>
    )
  }
}

export default DataEntry