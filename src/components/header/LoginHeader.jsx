import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function LoginHeader() {
    return (
        <>
            <LoginDiv>
                <LogoLink to={`/`} aria-label="로그인 페이지">
                    <h1>EDUKET</h1>
                </LogoLink>
            </LoginDiv>
        </>
    )
}
const LoginDiv= styled.div`
    width: 600px;
    margin: 0 auto;
    padding-top: 30px;
`
const LogoLink= styled(Link)`

    & h1 {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #efefef;
        font-family: "Pretendard-600";
        letter-spacing: -1.5px;
        line-height: 55px;
        text-align: center;
        color: #A73121;
    }
`











