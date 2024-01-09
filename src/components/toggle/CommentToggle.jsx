import React from 'react'
import { useSelector } from 'react-redux';

import CommentDelete from '../comment/CommentDelete';
import CommentReport from '../comment/CommentReport';

export default function CommentToggle({commentId, postId, authorId, comments, setComments}) {
    const _id = useSelector((state) => state.user.myInfo._id);
    
    //내가 작성한 글
    if (authorId === _id) {
        return (
            <CommentDelete
                commentId={commentId}
                postId={postId}
                comments={comments}
                setComments={setComments}
            />
        );
    }else {
        return <CommentReport commentId={commentId} postId={postId} />
    }
}
