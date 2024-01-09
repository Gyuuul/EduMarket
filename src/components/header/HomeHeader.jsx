import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'

import { setMyInfo } from '../../store/slice/userSlice';

export default function HomeHeader() {
    const dispatch= useDispatch();
    function logout(){
        (function resetUser() {
            dispatch(
                setMyInfo({
                    _id: '',
                    username: '',
                    isfollow: false,
                    intro: '',
                    image: '',
                    followingCount: '',
                    following: [],
                    followerCount: 0,
                    follower: [],
                    accountname: '',
                })
            )
        })();
        localStorage.clear();
    }
    return (
        <HeaderStyle>
            <Nav1>
                <LogHaeder>
                    <Logo to={`/home`}>
                        EDUKET
                    </Logo>
                    <Ul1>
                        <Li1>
                            <Link1 onClick={()=> logout()} to={'/'} >
                                logout
                            </Link1>
                        </Li1>

                        <Li1>
                            <Link1 to={`/myprofile`}>
                                mypage
                            </Link1>
                        </Li1>

                            <Li1>
                                <Link1 to={`/search`}>
                                    search
                                </Link1>
                            </Li1>    
                    </Ul1>
                </LogHaeder>
            </Nav1>

            <Nav2>
                <NavHeader>
                    <NavBody>
                        <Ul2>
                            <Li2>
                                <Link2 to={`/eduketinfo`}>
                                    INSIDE EDUKET
                                </Link2>
                            </Li2>

                            <Li2>
                                <Link2 to={`/post/feed`}>
                                    POST
                                </Link2>
                            </Li2>

                            <Li2>
                                <Link2 to={`/together`}>
                                    STUDY
                                </Link2>
                            </Li2>    
                        </Ul2>
                    </NavBody>
                </NavHeader>
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
const NavBody= styled.div`
    padding: 0 0 0 0;
`
const Ul2= styled.ul`
    display: flex;
    font-size: 16px;
    margin: 0;
    gap: 30px;
    padding: 0;
`
const Li2= styled.li`
    padding: 0 0;
`
const Link1 = styled(Link)`
    color: #A73121;
    text-decoration: none;
    font-family: "Pretendard-normal";
`
const Link2 = styled(Link)`
    line-height: 60px;
    letter-spacing: 0.5px;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
    font-family: "Montserrat";
`

