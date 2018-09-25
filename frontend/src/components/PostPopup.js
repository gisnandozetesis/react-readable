import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { openOrClosePostPopup, addOrUpdatePost } from '../actions/post';
import Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
Modal.setAppElement(document.getElementById('root'));
  
class PostPopup extends Component {
    constructor() {
        super();

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);    
        this.savePost = this.savePost.bind(this);    
    }
    

    afterOpenModal() {
        const { editingPost } = this.props;
    
        this.inputTitle.value = editingPost.title || '';

        this.inputBody.value = editingPost.body || '';

        if (this.inputAuthor) {
            this.inputAuthor.value = "gisnando";
        }
    }


    savePost() {

        const { addOrUpdatePostProp, editingPost } = this.props;
    
        editingPost.title = this.inputTitle.value;
    
        editingPost.body = this.inputBody.value;
    
        //Se for um novo post atribui os dados complementares
        if (!editingPost.id) {
    
            editingPost.timestamp = Date.now();
    
            editingPost.author = this.inputAuthor.value;
    
            editingPost.category = this.selectCategory.value;
        }
    
        API.savePost(editingPost).then(returning => {

          addOrUpdatePostProp(returning);

          this.closeModal();
        });
    }


    closeModal() {
        const { openOrClosePostPopupProp } = this.props;
        openOrClosePostPopupProp();
    }
    
    
    render() {
        const { editingPost, categories } = this.props;
        const newPost = editingPost && !editingPost.id;
    
        const commonStyle = {
            width: "100%",
            marginBottom: "10px"
        };
      
        return (

            <Modal
            isOpen={editingPost !== null}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Post</h2>
            <form>
              <div>
                <div><input type='text' style={commonStyle} placeholder='Title' ref={(inputTitle) => this.inputTitle = inputTitle} /></div>
                <div><textarea placeholder='Body' style={commonStyle} rows="8" cols="50" ref={(inputBody) => this.inputBody = inputBody} /></div>
                {
                  newPost && (<div><input type='text' placeholder='Author' style={commonStyle} ref={(inputAuthor) => this.inputAuthor = inputAuthor} /></div>)
                }
                {
                  newPost && (
                    <div>
                    <select style={commonStyle} ref={(selectCategory) => this.selectCategory = selectCategory}>
                      {
                        categories && categories.map(c => (
                          <option key={c.path} value={c.path}>{c.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  )
                }
              </div>
              <button onClick={this.savePost}>Ok</button>
              <button onClick={this.closeModal}>Cancel</button>
            </form>
          </Modal>

        );
    }


}


function mapStateToProps({ postReducer, categoryReducer }) {
    const { categories } = categoryReducer;
    const { editingPost } = postReducer;

  
    return {
      categories,
      editingPost
    };
  }
  

function mapDispatchToProps(dispatch) {
  return {
    addOrUpdatePostProp: (post) => dispatch(addOrUpdatePost(post)),
    openOrClosePostPopupProp: (post) => dispatch(openOrClosePostPopup(post))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostPopup);