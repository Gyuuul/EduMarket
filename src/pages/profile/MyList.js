import axios from 'axios';
import { URL } from '../../lib/apis/constant/path';

const token = localStorage.getItem('Access Token');
const accountname = localStorage.getItem('Account Name');

export const getMyStudyList= async()=>{
    const res= await axios.get(`${URL}/product/${accountname}/?limit=10&skip=0`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return res?.data?.product;
}

export const getMyPostList= async()=>{
    const res= await axios.get(`${URL}/post/${accountname}/userpost/?limit=10&skip=0`, {
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return  res?.data?.post;
}

