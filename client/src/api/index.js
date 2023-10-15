import axios from 'axios';
import { apiUrl } from '../constants/apiUrl';
const API = axios.create({ baseURL: apiUrl });

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likes`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);