import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FollowButton from './FollowButton';
import getUserProfile from '../../pages/profile/getUserProfile';
import { setUserInfo } from '../../store/slice/userSlice';

export default function FollowList({ accountname, isfollow, image }) {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const myAccountname = useSelector((state) => { return state.user.myInfo.accountname; });
    const [isFollow, setIsFollow]= useState(isfollow);

    async function setUser() {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

    return (
        <>
            <FollowSection>
                    <Wrap>
                        <div onClick={async(e)=> {
                            await setUser();
                            navigate(`../profile/${accountname}`);
                        }}>
                            <ProfileImage src={image} alt="유저 프로필 이미지" />
                        </div>
                        <ProfileId>@{accountname}</ProfileId>
                    </Wrap>

                    {myAccountname === accountname ? null : (
                        <FollowButtonDiv onClick={async()=> {
                            setIsFollow(!isFollow);
                        }}>
                            <FollowButton
                                accountname={accountname}
                                isfollow={isFollow}
                            />
                        </FollowButtonDiv>
                    )}
            </FollowSection>
        </>
    );
}

const FollowSection = styled.section`
    display: flex;
    justify-content: space-between;

    max-width: 1400px;
    margin: 0 auto;
    padding: 30px 220px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const Wrap= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 35px;
`
const FollowButtonDiv = styled.div`
    margin-top: 55px;
`
const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`
const ProfileId = styled.p`
    font-size: 17px;
    font-weight: 600;
    text-align: center;
`