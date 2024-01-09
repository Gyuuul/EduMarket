import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import checkToken from '../login/checkToken';
import MainHeader from '../../components/header/MainHeader';
import MainBody from '../../components/body/MainBody';
import Footer from '../../components/footer/Footer'

// 토큰이 없을 때 Main으로 이동 (Main에는 마이페이지, 검색, 추천팔로우 기능 x)
export default function Main() {
    const navigate= useNavigate();
    const hasToken= checkToken();

    useEffect(()=>{
        if(hasToken){
            navigate('/home');
        }else{
            navigate('/');
        }
    }, [hasToken]);
    
    return (
        <>
            <MainHeader/>
            <MainBody/>
            <Footer/>
        </>
    )
}
