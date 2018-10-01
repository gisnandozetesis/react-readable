import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import Comment from './Comment';
import { commentSearchResult, openOrCloseCommentPopup } from '../actions/post';

class CommentList extends Component {
    state = {
        comments: null
    }

    newComment() {
        const { post, openOrCloseCommentPopupProp } = this.props;
    
        openOrCloseCommentPopupProp({
            parentId: post.id
        });
    }
    
    listComments(postId) {
        const { commentSearchResultProp } = this.props;

        API.getComments(postId).then(comments => {
            this.setState({ comments });

            commentSearchResultProp(postId, comments);
        });
    }

    render() {
        const { post } = this.props;
        const { comments } = this.props;

        return (
            <div>
                {!comments && (<a href="#" onClick={() => this.listComments(post.id)}>{`${post.commentCount} comments`}</a>)}
                {comments && 
                    comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                }
                
                <div>
                    <button onClick={() => this.newComment()}>Add Comment</button>
                </div>
            </div>
        );
    }
}



function mapStateToProps({ commentReducer }, ownProps) {
    const comments = commentReducer.comments[ownProps.post.id];

    const commentsArray = comments && Object.keys(comments).reduce((commentsResult, commentId) => {
        commentsResult.push(comments[commentId]);
        return commentsResult;
      }, []);

    return {
      comments: commentsArray
    };
}

function mapDispatchToProps(dispatch) {
    return {
      commentSearchResultProp: (postId, comments) => dispatch(commentSearchResult(postId, comments)),
      openOrCloseCommentPopupProp: (comment) => dispatch(openOrCloseCommentPopup(comment))
    }
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
