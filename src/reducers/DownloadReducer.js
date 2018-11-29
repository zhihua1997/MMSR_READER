import {
    DOWNLOAD_SUCCESS,
} from "../actions/types"

const INITIAL_STATE = {
    storybook: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOWNLOAD_SUCCESS:
            return { ...state, storybook: action.payload };
        default:
            return state;
    }
}; 