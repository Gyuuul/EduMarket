import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { REG_EXP_EMAIL } from '../../lib/apis/constant/regexp'
import { URL } from '../../lib/apis/constant/path'
import LoginHeader from '../../components/header/LoginHeader';

export const EmailPassword= ()=> {
    const navigate= useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [emailMessage, setEmailMessage]= useState('');
    const [passwordMessage, setPasswordMessage]= useState('');
    const [checkValidatedEmail, setCheckValidatedEmail] = useState(false);
    const [checkValidatedPassword, setCheckValidatedPassword] = useState(false);

    const onChange= (event) => {
        if(event.target.name === 'email'){
            setEmail(event.target.value);
        }else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
    };

    const next= checkValidatedEmail && checkValidatedPassword;

    // email input값이 달라질 때마다 유효성 검사
    useEffect(()=> {
        if(!REG_EXP_EMAIL.test(email) && email !== ''){
            setCheckValidatedEmail(false);
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
        } else if(email === ''){
            setCheckValidatedEmail(false);
            // 이메일 칸이 비어있을 때 오류 메세지 출력 방지
            setEmailMessage('');
        } else{
            setCheckValidatedEmail(true);
            setEmailMessage('');
        }
    }, [email]);

    useEffect(()=> {
        if(password.length < 6 && password !==''){
            setCheckValidatedPassword(false);
            setPasswordMessage('비밀번호는 6자 이상이어야 합니다.');
        }else if(password === ''){
            setCheckValidatedPassword(false);
            setPasswordMessage('');
        }else {
            setCheckValidatedPassword(true);
            setPasswordMessage('');
        }
    }, [password]);

    // 다음 버튼 클릭 시
    const toProfilename= async function(event){
        event.preventDefault();
        const response= await axios.post(`${URL}/user/emailvalid`, {
            user: {
                email,
            },
        });
        if(response.data.message === '사용 가능한 이메일 입니다.'){
            setCheckValidatedEmail(true);
            navigate('/signup/profile', {
                state: {
                    email,
                    password,
                },
            });
        }else if(response.data.message === '이미 가입된 이메일 주소 입니다.'){
            setCheckValidatedEmail(false);
            setEmailMessage('이미 가입된 이메일 주소 입니다.')
        }else {
            setCheckValidatedEmail(false);
            alert('잘못된 접근입니다.');
        }
    };

    return (
        <>
            <LoginHeader/>
            <Form>
                <Title>
                    <H2>회원가입</H2>
                </Title>

                <InputDiv>
                    <Div>
                        <Label htmlFor="email">이메일</Label>
                        <Input type='text' id='email' name='email' onChange={onChange} placeholder='example@eduket.com'/>
                        <P>{emailMessage}</P>
                    </Div>

                    <Div>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input type='text' id='password' name='password' onChange={onChange} placeholder='영문 6자 이상'/>
                        <P>{passwordMessage}</P>
                    </Div>
                </InputDiv>
                
                <Div>
                    <NextButton disabled={next? null: 'disabled'} onClick={toProfilename}> 
                        다음
                    </NextButton>
                </Div>
            </Form>
        </>
    );
}

const Form= styled.form`
    width: 600px;
    margin: 0 auto;
    padding: 30px;
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
const NextButton= styled.button`
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





















// signup 첫번째 페이지 폼 양식
// export default function EmailPassword(props) {
//     async function Submit(e) {
//         e.preventDefault();
//         const email= document.querySelector('#email').value;
//         const password= document.querySelector('#password').value;
//         const password2= document.querySelector('#check_password').value;

//         console.log(password);
//         console.log(password2);

        
//         const validEmail = await validationEmail(email);
//         if (!validEmail?.state) {
//             props.setModalContent(validEmail);
//             props.setModalVisible(true);
//             return false;
//         }

//         const validPassword = validationPassword(password);
//         if (!validPassword?.state) {
//             props.setModalContent(validPassword);
//             props.setModalVisible(true);
//             return false;
//         }
        
//         const validCheckPassword = validationCheckPassword(password, password2);
//         if (!validCheckPassword?.state) {
//             props.setModalContent(validCheckPassword);
//             props.setModalVisible(true);
//             return false;
//         }
        
//         props.userData({
//             email: email,
//             passwd: password,
//         });

//         props.pass(true);

//         return true;
//     }

//     return (
//         <>
//             <Form
//                 onSubmit={(e)=>{
//                     return Submit(e);
//                 }}
//             >
//                 <Div>
//                     <Input type='text' id='email'/>
//                     <Label htmlFor="email">E-mail</Label>
//                     {/* Label의 htmlfor과 Input의 id 값이 같아야한다. */}
//                 </Div>

//                 <Div>
//                     <Input type='password' id='password'/>
//                     <Label htmlFor="password">Password</Label>
//                 </Div>

//                 <Div>
//                     <Input type='password' id='check_password'/>
//                     <Label htmlFor="check_password">Check Password</Label>
//                 </Div>

//                 <Button>다음</Button>

//             </Form>
//         </>
//     )
// }

// const Form= styled.form`
//         position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 30px;
//     width: 390px;
//     height: calc(100vh - 120px);
//     margin: 0 auto;
//     padding: 40px 0;
//     box-sizing: border-box;
// `
// const Div = styled.div`
//     position: relative;
//     height: 50px;
// `;
// const Label = styled.label`
//     position: absolute;
//     top: 0;
//     left: 10px;
//     display: block;
//     width: 240px;
//     height: 50px;
//     font-size: var(--fsize-message);
//     font-style: italic;
//     line-height: 50px;
//     color: var(--color-gray);
//     cursor: text;
//     transition: top, height, font 0.3s, 0.3s;
// `;

// const Input = styled.input`
//     height: 1px;
//     border: 1px solid var(--color-main);
//     box-sizing: border-box;
//     font-style: italic;
//     vertical-align: bottom;
//     transition: height, border-radius 0.3s, 0.3s;

//     &:focus,
//     &:not(:placeholder-shown) {
//         height: 50px;
//         margin-top: 0;
//         background-color: var(--color-main);
//         border-radius: var(--radius-m);
//     }

//     &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
//         top: -20px;
//         left: 0px;
//         height: 70px;
//         font-size: var(--fsize-s);
//         line-height: 20px;
//         z-index: -1;
//     }
// `;

// const Button = styled.button`
//     &:disabled {
//         color: var(--color-disabled);
//     }
// `;
