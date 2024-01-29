import axios from 'axios';
import { URL } from '../../lib/apis/constant/path';

const token = localStorage.getItem('Access Token');

export const getDelete= async(Id)=>{
    await axios.delete(`${URL}/product/${Id}`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
}

export const getStudyList= async(accountname)=>{
    const res= await axios.get(`${URL}/product/${accountname}/?limit=10&skip=0`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return res.data?.product;
}