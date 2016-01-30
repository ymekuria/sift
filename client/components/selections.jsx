import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';
import RaisedButton from 'material-ui/lib/raised-button';

//refactor into css file
const style = {
  margin: '10px 10px 0 150px'
}
const buttonStyle = {
  marginLeft: '18px'
}


const Selections = ({
  selection,
  onSubmit
}) => {
  //these are held in closure and provide a temporary store
  //for our checked values, when the submit button is clicked
  //we will refer to currently checked and send this information
  //to the database
  let currentlyChecked = {};
  console.log(selection)
  let recordCheck = (e, value) => {
    if (e.target.checked) {
      currentlyChecked[value] = true;
      console.log(value, currentlyChecked);
    } else {
      currentlyChecked[value] = false;
    }
  }

  return (
    <div>
      <List style={style}>
        {Object.keys(selection).map((key) => {
          return (
            <ListItem 
            primaryText={key} 
            leftCheckbox={<Checkbox onClick={(e) => recordCheck(e, key)} value={key}/>} />
          ) 
        })}
        <RaisedButton 
        onClick={() => onSubmit(currentlyChecked)}
        labelColor='black' 
        backgroundColor='offwhite' 
        label="Create" 
        primary={true} 
        style={buttonStyle}/>
      </List>
    </div>
  )
}

//use the checked value on listItem checkbox to indicate
//which box is checked and - > which items we need to gather
//when we construct our data


export default Selections

