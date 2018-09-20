export const POST_SEARCH_RESULT = 'POST_SEARCH_RESULT';
export const POST_ADD_OR_UPDATE = 'POST_ADD_OR_UPDATE';
export const CATEGORY_SEARCH_RESULT = 'CATEGORY_SEARCH_RESULT';
export const CATEGORY_CHANGE_CURRENT = 'CATEGORY_CHANGE_CURRENT';
export const COMMENT_SEARCH_RESULT = 'COMMENT_SEARCH_RESULT';


export function postSearchResult(posts) {
    return {
        type: POST_SEARCH_RESULT,
        posts
    }
}

export function addOrUpdatePost(post) {
    return {
        type: POST_ADD_OR_UPDATE,
        post
    }
}

export function categorySearchResult(categories) {
    return {
        type: CATEGORY_SEARCH_RESULT,
        categories
    }
}


export function changeCurrentCategory(newCategory, posts) {
    return {
        type: CATEGORY_CHANGE_CURRENT,
        currentCategory: newCategory,
        posts
    }
}


export function commentSearchResult(postId, comments) {
    return {
        type: COMMENT_SEARCH_RESULT,
        postId,
        comments
    }
}


