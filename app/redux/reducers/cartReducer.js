

import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../actions/types';
import axios from 'axios';
import property from '../../../config'
import { Switch } from 'native-base';

const initialState = {

    cart: [],
    total: 0,
}
export default function (state = initialState, action) {

    if (action.type === ADD_TO_CART) {
        // alert("ADD_TO_CART function")
        let addedItem = action.payload

        const data = state.cart.filter(function (item) {
            return item._id == addedItem._id;
        })

        if (data.length == 1) {
            // addedItem.quantity += 1
            // const remove = state.cart.filter(function (item) {       //  remove ones added item
            //     return item._id !== addedItem._id;
            // })
            alert(' item alrady added')
            return {
                ...state,
                total: state.total,
                cart: state.cart
            }
        }
        if (data.length == 0) {
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price

            return {

                ...state,
                cart: [...state.cart, addedItem],
                total: newTotal

            }
        }

    }

    else if (action.type === EMPTY_CART) {
        return {
            ...state,
            cart: [],
            total: 0
        }
    }

    else if (action.type === REMOVE_FROM_CART) {
        // alert("REMOVE_FROM_CART function")
        let removeItem = action.payload
        // let removeQuantity = removeItem.quantity         //      work
        // let removePrice = removeItem.price
        // let mul = removeQuantity * removePrice
        // let new_total = state.total - mul
        let new_total = state.total - removeItem.price * removeItem.quantity

        return {
            ...state,
            cart: state.cart.filter((item) => item !== action.payload),
            total: new_total
        }

    }

    //INSIDE CART COMPONENT


    else if (action.type === ADD_QUANTITY) {

        // alert("ADD_QUANTITY function"))
        let addedItem = state.cart.find(item => item !== action.payload)
        // alert(addedItem)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }

    else if (action.type === SUB_QUANTITY) {

        let addedItem = state.cart.find(item => item !== action.payload)

        if (addedItem.quantity === 1) {
            alert("Only 1 Quqtity Left, It Has To Be Deleted")
            // let new_cart = state.cart.filter(item => item !== action.payload)
            // let newTotal = state.total - addedItem.price
            return {
                ...state,
                // cart: new_cart,
                // total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }

    else {
        return state
    }
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
