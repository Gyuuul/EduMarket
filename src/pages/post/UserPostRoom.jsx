import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path';
import Slick from '../../components/slick/Slick';

export default function UserPostRoom() {
    const accountname= useParams().accountname;
    const navigate= useNavigate();
    const [pages, setPages] = useState(12);
    const [count, setCount]= useState(0);
    const [postList, setPostList]= useState([]);
    const token= localStorage.getItem('Access Token');

    useEffect(()=> {
        async function axiosPostList(){
            const res= await axios.get(`${URL}/post/${accountname}/userpost/?limit=${pages}&skip=0`, {
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "Content-type" : "application/json"
                }
            })
            const data= res?.data?.post;
            setPostList([...data]);
            setCount(data.length);
        }
        axiosPostList();
    }, [pages]);
    return (
        <>
            { postList.length ? (
                <PostDiv>
                    <PostTitle>User Post</PostTitle>
                    <Ul>
                        {postList.map((item)=>(
                            <Li>
                                <Div onClick={async(e) => {
                                    e.stopPropagation();
                                    navigate(`/post/detail/${item.id}`);
                                }}>
                                    {item?.image ? <Slick images={item?.image} /> : null}
                                    <p>{item?.content}</p>
                                </Div>
                            </Li>
                        ))}
                    </Ul>
                </PostDiv>
            )
            :
            (
                <Alert>
                    등록된 게시글이 없습니다.
                </Alert>
            )}  
        </>
    )
}
const PostDiv= styled.div`
    padding: 30px 0; 
    border-top: 1px solid rgba(0,0,0,0.09);
    border-bottom: 1px solid rgba(0,0,0,0.09);
`
const PostTitle= styled.p`
    font-family: "Frutiger-lt-pro-600";
    font-size: 30px;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    margin: 0 0 50px 0;
`
const Alert= styled.p`
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
    padding: 50px 0 30px;
`

const Ul= styled.ul`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0;
    margin: 0 0;
    line-height: 0;
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 50px 0;
    padding: 0 0 0;
    vertical-align: top;
`
const Div= styled.div`
    width: 300px;
    height: 400px;
    margin: 0 auto;
    padding: 12px 20px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;

    & img {
        width: 100%;
        height: 200px;
        margin-bottom: 30px;
        object-fit: cover;
    }

    & p {
        font-family: "Noto_Sans_KR-400";
        font-size: 17px;
        font-weight: 500;
        margin-top: 20px;
        color: #777;
        line-height: 28px;
    }
`
