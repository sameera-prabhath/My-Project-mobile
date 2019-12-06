import { FETCH_PRODUCTS } from './types';
// import { getProducts } from '../../../app/data';


import axios from 'axios';
import property from '../../../config'

export const fetchProducts = () => dispatch => {
 
    
   
    axios.get(`${property.BASE_URL}productlist`)
    .then(res => {
        const books = res.data;
        dispatch({
            type: FETCH_PRODUCTS,
            payload: books,
           
        })
   
    
    }).catch((error) => {
        console.error(`Error is : ${error}`);
    });
   

}


