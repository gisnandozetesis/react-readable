import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css"
import * as API from '../utils/api';
import Categories from './Categories';
import Post from './Post';
import { postSearchResult, addOrUpdatePost } from '../actions/post';
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

class App extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      editingPost: null,
      modalIsOpen: false
    }

    this.newPost = this.newPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);    
    this.savePost = this.savePost.bind(this);    
  }



  componentDidMount() {
    const { postSearchResultProp } = this.props;

    API.getAllPosts()
      .then(posts => {
        postSearchResultProp(posts);
    
      })
  }

  newPost() {
    this.setState({
        modalIsOpen: true,
        editingPost: null
      });
  }

  editPost(post) {
    this.setState({
      modalIsOpen: true,
      editingPost: post
    });
  }

 
  afterOpenModal() {
    const { editingPost } = this.state;

    this.inputTitle.value = editingPost && editingPost.title;
    this.inputBody.value = editingPost && editingPost.body;
    if (this.inputAuthor) {
      this.inputAuthor.value = "gisnando";
    }
  }


 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  savePost() {

    const { addOrUpdatePostProp } = this.props;

    const savingPost = this.state.editingPost || {};

    savingPost.title = this.inputTitle.value;

    savingPost.body = this.inputBody.value;

    //Se for um novo post atribui os dados complementares
    if (!savingPost.id) {

      savingPost.timestamp = Date.now();

      savingPost.author = this.inputAuthor.value;

      savingPost.category = this.selectCategory.value;
    }

    API.savePost(savingPost).then(returning => {
      
      console.log("returning", returning);
      console.log("keys", Object.keys(returning));

      addOrUpdatePostProp(returning);

    })
  }

  render() {
    const { editingPost } = this.state;
    const { posts, categories } = this.props;
    const commonStyle = {
      width: "100%",
      marginBottom: "10px"
    }

    return (
      <div>
        <div className="App-nav" >
          <Categories />
        </div>
        <div className="Main">

          <button style={{ marginTop: "10px" }} onClick={this.newPost}>New Post</button>

          <hr />

          {posts.map(p => (
            <Post key={p.id} post={p} editPostCallback={() => this.editPost(p)} />
          ))}

          <Modal
            isOpen={this.state.modalIsOpen}
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
                  !editingPost && (<div><input type='text' placeholder='Author' style={commonStyle} ref={(inputAuthor) => this.inputAuthor = inputAuthor} /></div>)
                }
                {
                  !editingPost && (
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


        </div>

      </div>
    );
  }
}




function mapDispatchToProps(dispatch) {
  return {
    postSearchResultProp: (data) => dispatch(postSearchResult(data)),
    addOrUpdatePostProp: (post) => dispatch(addOrUpdatePost(post))
  }
}



function mapStateToProps({ postReducer, categoryReducer }) {
  const { posts } = postReducer;
  const { categories } = categoryReducer;

  const postsArray = Object.keys(posts).reduce((postsResult, postId) => {
    postsResult.push(posts[postId]);
    return postsResult;
  }, [])

  return {
    posts: postsArray, 
    categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
