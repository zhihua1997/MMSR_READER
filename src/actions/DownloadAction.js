import { opendb } from "../db/db";
import { Actions } from "react-native-router-flux";
import { DOWNLOAD_SUCCESS, DOWNLOAD_CONTENT } from "./types";
import { Alert, AsyncStorage } from "react-native";

const db = opendb();

const InsertStorybook = (storybook) => {
        db.transaction( tx => {
            tx.executeSql(
                    "INSERT INTO storybooklibrary (storybookID, languageCode, title, description, ageGroupCode, adminId, media) VALUES (?,?,?,?,?,?,?);",
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
};

const InsertStory = (storybook) => {
    const len = storybook.storybookID2.length;
    for (let i = 0; i < len; i++){
    db.transaction( tx => {
        tx.executeSql(
                "INSERT INTO storybook (storybookID, pageNo, content, languageCode, media) VALUES (?,?,?,?,?);",
                [
                    storybook.storybookID2[i],
                    storybook.pageNo[i],
                    storybook.content[i],
                    storybook.languageCode2[i],
                    storybook.media2[i],
                ]
        );
     });
    }
};

const UpdateStorybook = (title, lan, storybook) => {
    let language = lan + " " + storybook.languageCode;
    let title1 = title + "/" + storybook.title;
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE storybooklibrary SET languageCode = ?, title = ?  WHERE storybookID = ?;",
          [
           language,
           title1,
           storybook.storybookID,
          ]
        );
      });
  };

export const downloadStorybook = ({ storybook }) => {
    return dispatch => {
        db.transaction( tx => {
            tx.executeSql(
                "SELECT storybookID, languageCode, title from storybooklibrary WHERE storybookID = ?;",
                [   
                    storybook.storybookID,   
                ],
                (tx, results) => {
                    const id = results.rows.item(0);
                    
                   if(typeof id == "undefined") {
                       InsertStorybook(storybook);
                       Alert.alert("Download Success");
                       console.log("dail");
                   }
                   else {
                    const lan = results.rows.item(0).languageCode;
                    const title = results.rows.item(0).title;
                    var lan1 = lan.substring(0, 2);
                    var lan2 = lan.substring(3, 5);
                    var lan3 = lan.substring(6, 8);
                    console.log(lan1,lan2,lan3);
                    if ( lan1 != storybook.languageCode && lan2 != storybook.languageCode && lan3 != storybook.languageCode) {
                        console.log("fail");
                         UpdateStorybook(title, lan, storybook);
                         Alert.alert("Download Success");
                    } 
                    else {
                        Alert.alert("This Book had Downloaded");
                       console.log("this book you downloaded");
                   }
                }
            }
            );
        });
        
        Actions.introduce();
    };
};

export const createStorybook = ({ storybook }) => {
    return dispatch => {

      db.transaction(tx => {
        tx.executeSql(
            "SELECT storybookID, languageCode from storybook WHERE storybookID = ?;",
            [   
                storybook.storybookID, 
            ],
            (tx, results) => {
                const id = results.rows.item(0);
                let count = 0;

               if(typeof id == "undefined") {
                   InsertStory(storybook);
                   Alert.alert("Download Success");
                   console.log("success");
               }
               else {
                   var len = results.rows.length;
                   for(let i = 0; i < len; i++){
                   const lan = results.rows.item(i).languageCode;
                   
                   console.log(lan, storybook.languageCode2[0]);
                   if (lan == storybook.languageCode2[0]) {
                    //Alert.alert("Storybook Exist");
                    count++;
                    console.log("storybook exist");
                   }
                   else {
                        //InsertStory(storybook);
                        console.log(results.rows.item(i));
                       console.log("storybook store");
                      // Alert.alert("Download Success");
                   }
                }
                if (count < 1){
                    InsertStory(storybook);
                }
                else {
                    console.log("storybook exist");
                }    
            }
        } 
        );
      });
    };
}; 

