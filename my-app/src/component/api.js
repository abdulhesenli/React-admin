// import React from 'react';
import axios from "axios";

export const getData = async () => {
    const { data } = await axios.get('https://reactproject-default-rtdb.firebaseio.com/products.json');
    const dataList = []
    for (let key in data) {
        data[key].id = key
        dataList.push(data[key])
        console.log(dataList);
    }
    return dataList;

}


// export const Poststatus = async (product) => {
//     console.log(product);
//     const data = await axios.put(`https://reactproject-e0c89-default-rtdb.firebaseio.com/products/${product.id}.json`,
//         product
//     );
//     console.log(data);

//     return data;
// }
