import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { getDelete } from './Post';

export default function PostDelete() {
    const { postId }= useParams();
    const navigate= useNavigate();

    return (
        <>
            <Button onClick={async ()=> {
                await getDelete(postId);
                navigate(`/myprofile`);
            }} aria-label="게시글 삭제">
                <P>삭제</P>
            </Button>
        </>
    )
}
const Button= styled.button`
    background-color: transparent;
`
const P= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
`
