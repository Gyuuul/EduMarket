import axios from 'axios';

import { URL } from '../../lib/apis/constant/path';

export default async function getMyInfo() {
    const token= localStorage.getItem('Access Token')

    try {
        const res = await axios.get(`${URL}/user/myinfo`,{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        const data = await res.data;
        return data.user;

    } catch (error) {
        console.log(error);
    }
}
