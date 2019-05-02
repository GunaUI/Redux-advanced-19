## Executing Async Code

### Action Creators

* how does that look like? What is that? 

* An action creator is just a function which returns an action or which creates an action,

* In actions.js
```jsx
export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};

export const add = (value) => {
    return {
        type: ADD,
        val: value
    };
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        val: value
    };
};

export const storeResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res
    };
};

export const deleteResult = (resElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resElId
    };
};
```
* Now we can get actions which is return from this function as follows.eg when we execute actionCreators.increment that will return actions.

```jsx
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};
```
### Handling Async Code

* Now I want to take advantage of them to handle asynchronous code and to handle asynchronous code, we need
to add a special middleware to our redux project,a third party library we can add called redux-thunk.

```jsx
npm install --save redux-thunk
```
* Generally, this is a library which as I just said adds a middleware to your project which allows your action creators to not return the action itself but return a function which will eventually dispatch an action. 

* Next we have register this as a middleware to our project. https://github.com/reduxjs/redux-thunk

* In index.js we have to import our new middleware
```jsx
import ReduxThunk from 'redux-thunk' 
...
...
// Apply this ReduxThunk middleware after the logger
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, ReduxThunk)));
```
* Now in action creators ie in action.js file.
```jsx
// export const storeResult = (res) => {
//     return {
//         type: STORE_RESULT,
//         result: res
//     };
// };

export const saveResult = ( res ) => {
    return {
        type: STORE_RESULT,
        result: res
    };
}
// Only after 2 sec we want to execute saveResult just to mimic async call like data once after saved only we will get response
export const storeResult = ( res ) => {
    return dispatch => {
        setTimeout( () => {
            // res is the payload to saveResult
            dispatch(saveResult(res));
        }, 2000 );
    }
};
```
* I said that middleware runs between the dispatching of an action and the point of time the action reaches the reducer,

* now the thing we do here is we still dispatch an action but then redux-thunk, the middleware comes in,steps in, has access to the action(logger) there,basically blocks the old action we could say and dispatches it again in the future "next(action)".

* Now the new action will reach the reducer but in-between, redux-thunk is able to wait because it can dispatch an action whenever it wants.This is the asynchronous part and that is exactly allowing us to execute some asynchronous code inside of this function.