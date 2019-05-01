## Redux Advanced concepts

### Middleware

* Before we dive into running asynchronous code, let me dive into a super important advanced concept we have when working with redux

*  I always mean redux the package on its own, be that connected to your react app or not. You may add middleware to it right between your action being dispatched and it reaching the reducer, this is where you can add middleware.

* Middleware basically is a term used for functions or the code general you hook into a process which then gets executed as part of that process without stopping it. (Refer Image attached.. 1.png and 2.png)

* we can add middleware and the action will still reach the reducer thereafter but we can do something with that action before it reaches the reducer, that can be simply logging something,but that will also become important later when we want to execute asynchronous code,

* so for now, let's see middleware in action by adding it to our project. 

* we are creating store in index.js let us add some simple middleware functions and hook it with our store.
```jsx
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};
```
* next is simply a function passed into the middleware (by Redux) which you need to call to "forward" the action. Otherwise, it will not proceed to the next middleware in line (or to the reducer ultimately).

* then we have to import applyMiddleware from redux.

```jsx
import { createStore, combineReducers, applyMiddleware} from 'redux';
```
* "applyMiddleware" allows us to add our own middleware to the store.
```jsx
const store = createStore(rootReducer, applyMiddleware(logger));
```
* So here in create store where we initialize the store,we can add more arguments and the second argument here can be a so-called enhancer.

* Now this enhancer is nothing else than a middleware for example,so here we can call applyMiddleware and now we can pass our logger constant which holds this function

* Actually, you can pass a list of middlewares here to applyMiddleware

## Redux Dev Tools

* Install redux and follow the instuctions https://github.com/zalmoxisus/redux-devtools-extension#usage 

* After install import composer from react

```jsx
  import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
```



