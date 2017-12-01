import React from 'react';
import _ from 'lodash';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/save';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

const submitStyle = {
  position: 'relative',
  right: '20px',
  width: '220px',
  marginRight: '60px'
};
const progStyle = {
  marginLeft: '70px'
};

const Selections = ({ selected, loading }, { store }) => {

  const hasLoaded = false;

  const load = loading => {
    if (loading) {
      return <CircularProgress style={progStyle} size={0.5} />;
    } else {
      return (
        <div className="selectionBody">
          <ul className="list">
            {selected.map((item, i) => {
              return (
                <li
                  className="listItem"
                  onClick={() => {
                    store.dispatch({
                      type: 'remove_from_list',
                      id: i
                    });
                  }}
                >
                  <div className="listItemText">{item}</div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="selectionHeader">
        <RaisedButton
          style={submitStyle}
          label="Create Table"
          secondary={true}
          onClick={() => {
            store.dispatch({
              type: 'submit_table'
            });
          }}
          tooltip="save"
        />
      </div>
      {load(loading)}
    </div>
  );
};

Selections.contextTypes = {
  store: React.PropTypes.object
};

export default Selections;
