  import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/save';
import TextField from 'material-ui/lib/text-field';
import _ from 'lodash';

const Selections = ({ selected }, { store }) => {
  return (
    <div>
    <div className='selectionHeader'>
      <TextField hintText="Name Your Table " />
      <h3>Selections</h3>
      
      <IconButton
      onClick={() => {
        store.dispatch({
        type: 'submit_table',
        tableName: 'newTable'
      })}} 
      className='saveButton' 
      tooltip='save'>
        <ContentAdd/>
      </IconButton>
    </div>
      <List>
        {selected.map((item, i) => {
          return (
            <ListItem className='listItem'>
              <div className='listItemContent'>
                {item}
                <div onClick={() => {
                  store.dispatch({
                    type: 'remove_from_list',
                    id: i
                  })
                }} 
                className='remove'>{'x'}</div>
              </div>
              <Divider/>
            </ListItem>
          ) 
        })}
      </List>
    </div>
  )
}

Selections.contextTypes = {
  store: React.PropTypes.object
}

export default Selections

