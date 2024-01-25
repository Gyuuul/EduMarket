import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Common from '../../components/common/Common'
import { URL } from '../../lib/apis/constant/path'
import PostDelete from './PostDelete';
import Slick from '../../components/slick/Slick';
import Comment from '../../components/comment/Comment';
import getUserProfile from '../profile/getUserProfile';
import { setUserInfo } from '../../store/slice/userSlice';
import Heart from '../../components/heart/Heart';
import comment from '../../assets/icons/icon/Comment.webp'
import MoreButton from '../../assets/icons/icon/icon-more.webp'

export default function PostDetail() {
    const [comments, setComments]= useState([]);
    const [detail, setDetail]= useState(null);
    const [pages, setPages] = useState(0);
    const [userAccountName, setUserAccountName]= useState();
    const [visible, setVisible]= useState(false);
    const { postId }= useParams();
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const userToken= localStorage.getItem('Access Token');
    const myAccountname= useSelector((state)=> state.user.myInfo.accountname);

    const Detail= async ()=> {
        const res= await axios.get(`${URL}/post/${postId}`, {
            headers: {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }
        });
        const data= res.data?.post;
        setDetail(data);
        setUserAccountName(res.data?.post?.author?.accountname);
    }
    const getComment= async ()=> {
        const res= await axios.get(`${URL}/post/${postId}/comments/?limit=10&skip=${pages * 10}`, {
            headers: {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }
        })
        const data= res.data?.comments;
        setComments(data);
    }
    useEffect(()=> {
        Detail();
        getComment();
    },[]);
    const handlePostModify= ()=> {
        navigate(`/post/modify/${postId}`);
    };
    async function setUser(accountname) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }
    const page= (
        <PostWrap>
            <PostsDetail>
                {detail && (
                    <PostDiv>
                        <DetailTop>
                            <AuthorDiv onClick={async()=>{
                                await setUser(detail?.author?.accountname);
                                if(detail?.author?.accountname === myAccountname){
                                    navigate('/myprofile');
                                }else{
                                    navigate(`/profile/${detail?.author?.accountname}`);
                                }
                            }}>  
                                <ProfileImg src={detail?.author?.image} alt="유저 프로필 이미지" />
                                <Author>{detail?.author?.accountname}</Author>
                            </AuthorDiv>

                            <ToggleDiv>
                                { myAccountname=== userAccountName && (
                                    <>
                                        <ToggleImg src={MoreButton} onClick={() => setVisible(!visible)} alt="" />
                                        { visible && (
                                            <>
                                                <ToggleWrapper>
                                                    <div onClick={() => handlePostModify()}>
                                                        <P>수정</P>
                                                    </div>
                                                    <PostDelete/>
                                                </ToggleWrapper>
                                            </>
                                        )}
                                    </>
                                )}
                            </ToggleDiv>
                        </DetailTop>

                        <Div>
                        {detail?.image ? <Slick images={detail?.image} /> : null}
                        </Div>

                        <ContentDiv>{detail?.content}</ContentDiv>

                        <SideDiv>
                            <HeartDiv>
                                <Heart
                                    data={detail}
                                    postId= {postId}
                                />
                            </HeartDiv>

                            <CommentDiv>
                                <Img src={comment} alt="댓글 말풍선 이미지" />
                                <CommentMent>{comments.length}</CommentMent>
                            </CommentDiv>
                        </SideDiv>

                        <Comment postId={postId} comments={comments} setComments={setComments} getComment={getComment}/>
                    </PostDiv>
                )}
                </PostsDetail>
            </PostWrap>
    )

    return (
        <>
            <Common page={page} />
        </>
    )
}
const PostWrap= styled.div`
    background-color: #f1f2f3;
    padding: 30px 0;
`
const PostsDetail= styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 120px 0 0 0;
`
const PostDiv= styled.div`
    padding: 30px 40px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    background-color: #ffff;
`
const DetailTop= styled.div`
    display: flex;
    justify-content: space-between;
`
const Div= styled.div`
    width: 1000px;
    height: 600px;
    margin: 0 auto;
    & img {
        width: 100%;
        height: 600px;
        object-fit: cover;
    }
`
const ContentDiv= styled.div`
    font-size: 20px;
    color: #3a3a3a; 
    line-height: 30px;
    margin: 24px 100px 24px 100px;
    font-family: "Noto_Sans_KR-400";
`
const SideDiv= styled.div`
    display: flex;
`
const HeartDiv= styled.div`
    margin-left: 100px;
`
const CommentDiv= styled.div`
    display: flex;
`
const Img= styled.img`
    width: 70px;
    height: 70px;
`
const CommentMent= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 13px;
    color: #777;
    margin-top: 26px;
    margin-left: -16px;
`
const AuthorDiv= styled.div`
    display: flex;
    gap: 15px;
    margin-left: 100px;
    margin-bottom: 24px;
`
const ProfileImg= styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Author= styled.strong`
    font-size: 20px;
    padding: 8px 0px;
    color: #3a3a3a; 
`
const P= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
    margin-bottom: 5px;
`
const ToggleDiv= styled.div`
    position: relative;
`
const ToggleWrapper = styled.section`
    position: absolute;
    width: 100px;
    right: 120px;
    padding: 10px 0;
    margin: -45px 25px 0 0;
    background-color: white;
    border-radius: 10px;
    border-top-right-radius: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;
`
const ToggleImg= styled.img`
    width: 40px;
    height: 40px;
    margin-right: 100px;
    margin-top: 5px;
`