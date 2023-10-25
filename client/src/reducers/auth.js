import { AUTH, LOGOUT } from '../constants/actionTypes';

export default (state = { authData: null }, action) => {
    if (action.type === AUTH) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }))

        return { ...state, authData: action?.data };
    }
    if (action.type === LOGOUT) {
        localStorage.removeItem('profile');

        return { ...state, authData: null };
    }
    return state;
}