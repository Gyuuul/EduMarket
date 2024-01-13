import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import Common from '../../components/common/Common'
import PostItemLi from './PostItemLi';
import { getPostList } from '../../components/post/getPostList';
import post from '../../assets/icons/illustration/Post.gif'

export default function PostList() {
    const myProfile= useSelector((state)=> state.user.myInfo.image);
    const navigate= useNavigate();
    const [ref, inView]= useInView();

    // 전체 게시글
    const [postList, setPostList]= useState([]);
    // 사용자에게 보여지는 게시글
    const [showList, setShowList]= useState([]);

    const [pages, setPages]= useState(0);

    const goPostUpload= ()=> {
        navigate('/post/upload');
    }

    useEffect(()=>{
        async function fetchMyPostList(){
            let list= await getPostList();
            setPostList(list);
            setShowList(list.slice(pages * 10, pages * 10 + 10));
                console.log(list)
            setPages(pages + 1);
        }
        fetchMyPostList();
    },[]);

    // 무한스크롤 함수
    const addShowPost= ()=> {
        const addPostList= postList.slice(pages * 10, pages * 10 + 10);
        setShowList([...showList, ...addPostList]);
        setPages(pages + 1);
    };

    useEffect(()=> {
        if(inView){
            addShowPost();
        }
    },[inView]);

    const pageTitle = 'POST PAGE';
    const pageDesc = `EDUKET은 다양한 분야의 이야기를 공유함으로써 취업준비생, 신입부터 경력자까지 현업에서의 이야기를 듣고 학습할 수 있습니다.`;

    const page= (
        <PostDiv>
            <Post>
                <PostPicture>
                    <img src={post} alt="포스트 페이지 대표 이미지" />
                </PostPicture>
                <PostTitle>EDUKET POST</PostTitle>

                <Div>
                    <PostDescription>각 분야에서 반응이 좋았던 게시물을 만나보세요.</PostDescription>
                    
                    <WriteSection>  
                        <WriteDiv>
                            <img src={myProfile} alt="나의 프로필 이미지" />
                            <BoxDiv onClick={goPostUpload}>
                                <p> 직무에 대해서 나누고 싶은 이야기가 있으신가요?</p>
                            </BoxDiv>
                        </WriteDiv>
                        <button onClick={goPostUpload}> 작성하기 </button>
                    </WriteSection>  

                    {postList.length ? (
                        <div>
                            <Ul>
                                {postList &&
                                    showList.map((item)=> (
                                        <Li>
                                            <PostItemLi
                                                key={item.id}
                                                {...item}
                                            ></PostItemLi>
                                        </Li>
                                    ))}
                                <div ref={ref}></div>
                            </Ul>

                            <button onClick={goPostUpload}></button>
                        </div>
                    ) : (
                        <>
                        <Alert> 등록된 글이 없습니다.</Alert>
                        <button onClick={goPostUpload}></button>
                    </>
                    )} 
                </Div>
            </Post>
        </PostDiv>
    )

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    )
}
const PostDiv= styled.div`
    background-color: #f1f2f3;
    padding: 30px 0;
`
const Post= styled.div`
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
`
const Div= styled.div`
    border-radius: 10px;
    margin-top: -10px;
`
const PostPicture= styled.div`
    & img {
        display: block;
        width: 100%;
        height: 80%;
        margin: 0 auto;
        border-radius: 10px;
    }
`
const PostTitle= styled.p`
    position: absolute;
    width: fit-content;

    font-family: "Frutiger-lt-pro-600";
    font-size: 35px;
    font-weight: 600;
    color: #3a3a3a;
    text-shadow: 2px 2px 0px #90979f;
    
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px 20px;
`
const PostDescription= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    line-height: 80px;
    text-align: center;
    color: #777;
    margin: 10px 15px 0 15px;
`
const WriteSection= styled.div`
    display: flex;

    & button {
        width: 280px;
        margin: 0 15px; 

        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #3a3a3a;

        border: 1px solid rgba(0,0,0,0.09);
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        background-color: #ffff;
    }
`
const WriteDiv= styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    width: 96%;
    padding: 10px;
    margin: 0 15px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;

    & img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 12px;
    }
`
const BoxDiv= styled.div`
    width: 90%;
    padding: 15px;

    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #f1f2f3;

    cursor: pointer;

    & p {
        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #94A3B8;
    }
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
const Alert= styled.p`
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
    padding: 50px 0 30px;
`