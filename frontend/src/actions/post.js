export const POST_SEARCH_RESULT = 'POST_SEARCH_RESULT';
export const POST_OPEN_CLOSE_POPUP = 'POST_OPEN_CLOSE_POPUP';
export const POST_ADD_OR_UPDATE = 'POST_ADD_OR_UPDATE';
export const POST_DELETE = 'POST_DELETE';

export const CATEGORY_SEARCH_RESULT = 'CATEGORY_SEARCH_RESULT';
export const CATEGORY_CHANGE_CURRENT = 'CATEGORY_CHANGE_CURRENT';

export const COMMENT_SEARCH_RESULT = 'COMMENT_SEARCH_RESULT';
export const COMMENT_OPEN_CLOSE_POPUP = 'COMMENT_OPEN_CLOSE_POPUP';
export const COMMENT_ADD_OR_UPDATE = 'COMMENT_ADD_OR_UPDATE';
export const COMMENT_DELETE = 'COMMENT_DELETE';


export function postSearchResult(posts) {
    return {
        type: POST_SEARCH_RESULT,
        posts
    }
}

export function openOrClosePostPopup(editingPost = null) {
    return {
        type: POST_OPEN_CLOSE_POPUP,
        editingPost
    }
}

export function addOrUpdatePost(post) {
    return {
        type: POST_ADD_OR_UPDATE,
        post
    }
}

export function deletePost(postId) {
    return {
        type: POST_DELETE,
        postId
    }
}



export function commentSearchResult(postId, comments) {
    return {
        type: COMMENT_SEARCH_RESULT,
        postId,
        comments
    }
}

export function openOrCloseCommentPopup(editingComment = null) {
    return {
        type: COMMENT_OPEN_CLOSE_POPUP,
        editingComment
    }
}

export function addOrUpdateComment(comment) {
    return {
        type: COMMENT_ADD_OR_UPDATE,
        comment
    }
}

export function deleteComment(postId, commentId) {
    return {
        type: COMMENT_DELETE,
        postId,
        commentId
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
