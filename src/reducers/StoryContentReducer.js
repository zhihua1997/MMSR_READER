import { GET_STORYCONTENT, NO_STORYCONTENT } from '../actions/types';

const STORY_CONTENT_STATE = {
    storybookID: '',
    languageCode: '',
    isLoading: false,
    //storyContent: [],
};

export default (state = STORY_CONTENT_STATE, action) => {
    switch (action.type){
        case GET_STORYCONTENT:
            return { ...state, isLoading: false, storyContent: action.payload };
        case NO_STORYCONTENT:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}