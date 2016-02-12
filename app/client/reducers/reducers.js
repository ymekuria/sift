
//reducers
import all from '../data/menu_options_all.js'
import by_category from '../data/menu_options_by_category.js'
import by_item from '../data/menu_options_by_item.js'
import db_query_template from '../data/db_query_template.js'
import Immutable from 'immutable'
import { createTable } from '../utils/utils.js'
import store from '../store.jsx'
import swal from 'sweetalert'
import { Notification } from 'react-notification'

require("../../node_modules/sweetalert/dist/sweetalert.css");
require("../../node_modules/sweetalert/themes/google/google.css");

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
  dataVisTable: '',
  loading: false
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
          var filteredName = action.tablename.replace(/[^a-zA-Z0-9]/g, '')
          obj['tablename'] = filteredName;
          return obj;
        })
        .updateIn(['MenuOptions', 'tableName'], tname => {
          return action.tablename;
        }).toJS()
        )
    case 'adding_vis_table':
      return (
        Immutable.fromJS(state)
        .updateIn(['dataVisTable'], currentTable => {
          return action.newTable;

        }).toJS()
      )
    case 'toggle_loading':
      return (
        Immutable.fromJS(state)
        .updateIn(['loading'], loading => {
          console.log('in loading', loading)
          return false;
        }).toJS()
      )

    //======submitting table======//
    case 'submit_table':

      if (state.MenuOptions.tableName === '') {
        swal('Enter table name!')
        console.log('nope')

      } else {

        //create our table
        createTable(state.BuildOrder)
        .then(function (res) {
          store.dispatch({type:'toggle_loading'});
          swal('table saved!');
        })

        //modify state
        return (
          Immutable.fromJS(state)
          .updateIn(['MenuOptions', 'tableName'], tname => {
            return ''
          })
          .updateIn(['BuildOrder'], order => {
            return {}
          })
          .updateIn(['CurrentSelections'], sel => {
            return [];
          })
          .updateIn(['loading'], load => {
            return true;
          }).toJS()
        )
      }

      return state;

    //=======default return state======//
    default:
      return state;
  }

}
export default buildTable;
