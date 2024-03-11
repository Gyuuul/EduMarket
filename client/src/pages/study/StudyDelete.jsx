import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDelete } from './StudyAxios';

export default function StudyDelete() {
    const {productId}= useParams();
    const navigate= useNavigate();

    return (
        <div>
            <Button onClick={async ()=> {
                await getDelete(productId);
                navigate(`/myprofile`)
            }} aria-label="삭제">
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