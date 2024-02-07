import React from 'react'
import styled from 'styled-components'

export default function Footer() {
    return (
        <>
            <FooterDiv>
                <Tail>
                    <Logo>EDUKET</Logo>
                </Tail>
            </FooterDiv>
        </>
    )
}
const FooterDiv= styled.div`
    position: relative;
    width: 100%;
    height: 120px;
    bottom: 0;
    padding: 60px 20px 80px;
    background: #A73121;
    color: #ffffff;
    box-sizing: border-box;
`
const Tail= styled.div`
    position: relative;
    max-width: 1750px;
    margin: 0 auto;
    text-align: center;
`
const Logo= styled.p`
    font-family: "Pretendard-600";
    font-size: 30px;
    color: #ffffff;
    text-align: center;
    letter-spacing: -1.5px;
`