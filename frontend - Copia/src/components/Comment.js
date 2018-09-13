import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { thumbsUp } from 'react-icons-kit/typicons/thumbsUp';
import { thumbsDown } from 'react-icons-kit/typicons/thumbsDown';
import { edit } from 'react-icons-kit/typicons/edit';
import { trash } from 'react-icons-kit/typicons/trash';



class Comment extends Component {

    render() {
        const { comment } = this.props;

        return (
            <div style={{backgroundColor: "#EEEEEE", padding: "10px", margin: "10px"}} key={comment.id}>

                <div>{comment.body}</div>

                <div>
                    <small>{`Author: ${comment.author} - Date: ${new Date(comment.timestamp).toLocaleString()}`}</small>
                </div>

                <div style={{verticalAlign: "top"}}>
                    <a href="#"><Icon icon={thumbsUp} size={32} /></a>
                    <span style={{fontSize: 20}}>{`${comment.voteScore}`}</span>
                    <a href="#"><Icon icon={thumbsDown} size={32} /></a>
                    <a href="#" style={{ marginLeft: "20px"}} title="Edit"><Icon icon={edit} size={32} /></a>
                    <a href="#" style={{ marginLeft: "20px"}} title="Delete"><Icon icon={trash} size={32} /></a>
                </div>
            </div>
        );
    }
}

export default Comment;