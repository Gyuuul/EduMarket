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
    color: #ffffff;
    background: #A73121;
    padding: 60px 20px 80px;
    position: relative;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    height: 120px;
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