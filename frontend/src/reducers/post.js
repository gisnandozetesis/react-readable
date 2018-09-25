import {
    POST_SEARCH_RESULT, CATEGORY_SEARCH_RESULT, CATEGORY_CHANGE_CURRENT, COMMENT_SEARCH_RESULT, POST_ADD_OR_UPDATE, POST_OPEN_CLOSE_POPUP, POST_DELETE
} from '../actions/post';
import { combineReducers } from 'redux';


const initialPostState = {
    posts: {},
    editingPost: null
}

function categoryReducer(state = {}, action) {

    const { categories } = action;

    switch (action.type) {

        case CATEGORY_SEARCH_RESULT :

            return {
                ...state,
                categories
            };
        case CATEGORY_CHANGE_CURRENT :

            const { currentCategory } = action;

            return {
                ...state,
                currentCategory
            };
        default :
            return state;
      }
}


function postReducer(state = initialPostState, action) {

    const { posts } = action;
    const postState = {};

    posts && posts.forEach(p => {
        postState[p.id] = p;
    });

    switch (action.type) {

        case POST_SEARCH_RESULT :

            return {
                ...state,
                posts: postState
            };

        case POST_OPEN_CLOSE_POPUP :

            const { editingPost } = action;

            return {
                ...state,
                editingPost
            };


        case POST_ADD_OR_UPDATE :

            const { post } = action;

            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: post
                }
            };

        case POST_DELETE :

            const { postId } = action;

            delete state.posts[postId];

            return {
                ...state
            };

        case CATEGORY_CHANGE_CURRENT :

            return {
                ...state,
                posts: postState
            };
        default :
            return state;
      }
}


function commentReducer(state = {}, action) {

    switch (action.type) {

        case COMMENT_SEARCH_RESULT :

            return {
                ...state,
                [action.postId]: action.comments
            };

        default :
            return state;
      }
}

export default combineReducers({
    categoryReducer,
    postReducer,
    commentReducer,
});