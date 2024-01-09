import React from 'react'

import CommentList from './commentList/CommentList'
import {CommentInput} from './commentInput/CommentInput'

export default function Comment({postId, comments, setComments, getComment}) {

    return (
        <div>
            <CommentInput getComment={getComment} postId={postId}></CommentInput>
            <CommentList comments={comments} setComments={setComments} postId={postId}/>
        </div>
    )
}
