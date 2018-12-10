import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';
import { connect } from 'react-redux';
import { getStory } from '../actions';
import { downloadStorybook, createStorybook } from '../actions/DownloadAction';

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

            storybookID2: [],
            pageNo: [],
            media2: [],
            content: [],
            languageCode2: [],
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
    
    onDownload(){
        this.savebook();

        this.onSave();
    }
    
    onSave() {
        const { 
            storybookID,
            author,
            description,
            languageCode,
            age,
            title,
            media,
            storybookID2,
            pageNo,
            content,
            media2,
            languageCode2,
        } = this.state;

        const storybook = {
            storybookID,
            author,
            description,
            languageCode,
            age,
            title,
            media,
            storybookID2,
            pageNo,
            content,
            media2,
            languageCode2,
        };
        
        this.props.downloadStorybook({
            storybook
        });

        this.props.createStorybook({
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

    savebook() {
        var storybookID2 = [];
        var pageNo = [];
        var media2 = [];
        var content = [];
        var languageCode2 = [];
        const len = this.props.storyBook.length;
        for (let i = 0; i < len; i++){
                storybookID2 = this.props.storyBook[i].storybookID;
                pageNo = this.props.storyBook[i].pageNo;
                media2 = this.props.storyBook[i].media;
                content = this.props.storyBook[i].content;
                languageCode2 = this.props.storyBook[i].languageCode;
                this.state.storybookID2.push(storybookID2);
              this.state.pageNo.push(pageNo);
              this.state.media2.push(media2);
              this.state.content.push(content);
              this.state.languageCode2.push(languageCode2);
        }
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
               
                </View>
                <Button onPress={()=> this.getStoryFunction(this.state.storybookID[0], this.state.languageCode[0])}>
                    Read
                </Button>
                <Button onPress={this.onDownload.bind(this)}>
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
  
export default connect(mapStateToProps, { getStory, downloadStorybook, createStorybook })(Introduce);