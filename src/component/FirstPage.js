import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import { Container, Content } from 'native-base';
import { strings } from '../localization';
import { Button } from '../tools';

class FirstPage extends Component {

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