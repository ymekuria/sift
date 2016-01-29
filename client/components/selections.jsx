import React from 'react'
import { FloatingActionButton, ContentAdd } from 'material-ui'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';
//refactor into css file
const style = {
  margin: '10px 10px 0 150px'
}


const Selections = ({
  selection
}) => {
  return (
    <div>
      <List style={style}>
        {Object.keys(selection).map((i, s) => {
          return (
            <ListItem 
            primaryText={i} 
            leftCheckbox={<Checkbox />} />
          ) 
        })}
      </List>
    </div>
  )
}

export default Selections

