import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import StoryBookReducer from "./StoryBookReducer";
import StoryReducer from "./StoryReducer";
import StoryContentReducer from "./StoryContentReducer";
import DownloadReducer from "./DownloadReducer";
import FeedbackReducer from "./FeebackReducer";

export default combineReducers({
    auth: AuthReducer,
    storybook: StoryBookReducer,
    story: StoryReducer,
    storyContent: StoryContentReducer,
    download: DownloadReducer,
    feedback: FeedbackReducer,
})