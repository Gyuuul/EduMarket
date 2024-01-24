import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components';

import Common from '../../components/common/Common';
import { URL } from '../../lib/apis/constant/path'
import handleFileUpload from '../signup/handleFileUpload';
import { onChangeIntro, onChangeUserName } from '../../store/slice/userSlice'

export default function ProfileModify() {
    const token= localStorage.getItem('Access Token');
    const user= useSelector((state)=> state.user.myInfo);
    const [image, setImage]= useState(user?.image);
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const fileInput= useRef();

    // input값 수정 함수
    const onEdit = async (e) => {
        if (e.target.name === 'userName') {
                dispatch(onChangeUserName(e.target.value));
            } else if (e.target.name === 'userInfo') {
                dispatch(onChangeIntro(e.target.value));
            } 
        };

    // 수정 후 업데이트
    const putProfile= async(e)=> {
        e.preventDefault();

        const res= await axios.put(`${URL}/user`, {
            user:{
                    username: user.username,
                    accountname: user.accountname,
                    intro: user.intro,
                    image: image,
            }
    }, {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    navigate(`/myprofile`);
    }

    const back= ()=> {
        navigate(`/myprofile`);
    } 

    const page=  (
        <ModifyWrap>
            <ModifyDiv>
                <Wrap>
                    <ImageDiv>
                        <img src={image} alt="나의 프로필 이미지"/>
                        <ProfileImgLabel htmlFor='ProfileImg'>사진 변경</ProfileImgLabel>
                            <ProfileImgInput 
                                onChange={async (e) => {
                                    setImage(await handleFileUpload(e, image));
                                }}
                                ref={fileInput} 
                                type='file' 
                                id='ProfileImg' 
                            />
                    </ImageDiv>  

                    <Div>
                        <ProfileLabel htmlFor="id">아이디</ProfileLabel>
                        <br/>
                        <ProfileInput
                            value={user.accountname}
                            type= 'text'
                            id="id"
                            placeholder='아이디'
                            maxLength={11}
                        /> 
                    </Div>
                    
                    <Div>
                        <ProfileLabel htmlFor="name">이름</ProfileLabel>
                        <br/>
                        <ProfileInput
                            onChange={onEdit}
                            defaultValue={user.username}
                            type= 'text'
                            id="name"
                            name='userName'
                            placeholder='닉네임'
                            required
                            maxLength={11}
                        /> 
                    </Div>

                    <Div>
                        <ProfileLabel htmlFor="intro">자기소개</ProfileLabel>
                        <br/>
                        <IntroArea
                            onChange={onEdit} 
                            defaultValue={user.intro} 
                            id="intro"
                            name='userInfo'
                            style={{resize: 'none'}}
                            />
                    </Div>

                    <ButtonDiv>
                        <Button onClick={putProfile} aria-label="완료 버튼">완료</Button>
                        <Button onClick={back} aria-label="취소 버튼">취소</Button>
                    </ButtonDiv>
                </Wrap>
            </ModifyDiv>
        </ModifyWrap>
    )
    return (
        <>
            <Common page={page} />
        </>
    );
}
const ModifyWrap= styled.div`
    background-color: #f1f2f3;
    padding: 30px 0;
`
const ModifyDiv= styled.div`
    position: relative;
    width: 1280px;
    margin: 0 auto;
    padding: 120px 0 0 0;
`
const Wrap= styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 40px 80px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const ImageDiv= styled.div`
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
    border-radius: 50%;
    overflow: hidden;

    & img {
        width: 180px;
        height: 180px;
        margin-bottom: 10px;
        border-radius: 50%;
    }
`
const Div= styled.div`
    margin-bottom: 10px;
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
const ProfileLabel= styled.label`
    color: #2b2b2b;
    font-weight: 600;
    line-height: 30px;
`
const ProfileInput= styled.input`
    width: 300px;
    height: 30px;
    padding: 12px;
    border-radius: 0.25rem;
    border-width: 1px;
`
const IntroArea= styled.textarea`
    width: 300px;
    padding: 12px;
    border-radius: 0.25rem;
    border-width: 1px;
`
const ButtonDiv= styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
`
const Button= styled.button`
    width: 155px;
    padding: 12px;
    border-radius: 0.25rem;
    background: #C63D2F;
    color: #ffff;
`
