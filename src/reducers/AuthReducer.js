import { EMAIL_CHANGE, PASSWORD_CHANGE, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, SHOW_STORYBOOK,
    NO_STORYBOOK }
 from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case EMAIL_CHANGE:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, password: '', loading: false };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        default:
            return state;
        }
}



