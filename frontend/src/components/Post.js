import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { thumbsUp } from 'react-icons-kit/typicons/thumbsUp';
import { thumbsDown } from 'react-icons-kit/typicons/thumbsDown';
import { edit } from 'react-icons-kit/typicons/edit';
import { trash } from 'react-icons-kit/typicons/trash';

import CommentList from './CommentList';

class Post extends Component {

    render() {
        const { post, editPostCallback } = this.props;

        return (
            <div>
                <div>
                    <a href="#" onClick={editPostCallback}><h2>{post.title}</h2></a>
                </div>

                <div>
                    <p>{post.body}</p>
                </div>

                <div>
                    <small>{`Author: ${post.author} - Date: ${new Date(post.timestamp).toLocaleString()}`}</small>
                </div>

                <div style={{verticalAlign: "top"}}>
                    <a href="#"><Icon icon={thumbsUp} size={32} /></a>
                    <span style={{fontSize: 20}}>{`${post.voteScore}`}</span>
                    <a href="#"><Icon icon={thumbsDown} size={32} /></a>
                    <a href="#" onClick={editPostCallback} style={{ marginLeft: "20px"}} title="Edit"><Icon icon={edit} size={32} /></a>
                    <a href="#" style={{ marginLeft: "20px"}} title="Delete"><Icon icon={trash} size={32} /></a>
                </div>

                <CommentList post={post} />

                <hr></hr>
            </div>
    );
    }
}


export default Post;