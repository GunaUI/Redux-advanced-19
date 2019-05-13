## Async Actions

### Utility Methods
* Utility methods are kind of wrappers or services ... which let us to do the changes with less code. 
* we have already split action creators into multiple files but still it has long switch case in reducer.
* Create a new file utility inside store folder.
```jsx
    export const updateObject = (oldObject, updatedValues) => {
        return {
            // distributing old object properties
            ...oldObject,
            // distributing new javascript object properties
            ...updatedValues
        }
    };
```
* Use the above utility method in couter.js reducer file
```jsx
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            // const newState = Object.assign({}, state);
            // newState.counter = state.counter + 1;
            // return newState;
            return updateObject(state, {counter: state.counter + 1});
        case actionTypes.DECREMENT:
            // return {
            //     ...state,
            //     counter: state.counter - 1
            // }
            return updateObject(state, {counter: state.counter - 1});
        case actionTypes.ADD:
            // return {
            //     ...state,
            //     counter: state.counter + action.val
            // }
            return updateObject(state, {counter: state.counter + action.val});
        case actionTypes.SUBTRACT:
            // return {
            //     ...state,
            //     counter: state.counter - action.val
            // }
            return updateObject(state, {counter: state.counter - action.val});
    }
    return state;
};

export default reducer;
```
* This is convinent way of doing update object. This utility function we can added to make our utility function little bit leaner.
* similarly we could add the same leaner logics to result.js reducer also.

```jsx
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


const initialState = {
    results: []
};

const deleteResult = ( state, action ) => {
    const updatedArray = state.results.filter( result => result.id !== action.resultElId );
    return updateObject( state, { results: updatedArray } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT : 
            return updateObject( state, { results: state.results.concat( { id: new Date(), value: action.result * 2 } ) } );
        // here we added deleteResult function which is outsoured (ouside of reducer funcation)
        case actionTypes.DELETE_RESULT : 
            return deleteResult(state, action);
    }
    return state;
};

export default reducer;
```
* Refer https://redux.js.org/ for more clarification just read and go throw once for best practices...



