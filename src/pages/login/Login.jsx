import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path'
import getMyInfo from './getMyInfo'
import { setMyInfo } from '../../store/slice/userSlice';
import LoginHeader from '../../components/header/LoginHeader';

export default function Login() {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState('');
    const navigate= useNavigate();
    const dispatch = useDispatch();

    // 이메일, 비밀번호 작성되면 버튼 활성화
    useEffect(() => {
        if (email && password) {
            setIsActive(true);
            } else {
            setIsActive(false);
            }
        }, [email, password]);

    async function handleSubmit(e){
        e.preventDefault();

        // 로그인 유효성 검사
            if(isActive===true){
                try{
                    const res= await axios.post(`${URL}/user/login`,{
                        headers: {
                            'Content-type': 'application/json',
                            },
                            user: {
                                email,
                                password,
                            },
                    });
                    if(res.data.message === '이메일 또는 비밀번호가 일치하지 않습니다.'){
                        setMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
                    }
                    else{
                        // 토큰 검증
                        try {
                            await axios
                                .get(`${URL}/user/checktoken`, {
                                headers: {
                                    Authorization: `Bearer ${res.data.user.token}`,
                                    'Content-type': 'application/json',
                                },
                        })
                        //토큰 검증 성공 후 token, accountname 저장
                        .then((data) => {
                            if (data.data.isValid) {
                                setMessage('');
                                localStorage.setItem('Access Token', res.data.user.token);
                                localStorage.setItem('Account Name', res.data.user.accountname);
                                console.log(localStorage);

                                navigate('/home');
                                } 
                            else {
                                alert('유효하지 않은 접근입니다');
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        }   
                        catch(error){
                            console.log(error);
                        }
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
            const user= await getMyInfo();
            dispatch(setMyInfo(user));
    }


    return (
        <>
            <LoginHeader/>
            <Form>
                <Title>
                    <H2>로그인</H2>
                </Title>

                <InputDiv>
                    <Div>
                        <Label htmlFor="email">
                            이메일
                        </Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder=" "
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Div>

                    <Div>
                        <Label htmlFor="password">
                            비밀번호
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder=" "
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Div>
                </InputDiv>

                <Div>
                    <Button onClick={handleSubmit} aria-label="로그인">로그인</Button>
                    <SignupDiv>
                        <span>에듀켓의 회원이 아니신가요?</span>
                        <SignupLink to={'/signup'}>회원가입</SignupLink>
                    </SignupDiv>
                </Div>
            </Form>
        </>
    )
}
const Form= styled.form`
    width: 600px;
    margin: 0 auto;
    padding: 30px;
`
const Title= styled.div`
    margin: 0 0 40px 0;
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
const Div= styled.div`
    width: 445px;
    margin: 0 auto;
`
const InputDiv= styled.div`
    margin-top: 50px;
    margin-bottom: 30px;
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
    width: calc(100% - 10px);
    outline: none;
`
const Button= styled.button`
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
const SignupDiv= styled.div`
    display: flex;
    justify-content: space-between;

    & span {
        font-family: "Noto_Sans_KR-400";
        font-size: 15px;
        color: #101010;
    }
`
const SignupLink = styled(Link)`
    font-family: "Noto_Sans_KR-400";
    color: #101010;
    font-size: 15px;
    font-weight: 600;
`