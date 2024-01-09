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

    const page= (
        <>
            <FollowerDiv>
                <Title>
                    <h2>follower</h2>
                </Title>
                { followerList.length 
                ? (
                    <Ul>
                        {showList.map((item)=> (
                            <Li>
                                <Div>
                                    <FollowList key={item} {...item}></FollowList>
                                </Div>
                            </Li>
                        ))}
                        <div ref={ref}></div>
                    </Ul>
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
            <Common page={page} />
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
const Ul = styled.ul``
const Li = styled.li``
const Div= styled.div``
const Alert= styled.p``
