import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path';

export default function StudyDelete() {
    const {productId}= useParams();
    const navigate= useNavigate();
    const userToken= localStorage.getItem('Access Token');

    async function Delete(){
        const res= await axios.delete(`${URL}/product/${productId}`, {
            headers: {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }
        })
    }
    return (
        <div>
            <Button onClick={async ()=> {
                await Delete();
                navigate(`/myprofile`)
            }}>
                <P>삭제</P>
            </Button>
        </div>
    )
}
const Button= styled.button`
    background-color: transparent;
`
const P= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
`