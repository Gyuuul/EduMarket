import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Slick from '../../components/slick/Slick';
import getUserProfile from '../profile/getUserProfile'
import { setUserInfo } from '../../store/slice/userSlice'
import Heart from '../../components/heart/Heart';
import comment from '../../assets/icons/icon/Comment.webp'

export default function PostItemLi(data) {
    const navigate= useNavigate();
    const dispatch= useDispatch();

    async function setUser(accountname) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }
    return (
        <>
            <ul>
                <ItemList>
                    <ItemDiv>
                        <AuthorDiv onClick={async()=>{
                            await setUser(data.author?.accountname);
                            navigate(`/profile/${data.author?.accountname}`);
                        }}> 
                            <ProfileImg src={data.author?.image} loading="lazy" alt='유저 프로필 이미지'/>
                            <Author>{data.author?.accountname}</Author>
                        </AuthorDiv>

                        <Div onClick={async(e) => {
                            e.stopPropagation();
                            navigate(`/post/detail/${data.id}`);
                        }}> 
                            {data?.image ? <Slick images={data?.image} /> : null}

                            <ItemContent >{data?.content}</ItemContent>
                        </Div>

                        <SideDiv>
                            <Heart
                                data={data}
                                postId={data.id}
                            />

                            <CommentDiv>
                                <Img src={comment} alt="댓글 말풍선 이미지" />
                                <CommentMent>{data.comments.length}</CommentMent>
                            </CommentDiv>
                        </SideDiv>

                    </ItemDiv>
                </ItemList>
            </ul>
        </>
    )
}
const ItemList= styled.li`
    width: 100%;
    transform: translateY(8%);
`
const ItemDiv= styled.div`
    height: 520px;
    margin: 0 15px;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 15px;
    background-color: #ffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`
const AuthorDiv= styled.div`
    display: flex;
    gap: 15px;
    margin: 20px 0 20px 10px;
`
const ProfileImg= styled.img`
    width: 50px;
    height: 50px;
    margin-left: 20px;
    border-radius: 50%;
`
const Author= styled.strong`
    padding: 25px 0px;
    font-family: "Frutiger-lt-pro-normal";
    font-size: 18px;
    color: #3a3a3a; 
`
const Div= styled.div`
    width: 300px;
    margin: 0 auto;
    padding: 12px 20px;
`
const ItemContent= styled.p`
    margin: 30px 0 0 0px;
    font-family: "Noto_Sans_KR-400";
    font-size: 14px;
    color: #3a3a3a;
    line-height: 25px;
`
const SideDiv= styled.div`
    display: flex;
    padding: 0 20px;
    border-top: 1px solid rgba(0,0,0,0.09);
`
const CommentDiv= styled.div`
    display: flex;
`
const Img= styled.img`
    width: 70px;
    height: 70px;
`
const CommentMent= styled.p`
    margin-top: 30px;
    margin-left: -16px;
    font-size: 13px;
    line-height: 10px;
    color: #777;
`