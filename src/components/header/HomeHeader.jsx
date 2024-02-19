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
                                <Link2 to={`/eduketinfo`} aria-label="INSIDE EDUKET">
                                    INSIDE EDUKET
                                </Link2>
                            </Li2>

                            <Li2>
                                <Link2 to={`/post/feed`} aria-label="POST">
                                    POST
                                </Link2>
                            </Li2>

                            <Li2>
                                <Link2 to={`/together`} aria-label="STUDY">
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
    width: 100%;
    height: 120px;
    top: 0;
    left: 0;
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
    font-size: 18px;
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
const NavBody= styled.div`
    padding: 0 0 0 0;
`
const Ul2= styled.ul`
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    font-size: 16px;
`
const Li2= styled.li`
    padding: 0 0;
`
const Link1 = styled(Link)`
    font-family: "Pretendard-600";
    color: #A73121;
    text-decoration: none;
`
const Link2 = styled(Link)`
    font-family: "Montserrat";
    line-height: 60px;
    letter-spacing: 0.5px;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
`

