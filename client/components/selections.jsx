import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import _ from 'lodash';

const Selections = ({ selected }, { store }) => {
  return (
    <div>
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

