import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';
import { URL } from '../../lib/apis/constant/path'
import { REG_EXP_ID } from '../../lib/apis/constant/regexp'
import handleFileUpload from './handleFileUpload';
import LoginHeader from '../../components/header/LoginHeader';

export const ProfileName= ()=> {
    const fileInput= useRef();
    const navigate= useNavigate();
    const location= useLocation();
    const email= location.state.email;
    const password= location.state.password;
    const [intro, setIntro]= useState('');
    const [profileImg, setProfileImg]= useState(DEFAULT_IMAGE);

    // userName 유효성
    const [userName, setUserName]= useState('');
    const [userNameMessage, setUserNameMessage]= useState('');
    const [checkValidatedUserName, setCheckValidatedUserName]= useState(true);

    useEffect(()=> {
        if((userName.length< 2 && userName !== '') || userName.length> 10){
            setCheckValidatedUserName(false);
            setUserNameMessage('2자~10자 이내여야 합니다.');
        }else if( userName === ''){
            setCheckValidatedUserName(false);
            setUserNameMessage('');
        }else {
            setCheckValidatedUserName(true);
            setUserNameMessage('');
        }
    }, [userName]);

    // userId 유효성
    const [userId, setUserId]= useState('');
    const [userIdMessage, setUserIdMessage]= useState('');
    const [checkValidatedUserId, setCheckValidatedUserId]= useState(true);

    useEffect(()=> {
        if(!REG_EXP_ID.test(userId) && userId !== ''){
            setCheckValidatedUserId(false);
            setUserIdMessage('영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
        }else if(userId === ''){
            setCheckValidatedUserId(false);
            setUserIdMessage('');
        }else{
            setCheckValidatedUserId(true);
            setUserIdMessage('');
        }
    }, [userId]);

    // name, id, info input값 변경 함수
    const onChangeHandler= (event) => {
        if(event.target.name === 'userName'){
            setUserName(event.target.value);
        }else if(event.target.name === 'userId'){
            setUserId(event.target.value);
        }else if(event.target.name === 'userInfo'){
            setIntro(event.target.value);
        }
    };

    // 회원가입 시 데이터
    const userData= {
        user:{
            username: userName,
            email: email,
            password: password,
            accountname: userId,
            intro: intro,
            image: profileImg,
        },
    };

    // 시작하기 버튼 활성화 기능
    const start= checkValidatedUserName && checkValidatedUserId;

    // 회원가입 함수, 아이디 중복 검사
    const join= async ()=> {
        const res= await axios.post(`${URL}/user/accountnamevalid`,{
            user: {
                accountname: userId,
            },
        });

        // 유효성 검사 후 회원가입 API로 POST
        if(res.data.message === '사용 가능한 계정ID 입니다.'){
            await axios.post(`${URL}/user`, userData, {
                'Content-type': 'application/json',
            })
            .then((res)=> 
            navigate('/login'));
        }else if(res.data.message === '이미 가입된 계정ID 입니다.'){
            alert('이미 가입된 계정 ID 입니다.');
        }else{
            alert('잘못된 접근입니다.');
        }
    
    };

    return (
        <>
            <LoginHeader/>
            <SignupDiv>
                <Title>
                    <H2>회원정보 입력</H2>
                </Title>

                <Wrap>
                    <ImgDiv>
                        <img src={profileImg} alt="기본 프로필 이미지" />
                        <ProfileImgLabel htmlFor='ProfileImg'>사진 변경</ProfileImgLabel>
                        <ProfileImgInput 
                            onChange={async (e) => {
                                setProfileImg(await handleFileUpload(e, profileImg));
                            }}
                            ref={fileInput} 
                            type='file' 
                            id='ProfileImg' 
                        />
                    </ImgDiv>
                </Wrap>
                
                <InputDiv>
                    <Div>
                        <Label>이름</Label>
                        <Input
                            onChange={onChangeHandler}
                            value={userName}
                            type= 'text'
                            name= 'userName'
                            placeholder='프로필 이름'
                            required
                            maxLength={11}
                        /> 
                        <P>{userNameMessage}</P>
                    </Div>

                    <Div>
                        <Label>아이디</Label>
                        <Input
                            onChange={onChangeHandler}
                            value={userId}
                            type= 'text'
                            name= 'userId'
                            placeholder='영문, 숫자 포함 10자 이내'
                            maxLength={11}
                        /> 
                        <P>{userIdMessage}</P>
                    </Div>

                    <Div>
                        <Label>자기소개</Label>
                        <ProfileTextarea 
                            onChange={onChangeHandler} 
                            value={intro} 
                            name='userInfo'
                            placeholder=''
                            style={{resize: 'none'}}
                            />
                    </Div>
                </InputDiv>

                <Div>
                    <StartButton disabled={start ? null : 'disabled'} onClick={join}>
                            회원가입
                    </StartButton>
                </Div>
            </SignupDiv>
        </>
    );
}
const SignupDiv= styled.div`
    width: 600px;
    margin: 0 auto;
    padding: 30px;
`
const Wrap= styled.div`
    margin: 5px 0 25px 0;
`
const Title= styled.div`
    margin: 0 0 25px 0;
    font-size: 15px;
    text-align: center;
    color: #2b2b2b;
    border: none;
    padding-bottom: 0;
`
const H2= styled.h2`
    font-family: "Noto_Sans_KR-600";
    display: inline-block;
    color: #2b2b2b;
`
const ImgDiv= styled.div`
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;

    & img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }
`
const Div= styled.div`
    width: 445px;
    margin: 0 auto;
`
const P= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
    color: #C63D2F;
    margin-bottom: 30px;
`
const InputDiv= styled.div`
    margin-top: 50px;
`
const ProfileImgLabel= styled.label`
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 180px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 17px;
    color: white;
    text-align: center;
    line-height: 70px;
    transform: translateX(-50%);
    cursor: pointer;
`
const ProfileImgInput= styled.input`
    display: none;
`
const Label= styled.label`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
    font-weight: 600;
    color: #101010;
`
const Input= styled.input`
    font-family: "Noto_Sans_KR-400";
    height: 38px;
    line-height: 38px;
    background-color: transparent;
    border: 1px solid #A73121;
    border-left: none;
    border-right: none;
    border-top: none;
    margin: 5px 0 15px 0;
    padding: 5px 5px;
    width: 90%;
    width: calc(100% - 10px);
    outline: none;
`

const ProfileTextarea= styled.textarea`
    font-family: "Noto_Sans_KR-400";
    height: 60px;
    line-height: 38px;
    background-color: transparent;
    border: 1px solid #A73121;
    border-left: none;
    border-right: none;
    border-top: none;
    margin: 5px 0 15px 0;
    padding: 5px 5px;
    width: 90%;
    width: calc(100% - 10px);
    outline: none;
`
const StartButton= styled.button`
    font-family: "Noto_Sans_KR-400";
    width: 445px;
    margin-bottom: 20px;
    height: 60px;
    line-height: 60px;
    background: #C63D2F;
    border: 1px solid #C63D2F;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
`





















