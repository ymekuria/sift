import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import _ from 'lodash';





const Selections = ({
  selections,
  onSubmit,
  removeFromList
}) => {

  let list = _.reduce(selections, function(acc, sub, category) {
    return acc.concat(_.map(sub, function (val, subCategory) {
      return [category, subCategory];
    }))
  }, []);

  return (
    <div>
      <h3>Selections</h3>
      <List>
        {list.map((item) => {
          let category = item[0];
          let subCategory = item[1];
          return (
            <ListItem className='listItem'>
              <div className='listItemContent'>
                {subCategory}
                <div onClick={() => {removeFromList(category, subCategory)}} className='remove'>{'x'}</div>
              </div>
              <Divider/>
            </ListItem>
          ) 
        })}
      </List>
    </div>
  )
}

export default Selections

