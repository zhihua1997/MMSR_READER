import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import { Container, Content, Text } from 'native-base';
import { strings } from '../localization';
import { Button } from '../tools';
import { opendb } from '../db/db';

const db = new opendb();
class FirstPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lan: "",
            isLoad: false
          };

        db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM language WHERE languageCode=?",
              ["EN"],
              (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                  var row = results.rows.item(0);
                  this.setState({ lan: row.languageDesc });
                }
              }
            );
          });
    }

    overLangEN = () => {
        strings.setLanguage('en');
        this.setState({});
        Actions.loginScreen();
        
    }
    overLangBM = () => {
        strings.setLanguage('bm');
        this.setState({});
        Actions.loginScreen();
    }
    overLangCN = () => {
        strings.setLanguage('cn');
        this.setState({});
        Actions.loginScreen();
    }
    overLangTM = () => {
        strings.setLanguage('tm');
        this.setState({});
        Actions.loginScreen();
    }
    

    render() {
        return (
            <Container style={styles.containerStyle}>
                <Content style={styles.contentStyle}>
                    <Button onPress={this.overLangEN.bind(this)}>English</Button>
                    <Button onPress={this.overLangCN.bind(this)}>简单中文</Button>
                    <Button onPress={this.overLangBM.bind(this)}>Bahasa</Button>
                    <Button onPress={this.overLangTM.bind(this)}>தமிழ்</Button>
                    <Text>{this.state.lan}</Text>
                </Content>
            </Container>
        );
    }

}

const styles = {
    containerStyle: {
        alignItems: "center",
        justifyContent: "center",
        height: 1500,
    },
    contentStyle: {
        marginTop: 50,
        width: 200,
    },
    buttonStyle: {
        marginBottom: 20,
    }

};

export default FirstPage;