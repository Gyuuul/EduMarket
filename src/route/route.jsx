import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { EmailPassword }  from '../pages/signup/EmailPassword';
import { ProfileName } from '../pages/signup/ProfileName';
import { StudyUpload } from '../pages/study/StudyUpload';

const Home= lazy(()=> import('../pages/home/Home'));
const Main= lazy(()=> import('../pages/home/Main'));
const Login= lazy(()=> import('../pages/login/Login'));
const InsideEduket= lazy(()=> import('../pages/inside/InsideEduket'));
const MyProfile= lazy(()=> import('../pages/profile/MyProfile'));
const UserProfile= lazy(()=> import('../pages/profile/UserProfile'));
const ProfileModify= lazy(()=> import('../pages/profile/ProfileModify'));
const Follower= lazy(()=> import('../pages/follow/Follower'));
const Following= lazy(()=> import('../pages/follow/Following'));
const FollowRecommend= lazy(()=> import('../pages/follow/FollowRecommend'));
const StudyList= lazy(()=> import('../pages/study/StudyList'));
const StudyModify= lazy(()=> import('../pages/study/StudyModify'));
const StudyDetail= lazy(()=> import('../pages/study/StudyDetail'));
const UserStudyRoom= lazy(()=> import('../pages/study/UserStudyRoom'));
const PostList= lazy(()=> import('../pages/post/PostList'));
const PostUpload= lazy(()=> import('../pages/post/PostUpload'));
const PostModify= lazy(()=> import('../pages/post/PostModify'));
const PostDetail= lazy(()=> import('../pages/post/PostDetail'));
const UserPostRoom= lazy(()=> import('../pages/post/UserPostRoom'));
const Search= lazy(()=> import('../components/search/Search'));

export default function route() {
    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/eduketinfo" element={<InsideEduket />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<EmailPassword />} />
                        <Route path="/signup/profile" element={<ProfileName />} />
                        <Route path="/myprofile" element={<MyProfile />} />
                        <Route path="/profile/:accountname" element={<UserProfile />} />
                        <Route path="/myprofile/update" element={<ProfileModify />} />
                        <Route path="/profile/:accountname/follower" element={<Follower />} />
                        <Route path="/profile/:accountname/following" element={<Following />} />
                        <Route path="/profile/followRec" element={<FollowRecommend />} />
                        <Route path="/together" element={<StudyList />} />
                        <Route path="/together/:accountname" element={<UserStudyRoom />} />
                        <Route path="/together/upload" element={<StudyUpload />} />
                        <Route path="/together/detail/:productId" element={<StudyDetail/>} />
                        <Route path="/together/modify/:productId" element={<StudyModify />} />
                        <Route path="/post/feed" element={<PostList />} /> 
                        <Route path="/post/:accountname" element={<UserPostRoom />} /> 
                        <Route path="/post/upload" element={<PostUpload />} />
                        <Route path="/post/detail/:postId" element={<PostDetail />} />
                        <Route path="/post/modify/:postId" element={<PostModify />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}




