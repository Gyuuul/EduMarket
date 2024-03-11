import axios from 'axios';
import { URL } from "../../lib/apis/constant/path";

const token = localStorage.getItem('Access Token');
const accountName = localStorage.getItem('Account Name');

// 추천 팔로우 리스트 불러올 때 나의 팔로잉 불러오는 함수
export const getFollowingList= async (accountname) => {
    const res= await axios.get(`${URL}/profile/${accountname}/following?limit=100`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return res?.data;
}

// study 페이지에서 나의 팔로잉 스터디 보는 함수 
export const getStudyFollowingList= async (num) => {
    const res= await axios.get(`${URL}/profile/${accountName}/following/?limit=${num}&skip=0`, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    return res?.data;
}
