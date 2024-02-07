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
    background: #fff;
    z-index: 10;
`
const Nav1= styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    background: #ffffff;
`
const LogHaeder= styled.div`
    max-width: 1700px;
    height: 60px;
    margin: 0 auto;
    padding: 0 0;
`
const Logo= styled(Link)`
    float: left;
    width: 200px;
    padding: 15px 0 0 0;
    font-family: "Pretendard-600";
    font-size: 25px;
    color: #A73121;
    letter-spacing: -1.5px;
`
const Ul1= styled.ul`
    display: flex;
    float: right;
    gap: 10px;
    margin: 0;
    padding: 20px 30px 0 0;
    font-size: 14px;
`
const Li1= styled.li`
    padding: 0 10px 0;
`
const Nav2= styled.div`
    width: 100%;
    padding: 0 20px;
    background: #A73121;
`
const NavHeader= styled.div`
    max-width: 1700px;
    height: 60px;
    margin: 0 auto;
`
const Link1 = styled(Link)`
    font-family: "Pretendard-normal";
    color: #A73121;
    text-decoration: none;
`



