import * as actionTypes from "./actionTypes"
// export const storeResult = (res) => {
//     return {
//         type: STORE_RESULT,
//         result: res
//     };
// };

export const saveResult = ( res ) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

export const storeResult = ( res ) => {
    return (dispatch, getState )=> {
       // const oldCounter = getState().ctr.counter;
        // console.log(oldCounter);
        setTimeout( () => {
            dispatch(saveResult(res));
        }, 2000 );
    }
};


export const deleteResult = (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};