export const downloadedList = () => {
    return dispatch => {
    let dl = [];
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM storybooklibrary;",[],
          (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            dl[i] = row;
            console.log(dl[i]);
          }
          //console.log(dl);
          downloadSuccess(dispatch, dl);
          saveUser("download_token", JSON.stringify(dl));
          }
        );
      });
      Actions.localstorycontent();
    };
  };

  const downloadSuccess = (dispatch, storybook) => {
    dispatch({
      type: DOWNLOAD_SUCCESS,
      payload: storybook
    });
  };

  const saveUser = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  };

 

  const dlDefaultLanguage = (dispatch, storybook) => {
        let dl = [];
        console.log(storybook.storybookID, storybook.languageCode, "Default Language")
          db.transaction(tx => {
            //console.log(storybook.storybookID, storybook.languageCode, "Default Language")
            tx.executeSql(
              "SELECT * FROM storybook WHERE storybookID = ? AND languageCode = ?;",
              [
                  storybook.storybookID,
                  storybook.languageCode,
                ],
              (tx, results) => {
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                dl[i] = row;
                console.log(dl[i]);
              }
              console.log(dl);
              downloadContent(dispatch, dl);
              saveUser("downloadContent_token", JSON.stringify(dl));
              }
            );
          });
        Actions.localstorybook();
        
  };

  const dlNotDefaultLanguage = (dispatch, storybook) => {
        let dl = [];
        const lan = storybook.languageCode2;
        let lan1 = lan.substring(0, 2);
        //console.log(storybook.storybookID, storybook.languageCode2)
          db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM storybook WHERE storybookID = ? AND languageCode = ? ORDER BY pageNo;",
              [
                  storybook.storybookID,
                  lan1,
                ],
              (tx, results) => {
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                dl[i] = row;
                console.log(dl[i]);
              }
              console.log(dl);
              downloadContent(dispatch, dl);
              saveUser("downloadContent_token", JSON.stringify(dl));
              }
            );
          });
          Actions.localstorybook({ key:"reload" });
  }

  const downloadContent = (dispatch, storybook) => {
    dispatch({
      type: DOWNLOAD_CONTENT,
      payload: storybook
    });
  };

  export const downloadedContent = ({ storybook }) => {
    return dispatch => {
    let dl = [];
    const lan = storybook.languageCode;
    let lan1 = lan.substring(0, 2);
    console.log(storybook.storybookID, lan1)
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM storybook WHERE storybookID = ? AND languageCode = ?;",
          [
              storybook.storybookID,
              lan1,
            ],
          (tx, results) => {
              
          if (typeof results.rows.item(0) == "undefined") {
              //console.log("hi");
              console.log("hey");
              dlNotDefaultLanguage(dispatch, storybook);
          }
          else {
            dlDefaultLanguage(dispatch, storybook);
          }
          //saveUser("download_token", JSON.stringify(dl));
          }
        );
      });
      //Actions.localstorycontent({ key:"reload" });
    };
  };

  const translateSuccess = (dispatch, storybook) => {
    let dl = [];
    //console.log(storybook.storybookID, storybook.languageCode2)
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM storybook WHERE storybookID = ? AND languageCode = ? ORDER BY pageNo;",
          [
              storybook.storybookID,
              storybook.languageCode,
            ],
          (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            dl[i] = row;
            console.log(dl[i]);
          }
          //console.log(dl);
          downloadContent(dispatch, dl);
          saveUser("downloadContent_token", JSON.stringify(dl));
          }
        );
      });
      Actions.localstorybook();
}

  export const translateContent = ({ storybook }) => {
    return dispatch => {
    let dl = [];
    const lan = storybook.languageCode;
    let lan1 = lan.substring(0, 2);
    console.log(storybook.storybookID, lan1)
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM storybook WHERE storybookID = ? AND languageCode = ?;",
          [
              storybook.storybookID,
              lan1,
            ],
          (tx, results) => {
              
          if (typeof results.rows.item(0) == "undefined") {
            //Alert.alert("Not such Language");
              console.log("Not such Language");
              //Alert.alert("Not such Language");
          }
          else {
            translateSuccess(dispatch, storybook);
          }
          //saveUser("download_token", JSON.stringify(dl));
          }
        );
      });
        
    };
  };

  export const deleteStoryBook = ({ storybookID }) => {
    return dispatch => {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM storybooklibrary WHERE storybookID = ?;", [
          storybookID
        ]);
      });
      db.transaction(tx => {
        tx.executeSql("DELETE FROM storybook WHERE storybookID = ?;", [
          storybookID
        ]);
      });  
      downloadedList();
      Actions.downloaded();
    };
  }



