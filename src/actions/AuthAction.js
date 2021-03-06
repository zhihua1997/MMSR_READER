import { Alert, Keyboard, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { EMAIL_CHANGE, PASSWORD_CHANGE, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, NO_STORYBOOK, SHOW_STORYBOOK,
  GET_STORYCONTENT, NO_STORYCONTENT, NO_STORY, GET_STORY, FEEDBACK_FAIL, FEEDBACK_SUCCESS, DOWNLOAD_STORY, SET_FORGETPASSWORD_TO_FALSE, SET_FORGETPASSWORD_TO_TRUE } from './types';

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

export const setForgetPasswordLoadToTrue = () => {
  return {
    type: SET_FORGETPASSWORD_TO_TRUE
  };
};

export const setForgetPasswordLoadToFalse = () => {
  return {
    type: SET_FORGETPASSWORD_TO_FALSE
  };
};


export const loginUser = ({ email, password }) => {
  return dispatch => {
    fetch("http://mmsrtaruc.000webhostapp.com/ReaderApp/readerLogin.php", {
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
        //console.log(responseJson);
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
      fetch("http://mmsrtaruc.000webhostapp.com/get_storybook_translate_list.php")
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
      fetch(
        "http://mmsrtaruc.000webhostapp.com/ReaderApp/get_storybook_content.php", 
          {
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

export const getStory = ({ storybookID, languageCode }) => {
  return dispatch => {
    console.log(storybookID, languageCode);
      fetch(
        "http://mmsrtaruc.000webhostapp.com/ReaderApp/get_content.php", 
          {
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
              Alert.aler( "No content Inside");
              noStory(dispatch);
          } else {
            
              StoryGet(dispatch, responseJson);
              saveUser("story_token", JSON.stringify(responseJson));
              Actions.storybook();
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  }
}

export const translateStory = ({ storybookID, languageCode }) => {
  return dispatch => {
    console.log(storybookID, languageCode);
      fetch(
        "http://mmsrtaruc.000webhostapp.com/ReaderApp/get_content.php", 
          {
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
              noStory(dispatch);
          } else {
            
              StoryGet(dispatch, responseJson);
              saveUser("story_token", JSON.stringify(responseJson));
              Actions.storybook({ key: "reload" });
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  }
}

export const DownloadStoryBook = ({ storybookID, languageCode }) => {
  return dispatch => {
    console.log(storybookID, languageCode);
      fetch(
        "http://mmsrtaruc.000webhostapp.com/ReaderApp/get_content.php", 
          {
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
              noStory(dispatch);
          } else {
              downloadStory(dispatch, responseJson);
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  }
}


const noStory = dispatch => {
  dispatch({
      type: NO_STORY
  });
};

const StoryGet = (dispatch, storybook) => {
  dispatch({
      type: GET_STORY,
      payload: storybook
  });
};

const downloadStory = (dispatch, storybook) => {
  dispatch({
      type: DOWNLOAD_STORY,
      payload: storybook
  });
};

export const starFeedback = ({ userId, storybookID, rateValue }) => {
  return dispatch => {
    console.log(userId, storybookID, rateValue);
      fetch(
        "http://mmsrtaruc.000webhostapp.com/ReaderApp/feedback.php", 
          {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              userId: userId,
              storybookID: storybookID,
              rateValue: rateValue
          })
        }
      )
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
          if (responseJson === "Try Again") {
              Alert.aler("Feedback Fail");
              failFeedback(dispatch);
          } else {
              //successFeedback(dispatch, responseJson);
              Alert.alert("Feedback Success");
              Actions.storybook();
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  }
}

export const getStarRating = () => {
  console.log("star rating")
  return dispatch => {
      fetch("http://mmsrtaruc.000webhostapp.com/ReaderApp/starRating.php")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
          if (responseJson === null){
              Alert.aler("No data Inside");
              failFeedback(dispatch);
          } else {
               successFeedback(dispatch, responseJson);
               //saveUser("storybook_token", JSON.stringify(responseJson));
               Actions.downloaded()
          }
          
      })
      .catch((error) => {
          console.error(error);
      });
  };
};


const failFeedback = dispatch => {
  dispatch({
      type: FEEDBACK_FAIL
  });
};

const successFeedback = (dispatch, rate) => {
  dispatch({
      type: FEEDBACK_SUCCESS,
      payload: rate
  });
};

export const forgetPassword = ({ email }) => {
  return dispatch => {
    // debugger;
    console.log(email);
    fetch(
      "https://mmsrtaruc.000webhostapp.com/Reader_forgetPassword.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      }
    )
      .then(response => {
        //debugger;
        console.log(response);
        response.json();
      })
      .then(responseJson => {
        //debugger;
        //setForgetPasswordLoadToFalse();
        console.log(responseJson);

        if (responseJson === "Unable to retrieve password") {
          Alert.alert("The Email enter is not valid");
        } else if (
          responseJson === "Please check your email for your password"
        ) {
          Alert.alert("Email Sent, Please Check");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};