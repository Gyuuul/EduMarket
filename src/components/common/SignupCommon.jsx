import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import checkToken from '../../lib/apis/constant/checkToken';
import getMyInfo from '../../pages/login/getMyInfo'
import {setMyInfo} from '../../store/slice/userSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SignupCommon(props) {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const userInfo= useSelector((state)=> state.user?.myInfo);
    const [user, setUser]= useState(userInfo);
    
    useEffect(() => {
        checkLogin();
    }, [user]);

    async function checkLogin() {
        if (checkToken()) {
            const user = await getMyInfo();
            dispatch(setMyInfo(user));
        }
        else{
            setUser('');
        }
    }

    return (
        <>
            <StyledMain>
                <FixedLayout>
                    {props.page}
                </FixedLayout>
            </StyledMain>
        </>
    )
}

const StyledMain = styled.main`
    width: 100%;
`

const FixedLayout = styled.div`
    transform: translateY(8%);
`;