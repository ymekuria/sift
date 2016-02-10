
//reducers
import all from '../data/menu_options_all.js'
import by_category from '../data/menu_options_by_category.js'
import by_item from '../data/menu_options_by_item.js'
import db_query_template from '../data/db_query_template.js'
import Immutable from 'immutable'
import { createTable } from '../utils/utils.js'

const initialState = {
  MenuOptions: {
    currentCategory: 'names',
    all: all.all,
    byItem: by_item.items,
    byCategory: by_category.categories,
    tableName: ''
  },
  CurrentSelections: [],
  BuildOrder: {},
  dataVisTable: ''
}

const buildTable = (state = initialState, action) => {
  switch(action.type) {

    //======updating category to (re-renders option option list)======//
    case 'update_category':
      let stateRef = Immutable.fromJS(state);
      let newState = stateRef.updateIn(['MenuOptions', 'currentCategory'], c => {
        return action.newCategory;
      })
      return newState.toJS();

    //======adding to build order (and to current selections)======//
    case 'add_to_build':
     return (Immutable.fromJS(state)
      .updateIn(['BuildOrder'], sel => {

        sel = sel.toJS();

        if (!sel[action.category]) {
          sel[action.category] = {};
          sel[action.category][action.addition] = true;
        } else {
          sel[action.category][action.addition] = true;
        }
        return sel;
      })
      .updateIn(['CurrentSelections'], list => {
        return list.push(action.addition)
      }).toJS()
    );

    //======removing from currently selected======//
    case 'remove_from_list':
      return (
        Immutable.fromJS(state)
        .updateIn(['CurrentSelections'], list => {
          return list.splice(action.id, 1)   
        }).toJS()
      )


    //======removing from currently selected======//
    case 'add_tablename':
      return (
        Immutable.fromJS(state)
        .updateIn(['BuildOrder'], obj => {
          console.log('in here', obj);
          obj = obj.toJS();

          obj['tablename'] = action.tablename
          return obj;
        }).toJS() 
        ) 
    case 'adding_vis_table':
      return (
        Immutable.fromJS(state)
        .updateIn(['dataVisTable'], currentTable => {
          return action.newTable;

        }).toJS()
      )

    //======submitting table======//
    case 'submit_table':
      console.log('submitting table..?', state.BuildOrder)
      createTable(state.BuildOrder);
      //hook into backend!
      //here we handle the post to our database
      return state;

    //=======default return state======//
    default: 
      return state;
  }
   
}
export default buildTable;

