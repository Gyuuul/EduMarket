import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CommentToggle from '../../toggle/CommentToggle';
import getUserProfile from '../../../pages/profile/getUserProfile';
import { setUserInfo } from '../../../store/slice/userSlice';
import { useDispatch } from 'react-redux';

export default function CommentList({postId, comments, setComments}) {
    const navigate= useNavigate();
    const dispatch= useDispatch();

    const commentTime= (createTime)=> {
        const today= new Date();
        const timeValue= new Date(createTime);

        /** (몇)분 계산 함수 */
        const minuteTime= Math.floor(
            (today.getTime()- timeValue.getTime()) /1000 /60,
        );

        if(minuteTime <1){
            return '방금 전';
        }
        if(minuteTime <60){
            return `${minuteTime}분 전`;
        }

        /** (몇)시간 계산 함수 */
        const hourTime= Math.floor(minuteTime / 60);

        if(hourTime <24){
            return `${hourTime}시간 전`;
        }

        /** (몇)일 계산 함수 */
        const dayTime= Math.floor(minuteTime/ 60/ 24);

        if(dayTime <365){
            return `${dayTime}일 전`;
        }

        return `${Math.floor(dayTime / 365)}년 전`;
    };
    
    async function setUser(accountname) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
        console.log(user);
    }

    return (
        <>
            {comments && 
                comments.map((data)=> {
                    return(
                        <Li key={data.id}>
                            <div onClick={async()=>{
                                await setUser(data.author?.accountname);
                                navigate(`/profile/${data.author?.accountname}`);
                            }}>  
                                <ProfileImg src={data.author?.image} alt="유저 프로필 이미지" /> 
                            </div>
                            <Wrap> 
                                <Div>
                                    <AuthorDiv>
                                        <Author> {data.author?.username} </Author>
                                        <br/>
                                        <small> {commentTime(data.createdAt)} </small>
                                    </AuthorDiv>
                                    
                                    <ToggleDiv>
                                        <CommentToggle commentId={data.id} authorId={data.author._id} postId={postId} comments={comments} setComments={setComments}/>
                                    </ToggleDiv>
                                </Div>

                                <CommentDiv>
                                    <Content> {data.content} </Content>
                                </CommentDiv>
                            </Wrap>
                        </Li>
                    )
                })    
            }
        </>
    )
}
const Li= styled.li`
    display: flex;
    margin: 0 20px 20px 20px;
    list-style: none;
`
const Wrap= styled.div`
    flex-grow: 1;
    margin: 30px 0 0 0;
`
const ProfileImg= styled.img`
    width: 32px;
    height: 32px;
    margin: 30px 0 0 0;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`
const Div= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AuthorDiv= styled.div`
    margin: 3px 0 0 10px;

    & small {
        font-family: "Noto_Sans_KR-400";
    }
`
const Author= styled.strong`
    margin-top: 15px;
    font-family: "Frutiger-lt-pro-normal";
    font-size: 15px;
`
const ToggleDiv= styled.div`
    position: relative;
    padding: 10px;
`
const CommentDiv= styled.div`
    margin: 15px 10px;
    padding: 8px 12px;
    border: 1px solid transparent;
    background-color: #F8FAFC;
`
const Content= styled.p`
    font-family: "Noto_Sans_KR-400";
    font-size: 20px;
    line-height: 30px;
`