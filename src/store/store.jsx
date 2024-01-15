import { configureStore } from '@reduxjs/toolkit';
import { user } from './slice/userSlice'
import { together } from './slice/togetherSlice';

export default configureStore({
    reducer:{
        user: user.reducer,
        together: together.reducer,
    },
});