import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css"
import * as API from '../utils/api';
import Categories from './Categories';
import Post from './Post';
import { postSearchResult, openOrClosePostPopup } from '../actions/post';
import PostPopup from './PostPopup';
import CommentPopup from './CommentPopup';

class App extends Component {

    constructor() {
        super();

        this.state = {
            posts: []
        }

        this.newPost = this.newPost.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.sortByVote = this.sortByVote.bind(this);
    }

    componentDidMount() {
        const { postSearchResultProp } = this.props;

        API.getAllPosts()
            .then(posts => {

                posts.sort((a, b) => (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0));

                postSearchResultProp(posts);

            })
    }

    newPost() {
        const { openOrClosePostPopupProp } = this.props;

        openOrClosePostPopupProp({});
    }

    sortByDate() {
        const { posts, postSearchResultProp } = this.props;

        posts.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0));

        postSearchResultProp(posts);
    }

    sortByVote() {
        const { posts, postSearchResultProp } = this.props;

        posts.sort((a, b) => (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0));

        postSearchResultProp(posts);
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
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={this.newPost}>New Post</button>
                        <button onClick={this.sortByVote}>Order by Vote</button>
                        <button onClick={this.sortByDate}>Order by Date</button>
                    </div>


                    <hr />

                    {posts.map(p => (
                        <Post key={p.id} post={p} />
                    ))}

                    <PostPopup />

                    <CommentPopup />

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
