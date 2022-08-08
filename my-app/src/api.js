import axios from "axios";



export const LoginAdmin =async (admin)=>{

    const {data} =await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrOp2BU2HGv_zHM1SEGFMMBDFo9SV4iKU',
    { email: admin.email, password: admin.password, returnSecureToken: true }
    );
    return data

}

export const CategoryPost = async (Category) => {
    const data = await axios.post('https://reactproject2-f3a27-default-rtdb.firebaseio.com/Category.json',
        Category

    )
    return data;
}


export const GetCategory = async () => {
    const { data } = await axios.get('https://reactproject2-f3a27-default-rtdb.firebaseio.com/Category.json');
    const categoryList = []
    for (let key in data) {
        data[key].id = key
        categoryList.push(data[key])
    }
    return categoryList;
}

export const PostStatus = async (product) => {
    let { data } = await axios.put(`https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct/${product.id}.json`, 
    product
    )
    console.log(data);
    return data;

}




export const DeleteCategory = async (id) => {
    let { data } = await axios.delete(`https://reactproject2-f3a27-default-rtdb.firebaseio.com/Category/${id}.json`)
    return data;
}

export const DeleteAltCategory = async (findTopMenu) => {
    for(let i = 0; i < findTopMenu.length; i++) {
        let {data} = await axios.delete(`https://reactproject2-f3a27-default-rtdb.firebaseio.com/Category/${findTopMenu[i].id}.json`);
    }
    // return data;
}





export const ProductData = async () => {
    let { data } = await axios.get('https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct.json')
    let getData = [];
    for(let key in data){
        data[key].id = key;
        getData.push(data[key]);
    }
    return getData;

}