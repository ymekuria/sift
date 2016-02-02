import React, { Component } from 'react'
import { createTable } from '../utils/utils.js'
import Selections from './selections.jsx'
import { Menu, MenuItem} from 'material-ui'
import {  createTable } from '../utils/utils.js'
import h from '../config/helpers'
import fixtures from '../data/fixtures'
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


  componentDidMount() {
    var user = localStorage.getItem('sift-user');
    if (!user) {
      h.setUser(function(dbUser) {
        localStorage.setItem('sift-user', dbUser);
      })
    }
  }

  renderSelection(selected) {
    let selection = this.state.selections[selected]
    return (
      <Selections onSubmit={this.onSubmit.bind(this)} selection={selection}/>
    )
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
        <Paper className='selectionList'>
          <div>
            <Selections
            removeFromList={this.removeFromList.bind(this)}
            selections={this.state.selections}/>
          </div>
        </Paper>
      </div>
    )
  }
}

export default DataEntry