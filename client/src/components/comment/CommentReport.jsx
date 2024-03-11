import React, { useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path'
import MoreButton from '../../assets/icons/icon/icon-more.webp'

export default function CommentReport({commentId, postId}) {
    const [visible, setVisible]= useState(false);
    const userToken= localStorage.getItem('Access Token');

    const Report= async()=> {
        await axios.post(`${URL}/post/${postId}/comments/${commentId}/report`, [],{
            headers: {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }
        });
        setVisible(!visible);
    }

    return (
        <div>
            {visible && (
                <ToggleWrapper>
                    <ReportTitle onClick={() => Report()}>
                        <P>신고</P>
                    </ReportTitle>
                </ToggleWrapper>
            )}
            <Img onClick={() => setVisible(!visible)} src={MoreButton} alt="댓글 신고 토글 이미지" />
        </div>
    )
}
const Img = styled.img`
    cursor: pointer;
`
const ReportTitle = styled.div`
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
    border-radius: 10px;
    border-top-right-radius: 0;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;
`