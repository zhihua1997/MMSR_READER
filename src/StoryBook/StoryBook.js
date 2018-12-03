import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Animated, Alert, Modal, Picker } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { translateStory } from '../actions'
//import Speech from 'react-native-speech';
//import Tts from 'react-native-tts';
//import Tts from "react-native-tts";

const items = ["Select Language","EN", "BM", "ZH"];

class StoryBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            storybookID: [],
            data: [],
            pageNo: [],
            media: [],
            content: [],
            count: 0,
            starCount: 0,
            showMe: false,
            speechRate: 0.3,
            speechPitch: 1,
            refresh: false,
        }
    }

    

    componentDidMount() {
        this.getS();
    }


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    data(){
        AsyncStorage.getItem("story_token").then(token => {
            const Alldata = JSON.parse(token);
            console.log(Alldata);
            const len = Alldata.length;
            var storybookID = [];
            var pageNo = [];
            var media = [];
            var content = [];

            for (let i = 0; i < len; i++) {
                storybookID = Alldata[i].storybookID;
                pageNo = Alldata[i].pageNo;
                media = Alldata[i].media;
                content = Alldata[i].content;

                this.state.storybookID.push(storybookID);
                this.state.pageNo.push(pageNo);
                this.state.media.push(media);
                this.state.content.push(content);

            }
            this.setState({
                data: Alldata,
                loading: token !== null,

            });
            console.log(this.state.data);
        });
    }

    getS = async () => {
        try {
            await this.data();
          } catch (error) {
            console.error("AsyncStorage error: " + error.message);
          }
    }

    closeFeedback = () => {
        this.setState({
            showMe: false
        })
    }

    IncrementCount = () => {
        const len = this.state.pageNo.length - 1;
        if (this.state.count < len) {
            this.setState({ count: this.state.count + 1 });
        }
        else {
            Alert.alert("This is the last Page");
            this.setState({
                showMe: true
            })
        }
    }

    DecreaseCount = () => {
        if (this.state.count > 0) {
            this.setState({ count: this.state.count - 1 });
        }
        else {
            Alert.alert("This is the first page");
        }
    }

    getStoryFunction(storybookID, languageCode) {
        //const { storybookID } = this.props;
        //console.log(this.props.storybookID);
        //storybookID, languageCode = this.props;
        this.reload();
        this.props.translateStory({ storybookID, languageCode });
        
        console.log(storybookID, languageCode);
    }

    reload = () =>
    {
        this.setState({
            storybookID: [],
            pageNo: [],
            media: [],
            content: [],
        });

        //console.log(this.state.content);
        this.componentDidMount();
    }

    /*readText(item){
        Tts.stop();
        Tts.speak(item, { iosVoiceId: 'com.apple.ttsbundle.Moira-compact' });
        Tts.speak(item, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.5, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
         Tts.setDefaultRate(this.state.speechRate);
         Tts.setDefaultPitch(this.state.speechPitch);
      };*/

    
    render() {
        return (
            <View style={styles.container}>
                <Picker
                    //onPress={this.pickerActivity()}
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.getStoryFunction(this.state.storybookID[0], itemValue)}
                >
                    {items.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
                <View>
                    <Image style={{ width: 100, height: 100 }}
                        source={{ uri: 'data:image/png;base64,' + this.state.media[this.state.count] }} />
                </View>
                <Text>{this.state.content[this.state.count]}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.DecreaseCount} />
                    <Text>{this.state.pageNo[this.state.count]}/{this.state.pageNo.length}</Text>
                    <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.IncrementCount} />
        </View>
                
                <Modal visible={this.state.showMe} onRequestClose={() => console.warn("this is a close request")} >
                    <View style={styles.container}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <Button style={styles.feedbackBtn} onPress={this.closeFeedback}>Okay</Button>
                    </View>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
    },
    itemText: {
        color: '#FFF',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    feedbackBtn: {
        width: 100,
        height: 100
    },
})

export default connect(null, { translateStory })(StoryBook);