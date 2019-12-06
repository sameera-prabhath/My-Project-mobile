

import axios from 'axios';
import property from '../config'

export const getProducts = () => {

  axios.get(`${property.BASE_URL}productlist`)
    .then(res => {

      const data = res.data;
      return data;

    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });


}





