import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css"
import * as API from '../utils/api';
import Categories from './Categories';
import Post from './Post';
import { postSearchResult } from '../actions/post';
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

//Modal.setAppElement(document.getElementById('root'));

class App extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);    
  }



  componentDidMount() {
    const { postSearchResultProp } = this.props;

    API.getAllPosts()
      .then(posts => {
        postSearchResultProp(posts);
    
      })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <div className="App-nav" >
          <Categories />
        </div>
        <div className="Main">

          <button style={{ marginTop: "10px"}} onClick={this.openModal}>New Post</button>

          <hr />

          {posts.map(p => (
            <Post key={p.id} post={p} />
          ))}

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>


        </div>

      </div>
    );
  }
}




function mapDispatchToProps(dispatch) {
  return {
    postSearchResultProp: (data) => dispatch(postSearchResult(data))
  }
}



function mapStateToProps({ postReducer }) {
  const { posts } = postReducer;
  return {
    posts
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
