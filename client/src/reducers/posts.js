import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
    if (action.type === FETCH_ALL) {
        return action.payload;
    }
    if (action.type === CREATE) {
        return [...posts, action.payload];
    }
    if (action.type === UPDATE) {
        return posts.map((post) => post._id === action.payload._id
            ? action.payload
            : post
        );
    }
    if (action.type === DELETE) {
        return posts.filter((post) => post._id !== action.payload);
    }
    return posts;
}