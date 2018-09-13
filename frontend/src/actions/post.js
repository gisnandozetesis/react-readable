export const POST_SEARCH_RESULT = 'POST_SEARCH_RESULT';
export const CATEGORY_CHANGE_CURRENT = 'CATEGORY_CHANGE_CURRENT';
export const COMMENT_SEARCH_RESULT = 'COMMENT_SEARCH_RESULT';


export function postSearchResult(posts) {
    return {
        type: POST_SEARCH_RESULT,
        posts
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


