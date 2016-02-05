//reducers
import all from '../data/menu_options_all.js'
import by_category from '../data/menu_options_by_category.js'
import by_item from '../data/menu_options_by_item.js'
import db_query_template from '../data/db_query_template.js'
import Immutable from 'immutable'
import { createTable } from '../utils/utils.js'

const initialState = {
  country: 'dataTypes',
  dataValue: '',
  tableValue: '',
  columnValue: '',
  completeTable: '',
  allColumns: {},
}

const customTable = (state = initialState, action) => {
  switch(action.type) {

  case 'updateValue':
      let stateRef = Immutable.fromJS(state);
      let newState = stateRef.updateIn(['dataValue'], c => {
        return action.newValue;
      })
      return newState.toJS();
  }

  case 'updateTable':
      let stateRef = Immutable.fromJS(state);
      let newState = stateRef.updateIn(['tableValue'], c => {
        return action.newValue;
      })
      return newState.toJS();
  }
  case 'updateColumn':
    let stateRef = Immutable.fromJS(state);
    let newState = stateRef.updateIn(['columnValue'], c => {
      return action.newValue;
    })
    return newState.toJS();
  }
  case 'addColumn':
    var columns = this.state.allColumns;
    columns[this.state.columnValue] = this.state.dataValue;
    let stateRef = Immutable.fromJS(state);
    let columns = stateRef.updateIn(['allColumns'], c => {
      return action.newValue;
    })
    return newState.toJS();
  }
  case 'addTable':
    let stateRef = Immutable.fromJS(state);
    let newState = stateRef.updateIn(['completeTable'], c => {
      return action.newValue;
    })
    return newState.toJS();
  }


}
export default customTable;
