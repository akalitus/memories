import axios from 'axios';
import { apiUrl } from '../constants/apiUrl';

export const fetchPosts = () => axios.get(apiUrl);
export const createPost = (newPost) => axios.post(apiUrl, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${apiUrl}/${id}`, updatedPost);
export const likePost = (id) => axios.patch(`${apiUrl}/${id}/likes`);
export const deletePost = (id) => axios.delete(`${apiUrl}/${id}`);