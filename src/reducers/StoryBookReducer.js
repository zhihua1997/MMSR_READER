import { SHOW_STORYBOOK, NO_STORYBOOK } from '../actions/types';

const STORY_BOOK_STATE = {
    storybookID: '',
    languageCode: '',
    isLoading: false,
    storyBook: [],
};

export default (state = STORY_BOOK_STATE, action) => {
    switch (action.type){
        case NO_STORYBOOK:
            return { ...state, isLoading: false };
        case SHOW_STORYBOOK:
            return { ...state, storyBook: action.payload };
        default:
            return state;

    }
}