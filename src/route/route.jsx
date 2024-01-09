import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import {EmailPassword}  from '../pages/signup/EmailPassword';
import {ProfileName} from '../pages/signup/ProfileName';
import {StudyUpload} from '../pages/study/StudyUpload';
import StudyList from '../pages/study/StudyList';
import MyProfile from '../pages/profile/MyProfile'
import StudyModify from '../pages/study/StudyModify';
import StudyDetail from '../pages/study/StudyDetail';
import PostUpload from '../pages/post/PostUpload';
import PostList from '../pages/post/PostList'
import PostDetail from '../pages/post/PostDetail';
import PostModify from '../pages/post/PostModify'
import UserProfile from '../pages/profile/UserProfile';
import Follower from '../pages/follow/Follower';
import Following from '../pages/follow/Following'
import Search from '../components/search/Search';
import FollowRecommend from '../pages/follow/FollowRecommend';
import ProfileModify from '../pages/profile/ProfileModify';
import Main from '../pages/home/Main';
import InsideEduket from '../pages/inside/InsideEduket';
import UserStudyRoom from '../pages/study/UserStudyRoom'
import UserPostRoom from '../pages/post/UserPostRoom';

export default function route() {
    return (
        <>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />

                    {/* 에듀켓 소개 */}
                    <Route path="/eduketinfo" element={<InsideEduket />} />

                    {/* 로그인 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<EmailPassword />} />
                    <Route path="/signup/profile" element={<ProfileName />} />
                    
                    {/* 프로필 */}
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/profile/:accountname" element={<UserProfile />} />
                    <Route path="/myprofile/update" element={<ProfileModify />} />

                    {/* 팔로우, 팔로잉 */}
                    <Route path="/profile/:accountname/follower" element={<Follower />} />
                    <Route path="/profile/:accountname/following" element={<Following />} />
                    <Route path="/profile/followRec" element={<FollowRecommend />} />

                    {/* 공부방 */}
                    <Route path="/together" element={<StudyList />} />
                    <Route path="/together/:accountname" element={<UserStudyRoom />} />
                    <Route path="/together/upload" element={<StudyUpload />} />
                    <Route path="/together/detail/:productId" element={<StudyDetail/>} />
                    <Route path="/together/modify/:productId" element={<StudyModify />} />
                    
                    {/* 소통방 */}
                    <Route path="/post/feed" element={<PostList />} /> 
                    <Route path="/post/:accountname" element={<UserPostRoom />} /> 
                    <Route path="/post/upload" element={<PostUpload />} />
                    <Route path="/post/detail/:postId" element={<PostDetail />} />
                    <Route path="/post/modify/:postId" element={<PostModify />} />

                    {/* 예시 검색 */}
                    <Route path="/search" element={<Search />} />
                    
                </Routes>
            </Router>
        </>
    )
}




