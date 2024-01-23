import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path'
import MoreButton from '../../assets/icons/icon/icon-more.webp'

export default function CommentDelete({commentId, postId}) {
    const [visible, setVisible]= useState(false);
    const userToken= localStorage.getItem('Access Token');

    const Delete= async ()=> {
        await axios.delete(`${URL}/post/${postId}/comments/${commentId}`,{
                headers: {
                    "Authorization" : `Bearer ${userToken}`,
                    "Content-type" : "application/json"
                }
        });
        window.location.reload(false);
        setVisible(!visible);
    }

    return (
        <>
            {visible && (
                <ToggleWrapper>
                    <DeleteTitle onClick={() => Delete()}>
                        <P>삭제</P>
                    </DeleteTitle>
                </ToggleWrapper>
            )}
            <Img onClick={() => setVisible(!visible)} src={MoreButton} alt="댓글 삭제 토글 이미지" />
        </>
    )
}
const Img = styled.img`
    cursor: pointer;
`

const DeleteTitle = styled.div`
    cursor: pointer;
`
const P= styled.p`
    font-family: "Noto_Sans_KR-400";
`
const ToggleWrapper = styled.section`
    position: absolute;
    width: 100px;
    right: 50px;
    padding: 5px 0;
    background-color: white;
    border-radius: 10px;
    border-top-right-radius: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;
`