import { Alert, Keyboard, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { EMAIL_CHANGE, PASSWORD_CHANGE, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, NO_STORYBOOK, SHOW_STORYBOOK,
  GET_STORYCONTENT, NO_STORYCONTENT } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGE,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGE,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    fetch("http://tarucmmsr.pe.hu/readerLogin.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === "Invalid Username or Password Please Try Again") {
          Alert.alert("Invalid email or Password");
          loginUserFail(dispatch);
        } else {
          //console.log(responseJson);
          loginUserSuccess(dispatch, responseJson);
          saveUser("id_token", JSON.stringify(responseJson));
          Alert.alert("Welcome " + responseJson.userName);
          Actions.downloaded();
        }
      })
      .catch(error => {
        console.error(error);
      });

    Keyboard.dismiss();
  };
};


const loginUserFail = dispatch => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const logoutUser = () => {
  return async dispatch => {
    logout(dispatch);
    Actions.firstPage();
  };
};

const logout = async dispatch => {
  try {
    await AsyncStorage.removeItem("id_token");
  } catch (error) {
    console.error("AsyncStorage error: " + error.message);
  }
};

const saveUser = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.error("AsyncStorage error: " + error.message);
  }
};

//StoryBook Action

export const getStoryBook = () => {
  return dispatch => {
      fetch("http://tarucmmsr.pe.hu/get_storybook_translate_list.php")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
          if (responseJson === null){
              Alert.aler("No data Inside");
              noStorybookShow(dispatch);
          } else {
               StorybookShow(dispatch, responseJson);
               saveUser("storybook_token", JSON.stringify(responseJson));
               Actions.downloaded()
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  };
};


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

//Story Content Action

export const getStoryContent = ({ storybookID, languageCode }) => {
  return dispatch => {
    console.log(storybookID, languageCode);
      fetch("http://tarucmmsr.pe.hu/get_storybook_content.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              storybookID: storybookID,
              languageCode: languageCode
          })
      }
    )
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
          if (responseJson === null) {
              Alert.aler("No content Inside");
              noStoryContent(dispatch);
          } else {
              StoryContentGet(dispatch, responseJson);
              saveUser("storyContent_token", JSON.stringify(responseJson));
              Actions.introduce();
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