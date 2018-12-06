import { opendb } from "../db/db";
import { Actions } from "react-native-router-flux";
import { DOWNLOAD_SUCCESS } from "./types";
import { Alert } from "react-native";

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
                    } 
                    else {
                       console.log("this book you downloaded");
                   }
                }
            }
            );
        });
        Alert.alert("Download Success");
        Actions.introduce();
    };
};

export const createStorybook = ({ storybook }) => {
    return dispatch => {

      db.transaction(tx => {
        tx.executeSql(
            "SELECT storybookID, languageCode from storybook WHERE storybookID = ? AND languageCode = ?;",
            [   
                storybook.storybookID,
                storybook.languageCode,   
            ],
            (tx, results) => {
                const id = results.rows.item(0);

               if(typeof id == "undefined") {
                   InsertStory(storybook);
                   console.log("success");
               }
               else{
                   const lan = results.rows.item(0).languageCode;
                   const sId = results.rows.item(0).storybookID;
                   console.log(lan, storybook.languageCode2[0]);
                   if ( sId == storybook.storybookID && lan == storybook.languageCode2) {
                    console.log("storybook exist");
                   }
                   else {
                    //InsertStory(storybook);
                       console.log("storybook store");
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
          dispatch({ type: DOWNLOAD_SUCCESS, paylod: dl });
          }
        );
      });
    };
  };

