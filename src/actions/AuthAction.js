import { Alert, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import { EMAIL_CHANGE, PASSWORD_CHANGE, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from './types';

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
          Alert.alert("Welcome " + responseJson.userName );
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
