import {
    USER_LOADING,
    USER_LOADED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    AUTH_ERROR,
    LOADING_CARDS,
    CARDS_SUCCESS,
    CARDS_FAILURE,
    UPDATE_SUCCESS,
    PROFILE_START,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
} from '../actions/types';

// the redux state to hold our current user as well as if they are authenticated or not
const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    templates: [],
    cards: [],
    authenticated: false,
    loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_CARDS:
        case USER_LOADING:
        case REGISTER_START:
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case USER_LOADED:
        case UPDATE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                authenticated: true,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading: false,
                authenticated: true,
            };
        case AUTH_ERROR:
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: false,
                loading: false,
            };
        case CARDS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case CARDS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case PROFILE_START:
            return {
                ...state,
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
