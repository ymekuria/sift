import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

const ListExampleSettings = () => (
  <div>
    <List subheader="Hangout notifications">
      <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
      <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
      <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
    </List>
  </div>
);

export default ListExampleSettings;