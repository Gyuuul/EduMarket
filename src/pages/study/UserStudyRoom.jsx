import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';

import { URL } from '../../lib/apis/constant/path';

export default function UserStudyRoom() {
    const accountname= useParams().accountname;
    const navigate= useNavigate();
    const [pages, setPages] = useState(12);
    const [count, setCount]= useState(0);
    const [studyList, setStudyList]= useState([]);
    const token= localStorage.getItem('Access Token');

    useEffect(()=> {
        async function axiosStudyList(){
            const res= await axios.get(`${URL}/product/${accountname}/?limit=${pages}&skip=0`, {
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "Content-type" : "application/json"
                }
            })
            const data= res.data?.product;
            setStudyList([...data]);
        }
        axiosStudyList();
    }, [pages]);

    return (
        <>
                { studyList.length ? (
                    <StudyDiv>
                        <StudyTitle>User Study</StudyTitle>
                        <Ul>
                            {studyList.map((item)=>(
                                <Li>
                                    <Div onClick={async(e) => {
                                    e.stopPropagation();
                                    navigate(`/together/detail/${item.id}`);
                                    }}>
                                    <img src={item.itemImage}></img>
                                    <StudyName>{item.itemName}</StudyName>
                                    <StudyIntro>{item.link}</StudyIntro>
                                    </Div>
                                </Li>
                            ))}
                        </Ul>

                        {count % 12 !== 0 ? null : (
                            <button
                                onClick={() => setPages((pages)=> pages + 12)}
                            > 더보기 </button>
                        )}
                    </StudyDiv>
                )
            :
            (
                <Alert>
                    등록된 상품이 없습니다.
                </Alert>
            )}  
        </>
    )
}
const StudyDiv= styled.div`
    padding: 30px 0;
`
const StudyTitle= styled.p`
    font-family: "Frutiger-lt-pro-600";
    font-size: 30px;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    margin: 0 0 50px 0;
`
const StudyName= styled.p`
    font-family: "Noto_Sans_KR-600";
    font-size: 20px;
    font-weight: 700;
    color: #3a3a3a;
`
const StudyIntro= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 17px;
    font-weight: 500;
    margin-top: 20px;
    color: #777;
    line-height: 25px;
`
const Ul= styled.ul`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0;
    margin: 0 0;
    line-height: 0;
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 50px 0;
    padding: 0 0 0;
    vertical-align: top;
`
const Div= styled.div`
    width: 300px;
    height: 350px;
    margin: 0 auto;
    padding: 12px 20px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;

    & img {
        width: 100%;
        height: 200px;
        margin: 30px 0;
        object-fit: cover;
    }
`
const Alert= styled.p``
