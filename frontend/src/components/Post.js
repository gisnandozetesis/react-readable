import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { thumbsUp } from 'react-icons-kit/typicons/thumbsUp';
import { thumbsDown } from 'react-icons-kit/typicons/thumbsDown';
import { edit } from 'react-icons-kit/typicons/edit';
import { trash } from 'react-icons-kit/typicons/trash';
import { openOrClosePostPopup, addOrUpdatePost, deletePost } from '../actions/post';
import * as API from '../utils/api';
import { connect } from 'react-redux';

import CommentList from './CommentList';

class Post extends Component {


    votePost(post, option) {
        const { addOrUpdatePostProp } = this.props;

        API.votePost(post.id, option).then(returning => {
            addOrUpdatePostProp(returning);
        });
    }

    editPost(post) {
        const { openOrClosePostPopupProp } = this.props;
    
        openOrClosePostPopupProp(post);
    }

    deletePost(post) {
        const { deletePostProp } = this.props;

        API.deletePost(post.id).then(returning => {
            deletePostProp(returning.id);
        });
    }

    
    render() {
        const { post } = this.props;

        return (
            <div>
                <div>
                    <h2>{post.title}</h2>
                </div>

                <div>
                    <p>{post.body}</p>
                </div>

                <div>
                    <small>{`Author: ${post.author} - Date: ${new Date(post.timestamp).toLocaleString()}`}</small>
                </div>

                <div style={{verticalAlign: "top"}}>
                    <a href="#" onClick={() => this.votePost(post, "upVote")}><Icon icon={thumbsUp} size={32} /></a>
                    <span style={{fontSize: 20}}>{`${post.voteScore}`}</span>
                    <a href="#" onClick={() => this.votePost(post, "downVote")}><Icon icon={thumbsDown} size={32} /></a>
                    <a href="#" onClick={() => this.editPost(post)} style={{ marginLeft: "20px"}} title="Edit"><Icon icon={edit} size={32} /></a>
                    <a href="#" onClick={() => this.deletePost(post)} style={{ marginLeft: "20px"}} title="Delete"><Icon icon={trash} size={32} /></a>
                </div>

                <CommentList post={post} />

                <hr></hr>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        openOrClosePostPopupProp: (post) => dispatch(openOrClosePostPopup(post)),
        addOrUpdatePostProp: (post) => dispatch(addOrUpdatePost(post)),
        deletePostProp: (postId) => dispatch(deletePost(postId))
    }
}
  

export default connect(null, mapDispatchToProps)(Post);