import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import { Container, Content } from 'native-base';
import { strings } from '../localization';
import { Button } from './tools/button';

class FirstPage extends Component {

    overLangEN = () => {
        strings.setLanguage('en');
        this.setState({});
        Actions.loginScreen();
    }
    overLangBM = () => {
        strings.setLanguage('it');
        this.setState({});
        Actions.loginScreen();
    }
    overLangCN = () => {
        strings.setLanguage('en');
        this.setState({});
        Actions.loginScreen();
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <Content>
                    <Button onPress={this.overLangEN.bind(this)}>English</Button>
                    <Button onPress={this.overLangBM.bind(this)}>简单中文</Button>
                    <Button onPress={this.overLangCN.bind(this)}>Bahasa</Button>
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
        marginTop: 50
    },
};

export default FirstPage;