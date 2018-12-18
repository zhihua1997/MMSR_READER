import { FEEDBACK_SUCCESS, FEEDBACK_FAIL } from '../actions/types';

const FEEDBACK_STATE = {
    userId: '',
    storybookID: '',
    rateValue: '',
    rate: null,
    isLoading: false,
};

export default (state = FEEDBACK_STATE, action) => {
    switch (action.type){
        case FEEDBACK_FAIL:
            return { ...state, isLoading: false };
        case FEEDBACK_SUCCESS:
            return { ...state, Rate: action.payload };
        default:
            return state;

    }
}
