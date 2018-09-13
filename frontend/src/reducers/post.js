import {
    POST_SEARCH_RESULT, CATEGORY_CHANGE_CURRENT, COMMENT_SEARCH_RESULT
} from '../actions/post';
import { combineReducers } from 'redux';


const initialPostState = {
    posts: [],
    currentCategory: null
}

function postReducer(state = initialPostState, action) {

    const { posts } = action;

    switch (action.type) {

        case POST_SEARCH_RESULT :

            return {
                ...state,
                posts
            };
        case CATEGORY_CHANGE_CURRENT :

            const { currentCategory } = action;

            return {
                ...state,
                currentCategory,
                posts
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
    postReducer,
    commentReducer,
});