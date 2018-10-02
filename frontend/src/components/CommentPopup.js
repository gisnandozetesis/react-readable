import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { openOrCloseCommentPopup, addOrUpdateComment } from '../actions/post';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement(document.getElementById('root'));

class CommentPopup extends Component {
    constructor() {
        super();

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveComment = this.saveComment.bind(this);
    }


    afterOpenModal() {
        const { editingComment } = this.props;

        this.inputBody.value = editingComment.body || '';

        if (this.inputAuthor) {
            this.inputAuthor.value = "gisnando";
        }
    }


    saveComment() {

        const { addOrUpdateCommentProp, editingComment } = this.props;

        editingComment.body = this.inputBody.value;

        //Se for um novo Comment atribui os dados complementares
        if (!editingComment.id) {

            editingComment.timestamp = Date.now();

            editingComment.author = this.inputAuthor.value;
        }

        API.saveComment(editingComment).then(returning => {

            addOrUpdateCommentProp(returning);

            this.closeModal();
        });
    }


    closeModal() {
        const { openOrCloseCommentPopupProp } = this.props;
        openOrCloseCommentPopupProp();
    }


    render() {
        const { editingComment } = this.props;
        const newComment = editingComment && !editingComment.id;

        const commonStyle = {
            width: "100%",
            marginBottom: "10px"
        };

        return (

            <Modal
                isOpen={editingComment !== null}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Commentsss"
            >
                <h2>Comment</h2>
                <form>
                    <div>
                        <div><textarea placeholder='Body' style={commonStyle} rows="8" cols="50" ref={(inputBody) => this.inputBody = inputBody} /></div>
                        {
                            newComment && (<div><input type='text' placeholder='Author' style={commonStyle} ref={(inputAuthor) => this.inputAuthor = inputAuthor} /></div>)
                        }
                    </div>
                    <button onClick={this.saveComment}>Ok</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </form>
            </Modal>

        );
    }


}


function mapStateToProps({ commentReducer }) {
    const { editingComment } = commentReducer;


    return {
        editingComment
    };
}


function mapDispatchToProps(dispatch) {
    return {
        addOrUpdateCommentProp: (comment) => dispatch(addOrUpdateComment(comment)),
        openOrCloseCommentPopupProp: (comment) => dispatch(openOrCloseCommentPopup(comment))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentPopup);