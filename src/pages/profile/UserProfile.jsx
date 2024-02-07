import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import FollowButton from '../../components/follow/FollowButton'
import { setUserInfo } from '../../store/slice/userSlice';
import getUserProfile from './getUserProfile';
import UserPostRoom from '../post/UserPostRoom';
import UserStudyRoom from '../study/UserStudyRoom';

export default function UserProfile() {
    const accountname= useParams().accountname;
    const profile= useSelector((state)=> state.user?.userInfo);
    const [isFollow, SetIsFollow]= useState(profile?.isfollow);
    const dispatch= useDispatch();

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

    const pageTitle = 'USER PROFILE';
    const pageDesc = `유저의 정보와 게시글, 스터디를 확인할 수 있습니다.`;
    const page=(
        <>
            <ProfileWrap>
                <UserProfileDiv>
                    <Title><h2>USER PAGE</h2></Title>
                    
                    <Wrap>
                        <ProfileDiv>
                            <Img src={profile?.image} alt='유저 프로필 이미지' />
                            <Profiles>
                                <NameDiv>
                                    <Name>{profile?.username}</Name>
                                    <Id>@ {profile?.accountname}</Id>
                                </NameDiv>
                                <FollowDiv>
                                        <FollowLink to={`/profile/${accountname}/follower`} aria-label="팔로우 페이지"><Follow>Follower <strong>{profile?.followerCount}</strong></Follow></FollowLink>
                                        <FollowLink to={`/profile/${accountname}/following`} aria-label="팔로잉 페이지"><Follow>Following <strong>{profile?.followingCount}</strong></Follow></FollowLink>
                                </FollowDiv>

                                <div onClick={()=>{
                                    SetIsFollow(!isFollow);
                                }}>
                                    <FollowButton
                                        accountname={accountname}
                                        isfollow={isFollow}
                                    />
                                </div>
                            </Profiles>
                            <Intro>{profile?.intro}</Intro>
                        </ProfileDiv>
                        <UserPostRoom/>
                        <UserStudyRoom/>
                    </Wrap>
                </UserProfileDiv>
            </ProfileWrap>
        </>
    )
    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}
const ProfileWrap= styled.div`
    padding: 30px 0;
    background-color: #f1f2f3;
`
const UserProfileDiv= styled.div`
    max-width: 1400px;
    margin: 0 auto;
    @media screen and (max-width: 1200px) {
        width: 1100px;
    }
    @media screen and (max-width: 1100px) {
        width: 1000px;
    }
    @media screen and (max-width: 800px) {
        width: 700px;
    }
`
const Title= styled.div`
    padding: 200px 0 90px 0;
    border: none;
    font-size: 40px;
    text-align: center;
    color: #2b2b2b;

    &h2{
        display: inline-block;
        font-family: "Frutiger-lt-pro-600";
        color: #2b2b2b;
    }
`
const Wrap= styled.div`
    padding: 40px 80px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 50px;
    background-color: #ffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    @media screen and (max-width: 1200px) {
        width: 1000px;
        margin: 0 auto;
    }
    @media screen and (max-width: 1100px) {
        width: 900px;
        margin: 0 auto;
    }
    @media screen and (max-width: 800px) {
        width: 500px;
        margin: 0 auto;
    }
`
const ProfileDiv= styled.div`
    display: flex;
    gap: 70px;
    padding: 30px 0 60px 0; 
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
`
const Img= styled.img`
    width: 220px;
    height: 220px;
    margin-left: -10px;
    border-radius: 50%;
`
const Profiles= styled.div`
    display: flex;
    flex-direction: column;
    & div {
        text-align: center;
    }
`
const NameDiv= styled.div`
    margin: 20px 0px;
`
const Name= styled.h2`
    font-family: "Frutiger-lt-pro-normal";
    font-size: 30px;
    color: #2b2b2b;
    @media screen and (max-width: 800px) {
        text-align: center;
    }
`
const Id= styled.h3`
    font-family: "Frutiger-lt-pro-normal";
    font-size: 18.85px;
    color: #777;
    @media screen and (max-width: 800px) {
        text-align: center;
    }
`
const Intro= styled.p`
    flex-grow: 1;
    margin-top: -10px;
    padding: 30px;
    font-family: "Noto_Sans_KR-400";
    color: #2b2b2b;
    font-size: 18px;
    border-radius: 50px;
    background-color: #f1f2f3;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const FollowDiv= styled.div`
    display: flex;
    gap: 20px;
`
const FollowLink = styled(Link)`
    margin: 20px 0px;
`
const Follow= styled.p`
    font-family: "Frutiger-lt-pro-normal";
    font-weight: 400;
    font-size: 18.85px;
    color: #777;
    & strong{
        color: #2b2b2b;
    }
`
