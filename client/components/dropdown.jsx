import React, { Component } from 'react';
import Select from 'react-select';
import all from '../data/subSelections.js'
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


class Dropdown extends Component {
  constructor(props) {
    super(props);

  let subSelections = this.props.categories.reduce(function (prev, category) {
    prev[category.value] = category.children;
    return prev;
  }, {})

    this.state = {
      selectValue: '',
      subSelections: subSelections
    }
  }

  updateValue (newValue, single) {
    let subSelections = this.state.subSelections[newValue];
    this.setState({
      selectValue: newValue
    });
  }


  render () {
    //make it so that options searches for all values
    let options = this.props.categories;
    let categories = this.state.subSelections;
    let subSelections = this.state.subSelections[this.state.selectValue];
    let currentCategory = this.state.selectValue;
    let addToList = this.props.addToList;
    let updateValue = this.updateValue.bind(this);
    return (
      <div className="section dropdown">
        <div className='libHeader'>
          <h3>Library</h3>
        </div>
        <div className='selectField'>
          <Select className='search' ref="categorySelect" options={all.subSelections} simpleValue clearable={true} name="category" value={this.state.selectValue} onChange={this.updateValue.bind(this)} searchable={true} />
            {_.map(subSelections, function (subSelection) {
              return (
                <div className='add'>
                  <IconButton onClick={() =>{addToList(subSelection, currentCategory)}}>
                    <ContentAdd/>
                  </IconButton>
                  <div className='addLabel'>{subSelection}</div>
                </div>
              )
            })}
        </div>
          <Menu style={{width: '200px'}}>
            {Object.keys(categories).map(function (category) {
              console.log(categories)
              return (
                <MenuItem
                  onClick={() => { updateValue(category) }}
                  primaryText={category}/>
              )
            })}
          </Menu>
      </div>
    );
  }
};
Dropdown.propTypes = {
  label: React.PropTypes.string,
  searchable: React.PropTypes.bool,
}
Dropdown.defaultProps = {
  label: 'Options:',
  searchable: true,
}


module.exports = Dropdown;