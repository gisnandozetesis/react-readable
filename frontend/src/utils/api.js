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


export const getComments = (postId) => {
    return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json());
}

