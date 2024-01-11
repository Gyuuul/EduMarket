import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

import { getPostList } from '../post/getPostList';
import { getStudyFollowingList } from '../follow/getFollowingList';
import PostItemLi from '../../pages/post/PostItemLi';
import ItemLi from '../../pages/study/ItemLi';
import { URL } from '../../lib/apis/constant/path';
import FollowRecommend from '../../pages/follow/FollowRecommend';
import swiper from '../../assets/icons/illustration/Swiper.gif'
import frame from '../../assets/icons/illustration/frame.png'
import block from '../../assets/icons/illustration/block.jpg'
import post from '../../assets/icons/illustration/Post.gif'
import study from '../../assets/icons/illustration/Study.gif'
import mentoring from '../../assets/icons/illustration/Mentoring.gif'

export default function HomeBody() {
    const [postList, setPostList]= useState([]);
    const [myFollowingList, setMyFollowingList]= useState([]);
    const [studyList, setStudyList]= useState([]);
    const userToken = localStorage.getItem('Access Token');
    
    const postTag= ['BEST POST 🔥', '직무별 꿀팁 공유 🍯'];
    const studyTag= ['스터디/ 모임 개설 ✏️', '온라인 학습 🖥️'];
    const followTag= ['지식공유 💭', '멘토링 학습 👩🏻‍🏫'];


    let num = 9;
    
    /** Post 불러오기 */
    async function fetchMyPostList(){
        const list= await getPostList(num);
        setPostList([ ...list]);
    }

    /** Study 불러오기 */
    async function fetchMyStudyList(){
        const list = await getStudyFollowingList(num);
        setMyFollowingList([ ...list]);
    }

    useEffect(()=>{
        fetchMyPostList();
        fetchMyStudyList();
    },[]);

    // 최신 게시물이 위로 가도록
    useEffect(() => {
        function postSort(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
        }

        togetherList()
            .then((res) => {
                setStudyList(res.flat(1).sort(postSort).slice(0,9));
        })
        .catch((error)=>{
            console.log(error);
        });
    }, [myFollowingList]);
    
        // 팔로잉 사람들의 스터디 리스트 불러오기
        const togetherList = async () => {
            try {
                const togetherFollowList = await Promise.all(
                    myFollowingList.map(async (list) => {
                        const res = await axios.get(
                            `${URL}/product/${list.accountname}/?limit=10`,
                            {
                                headers: {
                                    "Authorization": `Bearer ${userToken}`,
                                    "Content-type": "application/json",
                                },
                            }
                        );
                        return res.data?.product;
                    })
                );
                return togetherFollowList;
            } catch (error) {
                console.log(error);
            }
        };

    return (
    <HomeDiv>
        <Home>
            <SwiperDiv>
                <FullImage>
                    <img src={swiper} alt="홈 페이지의 대표 이미지" />
                    <MainSwiper>
                        <img src={frame} alt="홈 페이지의 대표 이미지" />
                    </MainSwiper>
                </FullImage>
            </SwiperDiv>

            <CommonSection>
                <SwiperDiv>
                    <SideFullImage>
                        <img src={post} alt="포스트 페이지 대표 이미지" />
                    </SideFullImage>
                </SwiperDiv>
                <Title>EDUKET POST</Title>
                <Description>직무별 최신 트렌드에 맞는 정보를 공유해요.</Description>
                <Tag>
                    { !postTag
                    ? []
                : postTag.map((item)=>(
                    <li>
                        <p>{item}</p>
                    </li>
                ))}
                </Tag>
                <MoreButton href='http://localhost:3000/#/post/feed'>+ 게시글 더보기</MoreButton>

                {postList.length && 
                    <Ul>
                        {!postList 
                        ? []
                        : postList.map((item)=> (
                            <Li>
                                <PostItemLi
                                    key={item.id}
                                    {...item}
                                ></PostItemLi>
                            </Li>
                        ))}
                    </Ul>
                }
            </CommonSection>

            <CommonSection>
                <SwiperDiv>
                    <SideFullImage>
                        <img src={study} alt="스터디 페이지 대표 이미지" />
                    </SideFullImage>
                </SwiperDiv>
                <Title>EDUKET STUDY</Title>
                <Description>나에게 맞는 스터디와 모임에 참여해요!</Description>
                <Tag>
                    { !studyTag
                    ? []
                    : studyTag.map((item)=>(
                        <li>
                            <p>{item}</p>
                        </li>
                    ))}
                </Tag>
                <MoreButton href='http://localhost:3000/#/together'>+ 스터디 더보기</MoreButton>
                
                {studyList.length && 
                        <Ul>
                            {!studyList 
                            ? []
                            : studyList.map((data)=> (
                                <Li>
                                    <ItemLi
                                        data={data}
                                    ></ItemLi>
                                </Li>
                            ))}
                        </Ul>
                    }
            </CommonSection>

            <CommonSection>
                <SwiperDiv>
                    <SideFullImage>
                        <img src={mentoring} alt="멘토링 페이지 대표 이미지" />
                    </SideFullImage>
                </SwiperDiv>
                <Title>EDUKET MENTORING</Title>
                <Description> 장소의 제약 없이 다양한 분야의 멘토와 멘토링 학습을 할 수 있어요.</Description>
                <Tag>
                    { !followTag
                    ? []
                    : followTag.map((item)=>(
                        <li>
                            <p>{item}</p>
                        </li>
                    ))}
                </Tag>
                <FollowRecommend/>
            </CommonSection>
        </Home>
    </HomeDiv>
    )
}
const HomeDiv= styled.div`
    background-image: url(${block});
    background-repeat: repeat;
    background-color: #f1f2f3;
    padding: 50px 0;
`
const Home= styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 30px;
`
const SwiperDiv= styled.div`
`
const FullImage= styled.div`
    position: relative;

    & img {
        display: block;
        width: 82%;
        margin: 0 auto;
        padding: 80px 0 0 0;
    }
`
const MainSwiper= styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    top: -5%;

    & img {
        width: 90%;
    }
`
const SideFullImage= styled.div`
    & img {
        width: 100%;
        padding: 20px 0 30px 0;
        border-radius: 20px;
    }
`
const CommonSection= styled.section`
    padding: 30px 30px;
    max-width: 1400px;
    border-radius: 20px;
    background-color: #f1f2f3;
    margin: 40px 0;
`
const Title= styled.p`
    font-family: "Pretendard-600";
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -1.5px;
    text-align: center;
    margin: 0 20px;
    color: #101010;
`
const Description= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 18px;
    text-align: center;
    line-height: 40px;
    margin: 0 20px;
    color: #3a3a3a;
`
const Tag= styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    
    font-family: "Noto_Sans_KR-600";
    margin-top: 10px;

    & li {
        list-style: none;
        display: inline-block;
        line-height: 40px;
        padding: 0 20px;
        font-size: 17px;
        margin: 0 4px 4px 0;
        border-radius: 10px;
        color: #101010;
        background: #f1be8b;
        box-shadow: 0 1px 4px rgba(0,0,0,0.5);
    }
`
const MoreButton= styled.a`
    font-family: "Noto_Sans_KR-400";
    float: right;
    font-size: 14px;
    margin: -33px 15px;
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
