import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components';

import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path'
import { Study } from './Study';
import { StudyImage } from './StudyImage';

export const StudyUpload=() => {
    const [userToken, setUserToken] = useState();
    const [itemName, setItemName] = useState('');
    const [link, setLink] = useState('');
    const [itemImage, setItemImage] = useState('');
    
    const navigate= useNavigate();

    const accountname = useSelector((state) => {
        return state.user.myInfo.accountname;
    });

    useEffect(()=>{
        setUserToken(localStorage.getItem('Access Token'));
    },[]);

        const handleSubmit= async (e) =>{
            e.preventDefault();

            try{
                const res= await axios
                    .post(`${URL}/product`, 
                    {
                        product: {
                            itemName: itemName,
                            price: 9999999,
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
            navigate(`/together/${accountname}`);
            }catch(error){
                console.log(error);
            }
        };

    const page= (
            <UploadDiv>
                <Title><h2>STUDY</h2></Title>
                <Description>만들고 싶은 스터디를 소개해주세요.</Description>
                <form method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
                    <Study
                        itemName={itemName}
                        setItemName={setItemName}
                        link={link}
                        setLink={setLink}
                    />
                </form>
                <Div>
                    <StudyImage itemImage={itemImage} setItemImage={setItemImage}/>
                    <Button onClick={handleSubmit} >스터디 등록하기</Button>
                </Div>    
            </UploadDiv>
    )
    return (
        <>
            <Common page={page} />
        </>
    );
}
const UploadDiv= styled.div`
    max-width: 1400px;
    margin: 0 auto;
`
const Title= styled.div`
    margin: 200px 0 30px 0;
    font-size: 40px;
    text-align: center;
    color: #2b2b2b;
    border: none;
    padding-bottom: 0;

    &h2{
        display: inline-block;
        color: #2b2b2b;
    }
`
const Description= styled.h3`
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