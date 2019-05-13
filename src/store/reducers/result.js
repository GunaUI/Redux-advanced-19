import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    results: []
};

// const reducer = ( state = initialState, action ) => {
//     switch ( action.type ) {
//         case actionTypes.STORE_RESULT:
//         // Transform logic incase if you are trying to do..
//             return {
//                 ...state,
//                 results: state.results.concat({id: new Date(), value: action.result})
//             }
//         case actionTypes.DELETE_RESULT:
//             // const id = 2;
//             // const newArray = [...state.results];
//             // newArray.splice(id, 1)
//             const updatedArray = state.results.filter(result => result.id !== action.resultElId);
//             return {
//                 ...state,
//                 results: updatedArray
//             }
//     }
//     return state;
// };

const deleteResult = ( state, action ) => {
    const updatedArray = state.results.filter( result => result.id !== action.resultElId );
    return updateObject( state, { results: updatedArray } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT : return updateObject( state, { results: state.results.concat( { id: new Date(), value: action.result * 2 } ) } );
        case actionTypes.DELETE_RESULT : return deleteResult(state, action);
    }
    return state;
};

export default reducer;