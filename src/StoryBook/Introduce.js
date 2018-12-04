import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';
import { connect } from 'react-redux';
import { getStory } from '../actions';
import { downloadStorybook } from '../actions/DownloadAction';

class Introduce extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            storybookID: [],
            author: [],
            description: [],
            languageCode: [],
            age: [],
            title: [],
            media: [],
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("storyContent_token").then(token => {
            const Alldata = JSON.parse(token);
            console.log(Alldata);
            const len = Alldata.length;
            var authorName = [];
            var description = [];
            var languageCode = [];
            var storybookID = [];
            var age = [];
            var title = [];
            var media = [];
            for (let i=0; i < len; i++) {
              languageCode = Alldata[i].languageCode;
              authorName = Alldata[i].adminId;
              description = Alldata[i].description;
              age = Alldata[i].ageGroupCode;
              storybookID = Alldata[i].storybookID;
              title = Alldata[i].title;
              media = Alldata[i].media;
              this.state.storybookID.push(storybookID);
              this.state.author.push(authorName);
              this.state.description.push(description);
              this.state.languageCode.push(languageCode);
              this.state.age.push(age);
              this.state.title.push(title);
              this.state.media.push(media);
            }
            this.setState({
                data: Alldata,
                loading: token !== null,
            });
            //console.log(this.state.data);
        });

    }
    
    onSave() {
        const { 
            storybookID,
            author,
            description,
            languageCode,
            age,
            title,
            media
        } = this.state;

        const storybook = {
            storybookID,
            author,
            description,
            languageCode,
            age,
            title,
            media,
        };
        
        this.props.downloadStorybook({
            storybook
        });
    }
    

    getStoryFunction(storybookID, languageCode) {
        //const { storybookID } = this.props;
        //console.log(this.props.storybookID);
        //storybookID, languageCode = this.props;

        this.props.getStory({ storybookID, languageCode });

        console.log(storybookID, languageCode);
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.viewImage}>
                    <Thumbnail large source={require('../Images/profile1.jpg')} />
                </View>
                <View>
                    <Text>{this.state.storybookID}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.description}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.languageCode}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.age}</Text>
                <Text>{this.props.storyBook[1].content}</Text>
                </View>
                <Button onPress={()=> this.getStoryFunction(this.state.storybookID[0], this.state.languageCode[0])}>
                    Read
                </Button>
                <Button onPress={this.onSave.bind(this)}>
                    Download
                </Button>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    viewImage: {
       // backgroundColor: '#F8F8F8',
    },
    viewBox: {
        borderColor: '#000',
        borderStyle: 'solid',
        backgroundColor: '#F8F8F8',
        width: 80, 
        height: 60,
        alignItems: 'center',
        marginTop: 15,
    }
}
const mapStateToProps = state => {
    const { storyBook } = state.story;
  
    return { storyBook };
  };

export default connect(mapStateToProps, { getStory, downloadStorybook })(Introduce);