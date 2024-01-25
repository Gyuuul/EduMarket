import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Common from '../../components/common/Common';
import { URL } from '../../lib/apis/constant/path';
import Slick from '../../components/slick/Slick';

export default function MyProfile() {
    const user= useSelector((state)=> state.user?.myInfo);
    const accountName = localStorage.getItem('Account Name');
    const token= localStorage.getItem('Access Token');
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const [pages, setPages]= useState(12);
    const [count, setCount]= useState(0);
    const [postList, setPostList]= useState([]);
    const [postId, setPostId]= useState([]);
    const [productList, setProductList]= useState([]);


    // 나의 상품 리스트
    const MyTogetherList= async() => {
        const res= await axios.get(`${URL}/product/${accountName}/?limit=${pages}&skip=0`, {
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            }
        })
        const data= res?.data?.product;
        setProductList([...data]);
        setCount(data.length);
    }

    // 나의 게시글 리스트
    const MyPostList= async() => {
        const res= await axios.get(`${URL}/post/${accountName}/userpost/?limit=${pages}&skip=0`, {
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type" : "application/json"
                }
            })
            const data= res?.data?.post;
            setPostList([...data]);
            setCount(data.length);
        }
        
    useEffect(()=>{
        MyTogetherList();
        MyPostList();
    }, [pages]);

    const pageTitle = 'MY PROFILE';
    const pageDesc = `나의 정보와 게시글, 스터디를 확인합니다.`;

    const page= (
        <>
            <ProfileWrap>
                <MyProfileDiv>
                    <Title>
                        <h2>MY PAGE</h2>
                    </Title>

                    <MypageMenu>
                        <ul>
                            <li>
                                <a href="http://localhost:3000/#/myprofile">Content</a>
                            </li>
                            <li>
                                <a href="http://localhost:3000/#/myprofile/update">Profile</a>
                            </li>
                        </ul>
                    </MypageMenu>
                    
                    <Wrap>
                        <ProfileDiv>
                            <Img src={user?.image} alt="나의 프로필 이미지" />

                            <Profiles>
                                <NameDiv>
                                    <Name>{user?.username}</Name>
                                    <Id>@ {user?.accountname}</Id>
                                </NameDiv>

                                <FollowDiv>
                                    <FollowLink to={`/profile/${user?.accountname}/follower`} aria-label="팔로우 페이지">
                                        <Follow>Follower <strong>{user?.followerCount}</strong></Follow>
                                    </FollowLink>

                                    <FollowLink to={`/profile/${user?.accountname}/following`} aria-label="팔로잉 페이지">
                                        <Follow>Following <strong>{user?.followingCount}</strong></Follow>
                                    </FollowLink>
                                </FollowDiv>
                            </Profiles>

                            <Intro>{user?.intro}</Intro> 
                    </ProfileDiv>
                    

                        { postList.length ? (
                        <PostDiv>
                            <SubTitle>My Post</SubTitle>
                            <Ul>
                                {postList.map((item)=>(
                                    <Li>
                                        <Div onClick={async(e) => {
                                            e.stopPropagation();
                                            navigate(`/post/detail/${item.id}`);
                                        }}>
                                            {item?.image ? <Slick images={item?.image} /> : null}
                                            <p>{item?.content}</p>
                                        </Div>
                                    </Li>
                                ))}
                            </Ul>
                        </PostDiv>
                    )
                :
                (
                    <Alert>
                        등록된 게시글이 없습니다.
                    </Alert>
                )}  

                    { productList.length ? (
                        <StudyDiv>
                            <SubTitle>My Study</SubTitle>
                            <Ul>
                                {productList.map((item)=>(
                                    <Li>
                                        <Div 
                                        onClick={async(e) => {
                                            e.stopPropagation();
                                            navigate(`/together/detail/${item.id}`);
                                        }}
                                        >
                                            <img src={item.itemImage} alt='스터디 대표 이미지'></img>
                                            <StudyName>{item.itemName}</StudyName>
                                            <StudyIntro>{item.link}</StudyIntro>
                                        </Div>
                                    </Li>
                                ))}
                            </Ul>
                        </StudyDiv>
                    )
                :
                (
                    <Alert>
                        등록된 상품이 없습니다.
                    </Alert>
                )}
                    </Wrap>
                </MyProfileDiv>
            </ProfileWrap>
        </>
    )
    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}
const ProfileWrap= styled.div`
    background-color: #f1f2f3;
    padding: 30px 0;
`
const MyProfileDiv= styled.div`
    max-width: 1400px;
    margin: 0 auto;
`
const Title= styled.div`
    padding: 200px 0 90px 0;
    font-size: 40px;
    text-align: center;
    color: #2b2b2b;
    border: none;

    &h2{
        font-family: "Frutiger-lt-pro-600";
        display: inline-block;
        color: #2b2b2b;
    }
`
const Wrap= styled.div`
    padding: 40px 80px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 50px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const MypageMenu= styled.div`
    text-align: center;
    margin: 0 0 60px 0;

    & li{
        font-family: "Frutiger-lt-pro-600";
        display: inline-block;
        margin: 0 20px;
    }

    & li a{
        color: #868686;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.1;
        margin: 0 30px 0 10px;
        border-bottom: 2px solid transparent;
    }

    & li a:hover, a:active{
    color: #A73121;
    border-bottom: 2px solid #A73121;
    }
`
const ProfileDiv= styled.div`
    display: flex;
    gap: 70px;
    padding: 30px 0 60px 0; 
`
const Img= styled.img`
    width: 200px;
    height: 200px;
    margin-left: -10px;
    border-radius: 50%;
`
const Profiles= styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
const NameDiv= styled.div`
    margin: 20px 0px;
`
const Name= styled.h2`
    font-family: "Frutiger-lt-pro-normal";
    font-size: 30px;
    color: #2b2b2b;
`
const Id= styled.h3`
    font-family: "Frutiger-lt-pro-normal";
    font-weight: 500;
    font-size: 18.85px;
    color: #777;
`
const FollowDiv= styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`
const FollowLink = styled(Link)`
    margin: 20px 0px;
`
const Follow= styled.p`
    font-family: "Frutiger-lt-pro-normal";
    font-weight: 400;
    font-size: 18.85px;
    color: #777;

    & strong{
        color: #2b2b2b;
    }
`
const Intro= styled.p`
    font-family: "Noto_Sans_KR-400";
    color: #2b2b2b;
    font-size: 18px;
    border-radius: 50px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;
    flex-grow: 1;
    padding: 30px;
    margin-top: -10px;
`
const PostDiv= styled.div`
    padding: 30px 0; 
    border-top: 1px solid rgba(0,0,0,0.09);
    border-bottom: 1px solid rgba(0,0,0,0.09);
`
const SubTitle= styled.p`
    font-family: "Frutiger-lt-pro-600";
    font-size: 30px;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    margin: 0 0 50px 0;
`
const Alert= styled.p`
    font-family: "Noto_Sans_KR-600";
    font-size: 30px;
    text-align: center;
    color: #C63D2F;
    padding: 50px 0 30px;
`
const StudyDiv= styled.div`
    padding: 30px 0;
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
    height: 400px;
    margin: 0 auto;
    padding: 12px 20px;

    background-color: #f1f2f3;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);

    & img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    & p {
        font-family: "Noto_Sans_KR-400";
        line-height: 28px;
        margin: 30px 0 0 0px;
    }
`