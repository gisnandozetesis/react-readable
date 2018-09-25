import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css"
import * as API from '../utils/api';
import Categories from './Categories';
import Post from './Post';
import { postSearchResult, openOrClosePostPopup } from '../actions/post';
import PostPopup from './PostPopup';

class App extends Component {

  constructor() {
    super();

    this.state = {
      posts: []
    }

    this.newPost = this.newPost.bind(this);
  }

  componentDidMount() {
    const { postSearchResultProp } = this.props;

    API.getAllPosts()
      .then(posts => {
        postSearchResultProp(posts);
    
      })
  }

  newPost() {
    const { openOrClosePostPopupProp } = this.props;

    openOrClosePostPopupProp({});
  }

  render() {
    const { posts } = this.props;
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
            <Post key={p.id} post={p} />
          ))}

          <PostPopup />

        </div>

      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    postSearchResultProp: (data) => dispatch(postSearchResult(data)),
    openOrClosePostPopupProp: (post) => dispatch(openOrClosePostPopup(post))
  }
}


function mapStateToProps({ postReducer }) {
  const { posts } = postReducer;

  const postsArray = Object.keys(posts).reduce((postsResult, postId) => {
    postsResult.push(posts[postId]);
    return postsResult;
  }, [])

  return {
    posts: postsArray, 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
