import axios from 'axios';

import { URL } from '../../lib/apis/constant/path';

export default async function getUserProfile(accountname) {
    const userToken= localStorage.getItem('Access Token');

    const res= await axios.get(`${URL}/profile/${accountname}`,{
        headers:{
            "Authorization" : `Bearer ${userToken}`,
            "Content-type" : "application/json"
        }
    })
    return res.data.profile;
}
