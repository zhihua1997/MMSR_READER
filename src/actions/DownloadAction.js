import { opendb } from "../db/db";
import { Actions } from "react-native-router-flux";
import { DOWNLOAD_SUCCESS } from "./types";
import { Alert } from "react-native";

const db = opendb();

export const downloadStorybook = ({ storybook }) => {
    return dispatch => {
        db.transaction( tx => {
            tx.executeSql(
                "INSERT INTO storybooklibrary(storybookID, languageCode, title, description, ageGroupCode, adminId, media) VALUES (?,?,?,?,?,?,?);",
                [
                    storybook.storybookID,
                    storybook.languageCode,
                    storybook.title,
                    storybook.description,
                    storybook.age,
                    storybook.author,
                    storybook.media,
                ]
            );
        });
        Alert.alert("Download Success");
        addDownloadSuccess(dispatch, storybook);
        Actions.introduce();
    };
};

const addDownloadSuccess = (dispatch, storybook) => {
    dispatch({
        type: DOWNLOAD_SUCCESS,
        payload: storybook
    });
};
