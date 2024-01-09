import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { setUserInfo } from '../../store/slice/userSlice'
import getUserProfile from '../../pages/profile/getUserProfile'
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';
import FollowButton from '../follow/FollowButton';

export default function UserList({ search, userList, searchQuery, isfollow }) {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [isFollow, setIsFollow]= useState(isfollow);
    const myAccountname= useSelector((state) => { return state.user.myInfo.accountname; });

    async function setUser(accountname) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

return search && userList?.map((item) => {
    let imgSrc = item.image;
    if (
        !item.image.includes('https://api.mandarin') ||
        item.image.includes('/undefined') ||
        item.image.includes('/null')
    ) {
        imgSrc = DEFAULT_IMAGE;
    }
    return (
        <Li key={item._id}>
            <UserWrap
                key={item._id}
                onClick={async () => {
                    await setUser(item?.accountname);
                    navigate(`../profile/${item?.accountname}`);
                }}
            >
                <Div>
                    <Img src={imgSrc}></Img>
                    <Right>
                        <Name>
                            {item.username.includes(searchQuery) ? (
                                <>
                                    {item.username.split(searchQuery)[0]}
                                    <span style={{ color: '#C63D2F' }}>
                                        {searchQuery}
                                    </span>
                                    {item.username.split(searchQuery)[1]}
                                </>
                            ) : (
                                item.username
                            )}
                        </Name>
                        <Accountname>
                            @
                            {item.accountname.includes(searchQuery) ? (
                                <>
                                    {item.accountname.split(searchQuery)[0]}
                                    <span style={{ color: '#C63D2F' }}>
                                        {searchQuery}
                                    </span>
                                    {item.accountname.split(searchQuery)[1]}
                                </>
                            ) : (
                                item.accountname
                            )}
                        </Accountname>
                    </Right>
                </Div>
            
                {myAccountname === item?.accountname ? null : (
                        <FollowButtonDiv onClick={async()=> {
                            setIsFollow(!isFollow);
                        }}>
                            <FollowButton
                                accountname={item.accountname}
                                isfollow={isFollow}
                            />
                        </FollowButtonDiv>
                )}
            </UserWrap>
        </Li>
    );
});
}
const Div= styled.div`
    display: flex;
    justify-content: space-between;
    gap: 35px;
    padding: 30px 20px;
`
const Li= styled.li`
    list-style: none;
`
const UserWrap= styled.li`
    display: flex;
    justify-content: space-between;
`
const Img= styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Name= styled.p`
    font-family: "Frutiger-lt-pro-normal";
    color: #2b2b2b;
    margin-bottom: 5px;
`
const Accountname= styled.p`
    font-family: "Frutiger-lt-pro-normal";
    color: #777;
`
const Right = styled.div`
    color: #000;
`
const FollowButtonDiv= styled.div`
    margin-top: 30px;
`