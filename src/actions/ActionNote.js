import { NO_STORYBOOK, SHOW_STORYBOOK } from "./types";


export const getStoryBook = () => {
    return dispatch => {
        fetch("http://tarucmmsr.pe.hu/get_storybook_translate_list.php")
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson === null){
                Alert.aler("No data Inside");
                noStorybookShow(dispatch);
            } else {
                 StorybookShow(dispatch, responseJson);
            }
            
        })
        .catch((error) => {
            console.error(error);
        });
    }
}


const noStorybookShow = dispatch => {
    dispatch({
        type: NO_STORYBOOK
    });
};

const StorybookShow = (dispatch, storybook) => {
    dispatch({
        type: SHOW_STORYBOOK,
        payload: storybook
    });
};