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
<<<<<<< HEAD
                    <Button onPress={this.overLangEN.bind(this)}>English</Button>
                    <Button onPress={this.overLangCN.bind(this)}>简单中文</Button>
                    <Button onPress={this.overLangBM.bind(this)}>Bahasa</Button>
                    <Button onPress={this.overLangTM.bind(this)}>தமிழ்</Button>
=======
                    <Button onPress={this.overLangEN.bind(this)} style={styles.buttonStyle}>English</Button>
                    <Button onPress={this.overLangBM.bind(this)}>简单中文</Button>
                    <Button onPress={this.overLangCN.bind(this)}>Bahasa</Button>
>>>>>>> Three dot
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
<<<<<<< HEAD
        width: 350,
        marginTop: 80,
    },
   
=======
        marginTop: 50,
        width: 200,
    },
    buttonStyle: {
        marginBottom: 20,
    }

>>>>>>> Three dot
};

export default FirstPage;