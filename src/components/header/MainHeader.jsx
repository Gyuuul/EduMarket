import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default function MainHeader() {
    return (
        <HeaderStyle>
            <Nav1>
                <LogHaeder>
                    <Logo to={`/`} aria-label="홈">
                        EDUKET
                    </Logo>
                    <Ul1>
                        <Li1>
                            <Link1 to={`/login`} aria-label="로그인 페이지">
                                login
                            </Link1>
                        </Li1>

                        <Li1>
                            <Link1 to={`/signup`} aria-label="회원가입 페이지">
                                join
                            </Link1>
                        </Li1>    
                    </Ul1>
                </LogHaeder>
            </Nav1>

            <Nav2>
                <NavHeader />
            </Nav2>
        </HeaderStyle>
    )
}

const HeaderStyle= styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    z-index: 10;
    background: #fff;
`
const Nav1= styled.div`
    background: #ffffff;
    width: 100%;
    padding: 0 20px;
    margin: 0 auto;
`
const LogHaeder= styled.div`
    height: 60px;
    padding: 0 0;
    margin: 0 auto;
    max-width: 1700px;
`
const Logo= styled(Link)`
    color: #A73121;
    letter-spacing: -1.5px;
    width: 200px;
    float: left;
    padding: 15px 0 0 0;
    font-family: "Pretendard-600";
    font-size: 25px;
`
const Ul1= styled.ul`
    display: flex;
    float: right;
    font-size: 14px;
    padding: 20px 30px 0 0;
    margin: 0;
    gap: 10px;
`
const Li1= styled.li`
    padding: 0 10px 0;
`
const Nav2= styled.div`
    background: #A73121;
    width: 100%;
    padding: 0 20px;
`
const NavHeader= styled.div`
    max-width: 1700px;
    height: 60px;
    margin: 0 auto;
`
const Link1 = styled(Link)`
    color: #A73121;
    text-decoration: none;
    font-family: "Pretendard-normal";
`



