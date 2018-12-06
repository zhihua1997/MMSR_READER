import {
    DOWNLOAD_SUCCESS,
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
        default:
            return state;
    }
}
