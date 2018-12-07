import {
    DOWNLOAD_SUCCESS, DOWNLOAD_CONTENT
} from "../actions/types"

const INITIAL_STATE = {
    storybookID: '',
    languageCode: '',
    isLoading: false,
    storybook: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOWNLOAD_SUCCESS:
            return { ...state, isLoading: false, downLoad: action.payload };
        case DOWNLOAD_CONTENT:
            return { ...state, isLoading: false, downLoad: action.payload };
        default:
            return state;
    }
}
