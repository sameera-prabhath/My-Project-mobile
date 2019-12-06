

import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, ADD_QUANTITY, SUB_QUANTITY } from './types';

export const addToCart = (item) => dispatch => {

    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}
export const removeItem = (item) => dispatch => {
    // alert(item)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}
export const emptyCart = () => dispatch => {
    dispatch({
        type: EMPTY_CART
    })
}


export const addQuantity = (item) => dispatch => {
    // alert(item + 'cart action ')
    dispatch({
        type: ADD_QUANTITY,
        payload: item
    })
}


export const subtractQuantity = (item) => dispatch => {
    // alert(item + 'cart action ')
    dispatch({
        type: SUB_QUANTITY,
        payload: item
    })
}






//////////////////////////////////////////////////////////////////////////


// import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from './types';
// export const addToCart = (item) => dispatch => {
//     // alert(JSON.stringify(item))
//     dispatch({
//         type: ADD_TO_CART,
//         payload: item
//     })
//     // alert(JSON.stringify(item.productName))
// }
// export const removeItem = (item) => dispatch => {
//     dispatch({
//         type: REMOVE_FROM_CART,
//         payload: item
//     })
// }
// export const emptyCart = () => dispatch => {
//     dispatch({
//         type: EMPTY_CART
//     })
// }
