import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Header from '../header/HomeHeader';
import Footer from '../footer/Footer'
import checkToken from '../../lib/apis/constant/checkToken';
import getMyInfo from '../../pages/login/getMyInfo'
import {setMyInfo} from '../../store/slice/userSlice'

export default function Common(props) {
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
        } else {
            setUser('');
        }
    }



    return (
        <>
            <Header /> 
            <StyledMain>
                <FixedLayout>
                    {props.page}
                </FixedLayout>
            </StyledMain>
            <Footer /> 
        </>
    )
}

const StyledMain = styled.main`
    width: 100%;
`

const FixedLayout = styled.div`
`;