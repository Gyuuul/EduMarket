import axios from 'axios';

import { URL } from '../../lib/apis/constant/path'

export const getPostList= async (num) => {
    const token= localStorage.getItem('Access Token');
    
    const res= await axios.get(`${URL}/post/feed/?limit=${num}&skip=0`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return res?.data?.posts;
}
