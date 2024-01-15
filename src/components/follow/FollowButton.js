import axios from 'axios'
import React from 'react'
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path'

export default function FollowButton({accountname, isfollow}) {
    const userToken= localStorage.getItem('Access Token');

    const handle= async ()=> {
        if(isfollow){
            /** 언팔로우 */
            const res= await axios.delete(`${URL}/profile/${accountname}/unfollow`, {
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                }
            })
            console.log(res);
        }
        else{
            /** 팔로우 */
            const res= await axios.post(`${URL}/profile/${accountname}/follow`,[],{
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                }
            })
            console.log(res);
        }
    }

    return (
        <>
            <Button onClick={handle}>
                {isfollow ? ' 팔로우' : '팔로잉'}
            </Button>
        </>
    );
}
const Button = styled.button`
    font-family: "Noto_Sans_KR-400";
    width: 170px;
    padding: 12px 16px;
    border-radius: 0.25rem;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`;
