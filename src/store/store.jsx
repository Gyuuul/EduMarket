import { configureStore } from '@reduxjs/toolkit';
import {user} from './slice/userSlice'
import { together } from './slice/togetherSlice';
import { post } from './slice/postSlice';

export default configureStore({
    reducer:{
        user: user.reducer,
        together: together.reducer,
        post: post.reducer,
    },
});