import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path'
import { Study } from './Study';
import { StudyImage } from './StudyImage';

export default function StudyModify() {
    const {productId}= useParams();
    const navigate= useNavigate();
    const accountname= useSelector((state)=> state.user.myInfo.accountname);
    const userToken = localStorage.getItem('Access Token');

    const [itemName, setItemName]= useState('');
    const [itemImage, setItemImage]= useState('');
    const [link, setLink]= useState('');

    useEffect(()=> {
        getTogether(productId);
    }, [productId]);

    async function getTogether(){
        try{
            const res= await axios.get(`${URL}/product/detail/${productId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-type': 'application/json',
                },
            })

            setItemName(res.data.product.itemName);
            setLink(res.data.product.link);
            setItemImage(res.data.product.itemImage);
        }
        catch(error){
            console.log(error);
        }
    }

    // 수정 후 업데이트 
    const Modify= async (e)=> {
        e.preventDefault();

        try{
            await axios.put(`${URL}/product/${productId}`, {
                product: {
                    itemName: itemName,
                    price: 0,
                    link: link,
                    itemImage: itemImage,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-type': 'application/json',
                },
            })
            navigate(`/together/detail/${productId}`);
        }
        catch(error){
            console.log(error);
        }
    }

    const page= (
        <UploadWrap>
            <UploadDiv>
                <Wrap>
                    <Title><H2>STUDY</H2></Title>
                    <Description>만들고 싶은 스터디를 소개해주세요.</Description>
                    <form method='POST' encType='multipart/form-data' onSubmit={Modify}>
                        <Study
                            itemName={itemName}
                            setItemName={setItemName}
                            link={link}
                            setLink={setLink}
                        />
                    </form>
                    <Div>
                        <StudyImage itemImage={itemImage} setItemImage={setItemImage} />
                        <Button onClick={Modify} >수정하기</Button>
                    </Div> 
                </Wrap>
            </UploadDiv>
        </UploadWrap>
    )

    return (
        <>
            <Common page={page} />
        </>
    );
}
const UploadWrap= styled.div`
    background-color: #f1f2f3;
    padding: 200px 0;
`
const UploadDiv= styled.div`
    max-width: 1400px;
    margin: 0 auto;
`
const Wrap= styled.div`
    padding: 40px 80px 90px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const Title= styled.div`
    padding: 50px 0 20px;
    font-size: 40px;
    text-align: center;
    color: #2b2b2b;
    border: none;
`
const H2= styled.h2`
    font-family: "Noto_Sans_KR-600";
    display: inline-block;
    color: #2b2b2b;
`
const Description= styled.h3`
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    text-align: center;
    color: #868686;
    margin-bottom: 30px;
`
const Div= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Button= styled.button`
    font-family: "Noto_Sans_KR-400";
    width: 400px;
    height: 60px;
    line-height: 60px;
    background: #C63D2F;
    border: 1px solid #C63D2F;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
`