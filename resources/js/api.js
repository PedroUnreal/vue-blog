import axios from 'axios';

const BASE_URL = '/api';

axios.defaults.baseURL = BASE_URL;

const endpoints = {
    posts: '/posts',
    post: '/post',
    createPost: '/posts/create',
    updatePost: '/posts/update',
    deletePost: '/posts/delete',
    createComment: '/comments/create',
    updateComment: '/comments/update',
    deleteComment: '/comments/delete'
}

export const Api = {
    getPosts: () => {
        return axios.post(endpoints.posts)
            .then(unwrapResponse)
            .catch(unwrapError)
    },
    getPost: (id) => {
        return axios.post(endpoints.post, { id })
            .then(unwrapResponse)
            .catch(unwrapError)
    },
    createPost: (newPost) => {
        return axios.post(endpoints.createPost, newPost )
    },
    updatePost: (post) => {
        return axios.post(endpoints.updatePost, post )
    },
    
    deletePost: (id) => {
        return axios.post(endpoints.deletePost, { id })
    },
    createComment: (newComment) => {
        return axios.post(endpoints.createComment,  newComment)
    },
}

function unwrapResponse(response) {
    return response.data;
}

function unwrapError(error) {
    return error.message || 'Произошла ошибка'
}

// сделать папку: 1 - эндпоинты, 2 файл - методы АПИ (index.js), 3 файл - утилиты

