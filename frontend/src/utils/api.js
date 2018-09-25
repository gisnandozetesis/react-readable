const api = "http://localhost:3001";

const headers = {
    Accept: "application/json",
    Authorization: "Nada"
};
  

export const getAllCategories = () => {
    return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
}

export const getAllPosts = () => {
    return fetch(`${api}/posts`, { headers })
    .then(res => res.json());
}

export const getPosts = (category) => {
    return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());
}

export const savePost = (post) => {
    if (!post.id) {
        post.id = Date.now().toString();
        return addPost(post);
    } else {
        return updatePost(post);
    }
}

export const votePost = (postId, option) => {
    return fetch(`${api}/posts/${postId}`, { 
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'            
        },
        body: JSON.stringify({
            option
        })
    })
    .then(res => res.json());
}

export const deletePost = (postId) => {
    return fetch(`${api}/posts/${postId}`, { 
        method: 'DELETE',
        headers
    })
    .then(res => res.json());
}



const addPost = (post) => {
    return fetch(`${api}/posts`, { 
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'            
        },
        body: JSON.stringify({
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category
        })
    })
    .then(res => res.json());
}

const updatePost = (post) => {
    return fetch(`${api}/posts/${post.id}`, { 
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'            
        },
        body: JSON.stringify({
            title: post.title,
            body: post.body
        })
    })
    .then(res => res.json());
}




export const getComments = (postId) => {
    return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json());
}



