import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import PostItemLi from './PostItemLi';
import { getPostList } from '../../components/post/getPostList';
import post from '../../assets/icons/illustration/Post.webp';
import postResize from '../../assets/icons/illustration/Post_resized.webp'

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
            setPages(pages + 1);
        }
        fetchMyPostList();
    },[]);

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
                    <img src={post} srcSet={postResize}  
                    alt="포스트 페이지 대표 이미지" />
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
                        <button onClick={goPostUpload} aria-label="작성하기"> 작성하기 </button>
                    </WriteSection>  
                    {postList.length ? (
                        <>
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
                                <div ref={ref}/>
                            </Ul>
                            <button onClick={goPostUpload} aria-label=" 게시글 작성"></button>
                        </>
                    ) : (
                        <>
                        <Alert> Loading . . </Alert>
                        <button onClick={goPostUpload} aria-label="게시글 작성"></button>
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
    width: 100%;
    height: 100%;
    padding: 30px 0;
    background-color: #f1f2f3;
`
const Post= styled.div`
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
`
const Div= styled.div`
    margin-top: -10px;
    border-radius: 10px;
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
    left: 50%;
    padding: 10px 20px 20px;
    font-family: "Frutiger-lt-pro-600";
    font-size: 35px;
    font-weight: 600;
    color: #3a3a3a;
    text-shadow: 2px 2px 0px #90979f;
    transform: translate(-50%, -50%);
`
const PostDescription= styled.p`
    margin: 10px 15px 0 15px;
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    line-height: 80px;
    text-align: center;
    color: #777;
`
const WriteSection= styled.div`
    display: flex;
    & button {
        width: 280px;
        margin: 0 15px; 
        border: 1px solid rgba(0,0,0,0.09);
        border-radius: 10px;
        background-color: #ffff;
        font-family: "Noto_Sans_KR-400";
        font-size: 20px;
        color: #3a3a3a;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
`
const WriteDiv= styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 96%;
    margin: 0 15px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 10px;
    background-color: #ffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    & img {
        width: 60px;
        height: 60px;
        padding: 12px;
        border-radius: 50%;
    }
`
const BoxDiv= styled.div`
    width: 90%;
    padding: 15px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    background-color: #f1f2f3;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
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
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
    line-height: 0;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }   
`
const Li= styled.li`
    flex: 0 0 33.33333%;
    margin: 0 0 50px 0;
    padding: 0 0 0;
    vertical-align: top;
    @media screen and (max-width: 1200px) {
        flex: 0 0 33.5%;
    }
    @media screen and (max-width: 1100px) {
        flex:0 0 50%;
    }
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`
const Alert= styled.p`
    padding: 50px 0 30px;
    font-family: "Noto_Sans_KR-600";
    font-size: 35px;
    text-align: center;
    color: #C63D2F;
`