import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/home/Home'
import Main from '../pages/home/Main';

import InsideEduket from '../pages/inside/InsideEduket';

import { EmailPassword }  from '../pages/signup/EmailPassword';
import { ProfileName } from '../pages/signup/ProfileName';
import Login from '../pages/login/Login'

import MyProfile from '../pages/profile/MyProfile'
import UserProfile from '../pages/profile/UserProfile';
import ProfileModify from '../pages/profile/ProfileModify';

import Follower from '../pages/follow/Follower';
import Following from '../pages/follow/Following'
import FollowRecommend from '../pages/follow/FollowRecommend';

import { StudyUpload } from '../pages/study/StudyUpload';
import StudyList from '../pages/study/StudyList';
import StudyModify from '../pages/study/StudyModify';
import StudyDetail from '../pages/study/StudyDetail';
import UserStudyRoom from '../pages/study/UserStudyRoom'

import PostUpload from '../pages/post/PostUpload';
import PostList from '../pages/post/PostList'
import PostModify from '../pages/post/PostModify'
import PostDetail from '../pages/post/PostDetail';
import UserPostRoom from '../pages/post/UserPostRoom';

import Search from '../components/search/Search';

export default function route() {
    return (
        <>
            <Router>
                <Routes>
                    {/* HOME */}
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />

                    {/* INSIDE EDUKET */}
                    <Route path="/eduketinfo" element={<InsideEduket />} />

                    {/* LOGIN, SIGNUP */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<EmailPassword />} />
                    <Route path="/signup/profile" element={<ProfileName />} />
                    
                    {/* PROFILE */}
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/profile/:accountname" element={<UserProfile />} />
                    <Route path="/myprofile/update" element={<ProfileModify />} />

                    {/* FOLLOW */}
                    <Route path="/profile/:accountname/follower" element={<Follower />} />
                    <Route path="/profile/:accountname/following" element={<Following />} />
                    <Route path="/profile/followRec" element={<FollowRecommend />} />

                    {/* STUDY */}
                    <Route path="/together" element={<StudyList />} />
                    <Route path="/together/:accountname" element={<UserStudyRoom />} />
                    <Route path="/together/upload" element={<StudyUpload />} />
                    <Route path="/together/detail/:productId" element={<StudyDetail/>} />
                    <Route path="/together/modify/:productId" element={<StudyModify />} />
                    
                    {/* POST */}
                    <Route path="/post/feed" element={<PostList />} /> 
                    <Route path="/post/:accountname" element={<UserPostRoom />} /> 
                    <Route path="/post/upload" element={<PostUpload />} />
                    <Route path="/post/detail/:postId" element={<PostDetail />} />
                    <Route path="/post/modify/:postId" element={<PostModify />} />

                    {/* SEARCH */}
                    <Route path="/search" element={<Search />} />
                </Routes>
            </Router>
        </>
    )
}




