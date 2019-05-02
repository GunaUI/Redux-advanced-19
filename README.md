## Async Actions

### Restructing Actions
* Now we are going to split up actions into multiple file just like reducers
* Refer counter, result and actionTypes file inside actions folder.
* Now i want one file that export all my action creators (index.js)

```jsx
// This is new syntax .. here we are exporting multiple files into one file, later we can import these details from one file..
export {
    add,
    subtract,
    increment,
    decrement
} from './counter';

export {
    storeResult,
    deleteResult
} from './result';

```
* Now we have to update these changes in our reducer and dispatch(counter.js inside container folder) file.

### Transforming Logic

* The action creators are the only place where we can execute the Asynchronous code. All you API calls should be done in action creators.

* We save our save result but in case if you want to update/Transform your result before it get save.
```jsx

export const saveResult = ( res ) => {
    //you can add transform logic...here 
    let updatedResult = res * 2 ;
    return {
        type: actionTypes.STORE_RESULT,
        result: updatedResult
    };
}

```
* You could do the same kind of tranforming logic in reducers too..
```jsx
 results: state.results.concat({id: new Date(), value: action.result * 2 })
```

#### what's better? Let's take a closer look.

* we have action creators and reducers as options.

* Now action creators as you learned are great for running async code when you dispatch an action,
 
* reducers on the other hand only are able to run synchronous code and are pure, input in updated state out.

* Reducers however keep that in mind, are meant to be the place where you update the state, this is one core redux concept. 

* Action creators are not core redux concept, a core concept are actions, these javascript objects with a type and a payload. So the reducer is the core concept and the whole idea behind redux is that the reducer is the only thing which updates the state, action creators shouldn't prepare the state too much

* for that reason because it should be the reducer which does the update but there of course is also a difference between updating the state which essentially just means returning a new object which makes up our state and changing the data which goes into the state.

* Still you can find arguments for both directions, I lean towards putting the logic into the reducer and not too much logic into the action creator.

* Asynchronous code has to go there but once you got back the data from the server you might need to reach out, you can of course transform it in the action creator and you should do that to a certain extent but once you've got data that is relatively clean, you should hand it off to the reducer.

* And if you then still need to manipulate it, for example by taking 8 times 2 or anything like that, in my opinion that should go into the reducer.

* Now you will also find arguments for the other side and in the end, it's your decision. If you chooseone approach, stick to it though, don't change it, don't put a lot of logic in one action creator, just to then have a lot of logic in another reducer.

* Be consistent and decide, where do you want to transform and prepare your data, the action creator or reducer, I recommend the latter but ultimately it's up to you, just take a consistent route.

* Refer 3.png image in refer folder for which is best place to add trasform logic


