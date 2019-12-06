
import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';


export const fetchProducts = () => dispatch => {

    const products = getProducts();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: products
    })
    return products
}
