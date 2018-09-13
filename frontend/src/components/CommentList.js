import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import Comment from './Comment';


class CommentList extends Component {
    state = {
        comments: null
    }

    ListComments(postId) {
        API.getComments(postId).then(comments => {
            this.setState({ comments });
        });
    }

    render() {
        const { post } = this.props;
        const { comments } = this.state;

        return (
            <div>
                {!comments && (<a href="#" onClick={() => this.ListComments(post.id)}>{`${post.commentCount} comments`}</a>)}
                {comments && 
                    comments.map(comment => (
                        <Comment comment={comment} />
                    ))
                }
                
                <div>
                    <button>Add Comment</button>
                </div>
            </div>
        );
    }
}


function mapStateToProps({ commentReducer }, ownProps) {
    const comments = commentReducer[ownProps.post.postId];

    return {
      comments
    };
}
  
export default connect(mapStateToProps, null)(CommentList);
