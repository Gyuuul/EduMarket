import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

export const Study=({ itemName, link, setItemName, setLink})=> {
    const inputRef= useRef();
    const [nameMessage, setNameMessage]= useState('');
    const [detailMessage, setDetailMessage]= useState('');

    useEffect(()=>{
        inputRef.current.focus();
    },[]);

    useEffect(()=>{
        if(itemName.length <2 && itemName !== ''){
            setNameMessage('2-15글자 이내로 입력해주세요.');
        }else if(itemName === ''){
            setNameMessage('');
        }else{
            setNameMessage('');
        }
    }, [itemName]);

    useEffect(()=>{
        if(link.length <2 && link !== ''){
            setDetailMessage('2글자 이상 입력해주세요.');
        }else if(link === ''){
            setDetailMessage('');
        }else{
            setDetailMessage('');
        }
    }, [link]);

    function handle(e) {
        const inputType = e.target.id.slice(5);

        inputType === 'Name' && setItemName(e.target.value);
        inputType === 'Detail' && setLink(e.target.value);
    }
    
    return (
        <StudyDiv>
            <Div>
                <Label>스터디/모임의 이름을 말해주세요.</Label>
                <Input
                    id='inputName'
                    type= 'text'
                    placeholder= 'ex. 강남역에서 모각코 모집해요!'
                    maxLength='15'
                    minLength='2'
                    onChange= {handle}
                    value= {itemName}
                    ref= {inputRef}
                />
                <Alert>{nameMessage}</Alert>
            </Div>

            <Div>
                <Label>스터디/모임에 대해서 소개해 주세요.</Label>
                <Input
                    id='inputDetail'
                    type= 'text'
                    placeholder= 'ex. 매주 일요일마다 5시간씩 스벅에서 모각코 해요!'
                    minLength='2'
                    onChange= {handle}
                    value= {link}
                />
                <Alert>{detailMessage}</Alert>
            </Div>
        </StudyDiv>
    )
}
const StudyDiv= styled.div`
    width: 600px;
    margin: 0 auto;
    padding: 30px;
`
const Div= styled.div`
    width: 445px;
    margin: 0 auto;
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
    margin: 15px 0 15px 0;
    padding: 5px 5px;
    width: 90%;
    width: calc(100% - 10px);
    outline: none;
`
const Alert= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
    color: #C63D2F;
    margin-bottom: 30px;
`