import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { thumbsUp } from 'react-icons-kit/typicons/thumbsUp';
import { thumbsDown } from 'react-icons-kit/typicons/thumbsDown';
import { edit } from 'react-icons-kit/typicons/edit';
import { trash } from 'react-icons-kit/typicons/trash';
import { connect } from 'react-redux';
import { openOrCloseCommentPopup, addOrUpdateComment, deleteComment } from '../actions/post';
import * as API from '../utils/api';



class Comment extends Component {

    voteComment(comment, option) {
        const { addOrUpdateCommentProp } = this.props;

        API.voteComment(comment.id, option).then(returning => {
            addOrUpdateCommentProp(returning);
        });
    }

    editComment(comment) {
        const { openOrCloseCommentPopupProp } = this.props;
    
        openOrCloseCommentPopupProp(comment);
    }

    deleteComment(comment) {
        const { deleteCommentProp } = this.props;

        API.deleteComment(comment.id).then(returning => {
            deleteCommentProp(returning.parentId, returning.id);
        });
    }

    render() {
        const { comment } = this.props;

        return (
            <div style={{backgroundColor: "#EEEEEE", padding: "10px", margin: "10px"}} key={comment.id}>

                <div>{comment.body}</div>

                <div>
                    <small>{`Author: ${comment.author} - Date: ${new Date(comment.timestamp).toLocaleString()}`}</small>
                </div>

                <div style={{verticalAlign: "top"}}>
                    <a href="#" onClick={() => this.voteComment(comment, "upVote")}><Icon icon={thumbsUp} size={32} /></a>
                    <span style={{fontSize: 20}}>{`${comment.voteScore}`}</span>
                    <a href="#" onClick={() => this.voteComment(comment, "downVote")}><Icon icon={thumbsDown} size={32} /></a>
                    <a href="#" onClick={() => this.editComment(comment)} style={{ marginLeft: "20px"}} title="Edit"><Icon icon={edit} size={32} /></a>
                    <a href="#" onClick={() => this.deleteComment(comment)} style={{ marginLeft: "20px"}} title="Delete"><Icon icon={trash} size={32} /></a>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        openOrCloseCommentPopupProp: (comment) => dispatch(openOrCloseCommentPopup(comment)),
        addOrUpdateCommentProp: (comment) => dispatch(addOrUpdateComment(comment)),
        deleteCommentProp: (postId, commentId) => dispatch(deleteComment(postId, commentId))
    }
}
  

export default connect(null, mapDispatchToProps)(Comment);