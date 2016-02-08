import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';
/*
  == Material UI componenets ==
*/
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { Menu, MenuItem} from 'material-ui';


//react-select stylesheet
require('../css/select.css')


const Dropdown = ({ menuOptions }, { store }) => {

  const { all } = menuOptions;                
  const { byItem } = menuOptions;
  const { currentCategory } = menuOptions;
  const { byCategory } = menuOptions;
  const subSelection = all[currentCategory]

  return (
    <div className="section dropdown">
      <div className='libHeader'>
        <h3>Library</h3>
      </div>
      <div className='selectField'>
        <Select className='search'  simpleValue clearable={true} options={byItem}  name="category" searchable={true} />
          {_.map(subSelection, function (subSelection, c) {
            return (
              <div className='add'>
                <IconButton onClick={() => store.dispatch({
                  type: 'add_to_build',
                  category: currentCategory,
                  addition: c
                })}>
                  <ContentAdd/>
                </IconButton>
                <div className='addLabel'>{c}</div>
              </div>
            )
          })}
      </div>
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
    </div>
  );
};
Dropdown.contextTypes = {
  store: React.PropTypes.object
}


module.exports = Dropdown;