import React, { useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path';
import heart from '../../assets/icons/icon/Heart.webp'
import fillHeart from '../../assets/icons/icon/FillHeart.webp'

export default function Heart({ postId, data }) {
    const userToken= localStorage.getItem('Access Token');
    const [isLike, setIsLike] = useState(data.hearted);
    const [likeCount, setLikeCount] = useState(data.heartCount);
    
    const handle= async()=> {
        if(isLike){
            const res= await axios.delete(`${URL}/post/${postId}/unheart`,{
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                }
            })
            setIsLike(res.data.post.hearted);
            setLikeCount(res.data.post.heartCount);
        }else{
            const res= await axios.post(`${URL}/post/${postId}/heart`,[], {
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                }
            })
            setIsLike(res.data.post.hearted);
            setLikeCount(res.data.post.heartCount);
        }
    }
    return (
        <>
            <Div>
                <Button onClick={(e)=>{
                    e.preventDefault();
                    handle();
                }} aria-label="좋아요 기능">
                    {isLike ? <Img src={fillHeart} alt="색이 채워진 하트"/>: <Img src={heart} alt="색이 안 채워진 하트"/>}
                </Button>

                <LikeMent>
                    {likeCount}
                </LikeMent>
            </Div>
        </>
    );
}
const Div= styled.div`
    display: flex;
`
const Button= styled.button`
    background-color: transparent;
`
const Img= styled.img`
    width: 70px;
    height: 70px;
    margin-left: -20px;
`
const LikeMent= styled.p`
    margin-top: 28px;
    margin-left: -16px;
    font-size: 14px;
    line-height: 10px;
    color: #777;
`