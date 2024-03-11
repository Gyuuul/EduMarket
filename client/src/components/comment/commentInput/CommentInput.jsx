import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../../lib/apis/constant/path';

export const CommentInput=({getComment, postId})=> {
    const [comment, setComment]= useState('');
    const [valid, setValid]= useState(false);
    const [authorImage, setAuthorImage]= useState('');
    const userToken= localStorage.getItem('Access Token');
    const accountName = localStorage.getItem('Account Name');
    
    const data= {
        comment: {
            content: comment,
        }
    }

    /** 댓글 작성자 이미지 불러오는 함수 */
    useEffect( ()=> {
        if(accountName){
            const res=  axios.get(`${URL}/profile/${accountName}`, {
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                },
            })
            .then((res)=> {
                setAuthorImage(res.data?.profile?.image);
            })
            .catch((error)=> {
                console.log(error);
            });
        }
    }, [accountName]);

    /** 댓글 작성 실시간 반영 함수 */
    const hadle= (e)=> {
        setComment(e.target.value);
    };

    /** 댓글 작성 유효성 함수 */
    const changeButton = (e) => {
        e.target.value.length > 0 ? setValid(true) : setValid(false);
    };

    /** 댓글 작성 함수 */
    const hadleSubmit= async (e)=> {
        e.preventDefault();

        const res= await axios.post(`${URL}/post/${postId}/comments`, data, {
            headers: {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }
        });
            setComment('');
            getComment();
    };

    return (
        <Div>
            <ProfileImg src={authorImage} alt="유저 프로필 이미지" />
            <Wrap>    
                <TextArea
                    type='text'
                    value={comment}
                    placeholder='댓글을 남겨주세요.'
                    onChange= {hadle}
                    onKeyUp={changeButton}
                />
                <Button onClick={hadleSubmit} aria-label="댓글 등록"> 게시 </Button>
            </Wrap>
        </Div>
    )
}
const Div= styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 30px 20px;
    border-top: 1px solid rgba(0,0,0,0.09);
    border-bottom: 1px solid rgba(0,0,0,0.09);
`
const Wrap= styled.div`
    display: flex;
    gap: 15px;
    flex-grow: 1;
    flex-direction: column;
`
const ProfileImg= styled.img`
    width: 32px;
    height: 32px;
    margin-top: -45px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`
const TextArea= styled.textarea`
    width: 100%;
    height: 26px;
    border: 1px solid transparent;
    font-family: "Noto_Sans_KR-400";
    font-size: 18px;
    resize: none;
    outline-color: transparent;
    &::placeholder{
        font-size: 20px;
    }
`
const Button= styled.button`
    width: 40px;
    height: 30px;
    margin-right: 10px;
    margin-left: auto;
    font-family: "Noto_Sans_KR-400";

`