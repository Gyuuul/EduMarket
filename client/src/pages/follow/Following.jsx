import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import FollowList from '../../components/follow/FollowList';
import instance from '../../lib/apis/interceptor';

/** 내가 팔로우한 사용자 목록 */
export default function Following() {
    const accountname= useParams().accountname;
    const [ref, inView]= useInView();
    const [followingList, setFollowingList]= useState([]);
    const [showList, setShowList]= useState([]);
    const [pages, setPages]= useState(0);

    const FollowingList= async ()=> {
        const res= await instance.get(`/profile/${accountname}/following/?limit=0&skip=0`)
        const data= res.data;
        setFollowingList(data);
        setShowList(data.slice(pages * 10, pages * 10 + 10));
        setPages(pages + 1);
    }

    useEffect(()=>{
        FollowingList();
    },[]);

    // 무한스크롤 함수
    const addShowFollowing= ()=> {
        const addFollowingList= followingList.slice(pages * 10, pages * 10 + 10);
        setShowList([...showList, ...addFollowingList]);
        setPages(pages + 1);
    };

    useEffect(()=> {
        if(inView){
            addShowFollowing();
        }
    },[inView]);

    const pageTitle = 'FOLLOWING PAGE';
    const pageDesc = `유저의 팔로잉 목록을 확인합니다.`;

    const page= (
        <>
            <FollowingDiv>
                <Title>
                    <h2>Following</h2>
                </Title>
                { followingList.length 
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
                        팔로잉이 존재하지 않습니다.
                    </Alert>
                )}
            </FollowingDiv>
        </>
    );

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}
const FollowingDiv= styled.div`
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
    padding: 30px;
    margin-bottom: 30px;
`


