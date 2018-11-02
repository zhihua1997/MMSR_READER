import { GET_STORYCONTENT, NO_STORYCONTENT } from "./types";


export const getStoryContent = ({ storybookId, languageCode }) => {
    return dispatch => {
        fetch("http://tarucmmsr.pe.hu/get_translate_page.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                storybookId: storybookId,
                languageCode: languageCode
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson === null){
                Alert.aler("No content Inside");
                noStoryContent(dispatch);
            } else {
                StoryContentGet(dispatch, responseJson);
                saveUser("storyContent_token", JSON.stringify(responseJson));
            }
            
        })
        .catch((error) => {
            console.error(error);
        });
    }
}


const noStoryContent = dispatch => {
    dispatch({
        type: NO_STORYCONTENT
    });
};

const StoryContentGet = (dispatch, storybook) => {
    dispatch({
        type: GET_STORYCONTENT,
        payload: storybook
    });
};