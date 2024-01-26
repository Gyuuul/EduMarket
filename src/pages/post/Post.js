import axios from 'axios';
import { URL } from '../../lib/apis/constant/path';

const token = localStorage.getItem('Access Token');

export const getDelete= async(Id)=>{
    await axios.delete(`${URL}/post/${Id}`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
}

export const getDetail= async( Id )=> {
    const res= await axios.get(`${URL}/post/${Id}`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    });
    return res.data?.post;
}
