import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash'
/*
  == Material UI componenets ==
*/
import Checkbox from 'material-ui/lib/checkbox'
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

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

  updateValue (newValue) {
    let subSelections = this.state.subSelections[newValue];
    this.setState({
      selectValue: newValue
    });
  }

  toggleCheckbox (e) {
    let newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState(newState);
  }

  render () {
    let options = this.props.categories
    let subSelections = this.state.subSelections[this.state.selectValue];
    let currentCategory = this.state.selectValue;
    let addToList = this.props.addToList;

    return (
      <div className="section dropdown">
        <h3 className="section-heading">{'Select Categories'}</h3>
        <Select ref="categorySelect" options={options} simpleValue clearable={true} name="category" value={this.state.selectValue} onChange={this.updateValue.bind(this)} searchable={true} />

        <div className='selectField'>
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