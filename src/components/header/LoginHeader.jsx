import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function LoginHeader() {
    return (
        <>
            <LoginDiv>
                <Back></Back>
                <Logo>
                    <LogoLink to={`/`}>
                        <h1>EDUKET</h1>
                    </LogoLink>
                </Logo>
            </LoginDiv>
        </>
    )
}
const LoginDiv= styled.div`
    width: 600px;
    margin: 0 auto;
`
const Back= styled.button``
const Logo= styled.div``
const LogoLink= styled(Link)`

    & h1 {
        font-family: "Pretendard-600";
        letter-spacing: -1.5px;
        width: 100%;
        height: 80px;
        line-height: 55px;
        border-bottom: 1px solid #efefef;
        text-align: center;
        color: #A73121;
    }
`











