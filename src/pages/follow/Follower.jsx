import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from 'axios'
import styled from 'styled-components';

import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path'
import FollowList from '../../components/follow/FollowList';

/** 나를 팔로우한 사용자 목록 */
export default function Follower() {
    const token= localStorage.getItem('Access Token');
    const accountname= useParams().accountname;
    const [ref, inView]= useInView();

    const [followerList, setFollowerList]= useState([]);
    const [showList, setShowList]= useState([]);

    const [pages, setPages]= useState(0);

    const FollowerList= async ()=> {
        const res= await axios.get(`${URL}/profile/${accountname}/follower/?limit=0&skip=0`, {
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            }
        })
        const data= res.data;
        setFollowerList(data);
        setShowList(data.slice(pages * 10, pages * 10 + 10));
        setPages(pages + 1);
    }

    useEffect(()=>{
        FollowerList();
    },[]);

    // 무한스크롤 함수
    const addShowFollower= ()=> {
        const addFollowerList= followerList.slice(pages * 10, pages * 10 + 10);
        setShowList([...showList, ...addFollowerList]);
        setPages(pages + 1);
    };

    useEffect(()=> {
        if(inView){
            addShowFollower();
        }
    },[inView]);

    const pageTitle = 'FOLLOWER PAGE';
    const pageDesc = `유저의 팔로워 목록을 확인합니다.`;

    const page= (
        <>
            <FollowerDiv>
                <Title>
                    <h2>follower</h2>
                </Title>
                { followerList.length 
                ? (
                    <ul>
                        {showList.map((item)=> (
                            <li>
                                <FollowList key={item} {...item}></FollowList>
                            </li>
                        ))}
                        <div ref={ref}></div>
                    </ul>
                )
                : 
                (
                    <Alert>
                        팔로워가 존재하지 않습니다.
                    </Alert>
                )}
            </FollowerDiv>
        </>
    );

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}
const FollowerDiv= styled.div`
    width: 1280px;
    margin: 0 auto;
`
const Title= styled.div`
    margin: 200px 0 90px 0;
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
const Alert= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
    margin-bottom: 30px;
`
