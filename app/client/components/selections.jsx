import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import _ from 'lodash';

const listStyle = {
}




const Selections = ({ selected }, { store }) => {

  return (
    <div>
      <div className='selectionHeader'>
        <h3>Selections</h3>
        <TextField hintText="Name your table" floatingLabelText="Tablename" onBlur={(e) => {
          store.dispatch({
            type: 'add_tablename',
            tablename: e.target.value
          })
        }}/>
        <ul className='list'>
          {selected.map((item, i) => {
            return (
              <li className='listItem'>
                <div className='listItemContent'>
                  <div>{item}</div>
                  <div onClick={() => {
                    store.dispatch({
                      type: 'remove_from_list',
                      id: i
                    })
                  }}  
                  className='remove'>{'x'}</div>
                </div>
                <Divider/>
              </li>
            ) 
          })}
        </ul>
        <RaisedButton
          label="Create Table"
          onClick={() => {
            store.dispatch({
            type: 'submit_table'
          })}} 
          tooltip='save'>
        </RaisedButton>
      </div>
    </div>
  )
}

Selections.contextTypes = {
  store: React.PropTypes.object
}

export default Selections


