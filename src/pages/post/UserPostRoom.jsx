import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Slick from '../../components/slick/Slick';
import { getUserPost } from './Post';

export default function UserPostRoom() {
    const accountname= useParams().accountname;
    const navigate= useNavigate();
    const [postList, setPostList]= useState([]);

    useEffect(()=> {
        const userPost= async()=> {
            const data= await getUserPost(accountname)
            setPostList([...data]);
        }
        userPost();
    }, []);

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
            ):(
                <Alert>등록된 게시글이 없습니다.</Alert>
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
    margin: 0 0 50px 0;
    font-family: "Frutiger-lt-pro-600";
    font-size: 30px;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
`
const Alert= styled.p`
    padding: 50px 0 30px;
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
`
const Ul= styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
    line-height: 0;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }   
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 50px 0;
    padding: 0 0 0;
    vertical-align: top;
    @media screen and (max-width: 1200px) {
        flex: 0 0 33.5%;
    }
    @media screen and (max-width: 1100px) {
        flex:0 0 50%;
    }
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`
const Div= styled.div`
    width: 300px;
    height: 400px;
    margin: 0 auto;
    padding: 12px 20px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    background-color: #f1f2f3;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    & img {
        width: 100%;
        height: 200px;
        margin-bottom: 30px;
        object-fit: cover;
    }
    & p {
        margin-top: 20px;
        font-family: "Noto_Sans_KR-400";
        font-size: 17px;
        font-weight: 500;
        color: #777;
        line-height: 28px;
    }
`
