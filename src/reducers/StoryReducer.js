import { GET_STORY, NO_STORY } from '../actions/types';

const STORY_BOOK_STATE = {
    storybookID: '',
    languageCode: '',
    isLoading: false,
    story: [],
};

export default (state = STORY_BOOK_STATE, action) => {
    switch (action.type){
        case NO_STORY:
            return { ...state, isLoading: false };
        case GET_STORY:
            return { ...state, isLoading: false, storyBook: action.payload };
        default:
            return state;

    }
}
