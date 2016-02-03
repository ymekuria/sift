//reducers
import all from '../data/menu_options_all.js'
import by_category from '../data/menu_options_by_category.js'
import by_item from '../data/menu_options_by_item.js'
import db_query_template from '../data/db_query_template.js'
import Immutable from 'immutable'


//we want our state to look something like: 
/*
{
  MenuOptions: {
    menu_options_all: [],
    menu_options_category: []
  },
  dbPost: {}

}
*/

const initialState = {
  MenuOptions: {
    currentCategory: 'names',
    all: all.all,
    byItem: by_item.items,
    byCategory: by_category.categories
  },
  CurrentSelections: [],
  BuildOrder: {}
}

const buildTable = (state = initialState, action) => {
  switch(action.type) {
    //======adding to list======//
    case 'add_to_build':
     return (Immutable.fromJS(state)
      .updateIn(['BuildOrder'], sel => {

        sel = sel.toJS();
        console.log('selecsion', sel)
        if (!sel[action.category]) {
          sel[action.category] = {};
          sel[action.category][action.addition] = true;
        } else {
          sel[action.category][action.addition] = true;
        }
        return sel;
      })
      .updateIn(['CurrentSelections'], list => {
        //add a conditional for removal
        return list.push(action.addition)
        // return list;
      }).toJS()
    );

     //======removing from list======//
    case 'remove_from_list':
      return (
        Immutable.fromJS(state)
        .updateIn(['CurrentSelections'], list => {
          return list.splice(action.id, 1)   
        }).toJS()
      )
      //here we handle removing an item from the
      //list

    //======submitting table======//
    case 'submit_table':
    //hook into backend!
      return
      //here we handle the post to our database

   
    //======updating value======//
    case 'update_category':
      let stateRef = Immutable.fromJS(state);
      let newState = stateRef.updateIn(['MenuOptions', 'currentCategory'], c => {
        return action.newCategory;
      })
      return newState.toJS();

    default: 
      return state;
  }
}
export default buildTable;

// export const navigation = (state, action) => {
//   switch(action.type) {
//     case '/':
//     //navigate to home
//     case '/build':
//     //navigate to build
//     case: '/info'
//     //navigate to info
//     case: '/vis'
//     //navigate to datavis
//   }
// }