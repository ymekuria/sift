import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Selections from './selections.jsx'
import TextField from 'material-ui/lib/text-field';
/*
  == Material UI componenets ==
*/
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { Menu, MenuItem} from 'material-ui';
import Paper from 'material-ui/lib/paper'



const testStyle = {
  width: "40%",
  height: "400px",

}


const Dropdown = ({ menuOptions, currentSelections }, { store }) => {

  const { all } = menuOptions;                
  const { byItem } = menuOptions;
  const { currentCategory } = menuOptions;
  const { byCategory } = menuOptions;
  const subSelection = all[currentCategory]

  return (
    <div className="dropdown">
      <div className='libHeader'>
        <h3>Library</h3>
          <TextField hintText="Name your table" floatingLabelText="Tablename" onBlur={(e) => {
            store.dispatch({
              type: 'add_tablename',
              tablename: e.target.value
            })
          }}/>
      </div>

      <div className='createContainer'>
        <Menu style={{width: '200px'}}>
          {Object.keys(all).map(function (category) {
            return (
              <MenuItem
                onClick={() => {store.dispatch({
                  type: 'update_category',
                  newCategory: category
                })}}
                primaryText={category}/>
            )
          })}
        </Menu>
        <div className='selectField'>
            {_.map(subSelection, function (subSelection, c) {
              return (
                <div className='add'>
                  <IconButton onClick={() => store.dispatch({
                    type: 'add_to_build',
                    category: currentCategory,
                    addition: c
                  })}>
                    <ContentAdd color="green"/>
                  </IconButton>
                  <div className='addLabel'>{c}</div>
                </div>
              )
            })}
        </div>
        <Paper className='selectionList'>
          <div>
            <Selections selected={currentSelections}/>  
          </div>
        </Paper>

      </div>
    </div>
  );
};
Dropdown.contextTypes = {
  store: React.PropTypes.object
}

module.exports = Dropdown;
