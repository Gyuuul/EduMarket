import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
    name: 'post',
    initialState: {
        req: {
            "content": '',
            "image": ''
        },
        post: {
            "id": '',
            "content": '',
            "image": '',
            "createdAt": '',
            "updatedAt": '',
            "hearted":'',
            "heartCount": 0,
            "commentCount": 0,
            "author": {
                "_id": "작성자 id",
                "username": "2",
                "accountname": "2",
                "intro": "",
                "image": "",
                "isfollow": true, 
                "following": [],
                "follower": [
                    "follower id"
                ],
                "followerCount": 1,
                "followingCount": 0
                    }
            },
            detail: {
                "content": '',
                "image": ''
            }
        },
    reducers: {
        inputPost(state, actions) {
            const { content, image } = actions.payload;
            if (content) state.req.content = content;
            if (image) state.req.image = image;
        },
        changeDetail(state, actions) {
            const { content, image } = actions.payload;
            if (content) state.req.content = content;
            if (image) state.req.image = image;
        }
    }
})

export const { inputPost, changeDetail } = post.actions;
export { post };

