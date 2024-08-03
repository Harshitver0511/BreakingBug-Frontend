import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    stuffAdded,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    productSuccess,
    productDetailsSuccess,
    getProductDetailsFailed,
    getProductsFailed,
    setFilteredProducts,
    getSearchFailed,
    sellerProductSuccess,
    getSellerProductsFailed,
    stuffUpdated,
    updateFailed,
    getCustomersListFailed,
    customersListSuccess,
    getSpecificProductsFailed,
    specificProductSuccess,
    updateCurrentUser,
} from './userSlice';

export const authUser = (fields, role, mode) => async (dispatch) => {
    console.log(fields,role,mode);
    
    dispatch(authRequest());
    
    try {
        console.log("working");
        
        const result = await axios.post(`https://breaking-bug-backend.vercel.app/${role}${mode}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        console.log(error);
        
        dispatch(authError(error));
    }
};

export const addStuff = (address, fields) => async (dispatch) => {
    console.log("working");
    

    try {
        dispatch(authRequest());
        console.log("working  till now");
        console.log(fields);
        
        const result = await axios.post(`https://breaking-bug-backend.vercel.app/${address}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("working  till now");
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {

    try {
        const result = await axios.put(`https://breaking-bug-backend.vercel.app/${address}/${id}`, fields, {

        });
        if (result.data.message) {
            dispatch(updateFailed(result.data.message));
        }
        else {
            dispatch(stuffUpdated());
        }

    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`https://breaking-bug-backend.vercel.app/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateCustomer = (fields, id) => async (dispatch) => {
    try{
        console.log("working");
        console.log(fields,id);
        
    dispatch(updateCurrentUser(fields));
    await axios.put(`https://breaking-bug-backend.vercel.app/CustomerUpdate/${id}`, fields);
        dispatch(stuffUpdated());
        console.log("next");
        
      } catch (error) {

        dispatch(getError(error));

    }

};

export const getProductsbySeller = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/getSellerProducts/${id}`);
        if (result.data.message) {
            dispatch(getSellerProductsFailed(result.data.message));
        }
        else {
            dispatch(sellerProductSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProducts = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/getProducts`);
        if (result.data.message) {
            dispatch(getProductsFailed(result.data.message));
        }
        else {
            dispatch(productSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/getProductDetail/${id}`);
        
        if (result.data.message) {
            dispatch(getProductDetailsFailed(result.data.message));
        }
        else {
            dispatch(productDetailsSuccess(result.data));
        }

    } catch (error) {
        dispatch(getError(error));
    }
}

export const getCustomers = (id,address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/${address}/${id}`);
        if (result.data.message) {
            dispatch(getCustomersListFailed(result.data.message));
        }
        else {
            dispatch(customersListSuccess(result.data));
        }

    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSpecificProducts = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/${address}/${id}`);
        console.log(result);
        
        if (result.data.message) {
            dispatch(getSpecificProductsFailed(result.data.message));
        }
        else {
            dispatch(specificProductSuccess(result.data));
        }

    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSearchedProducts = (address, key) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`https://breaking-bug-backend.vercel.app/${address}/${key}`);
        if (result.data.message) {
            dispatch(getSearchFailed(result.data.message));
        }
        else {
            dispatch(setFilteredProducts(result.data));
        }

    } catch (error) {
        dispatch(getError(error));
    }
}
