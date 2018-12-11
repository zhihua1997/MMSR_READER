import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Animated, Alert, Modal } from 'react-native';
import { Item, Picker } from 'native-base';
import { Button } from '../tools';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { translateStory } from '../actions';
//import Speech from 'react-native-speech';
//import Tts from 'react-native-tts';
import Tts from "react-native-tts";
import { Dropdown } from 'react-native-material-dropdown';

const items = [{ value: "EN" }, { value: "BM" }, { value: "ZH" }];

class StoryBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            languageCode: this.props.storyBook[0].languageCode,
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



    componentWillMount() {
        console.log("componentWillMount");
        const languageCode = this.state.languageCode;
        const storybookID = this.props.storyBook[0].storybookID;
        this.props.translateStory({ storybookID, languageCode });
    }

    componentWillReceiveProps(nextProps) {
        //debugger;
        //console.log(nextProps.downloadedStorybook[0].languageCode);
        if (this.props.storyBook.length !== 0) {
          if (
            this.props.storyBook[0].languageCode ===
            nextProps.storyBook[0].languageCode
          ) {
            console.log("same props, not need update");
          } else {
            const languageCode = this.state.languageCode;
            const storybookID = this.props.storyBook[0].storybookID;
            this.props.translateStory({ storybookID, languageCode });
          }
        }
      }


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }


    closeFeedback = () => {
        this.setState({
            showMe: false
        })
    }

    IncrementCount = () => {
        const len = this.props.storyBook.length - 1;
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

    getStoryFunction(storybookID, value) {
        //const { storybookID } = this.props;
        //console.log(this.props.storybookID);
        //storybookID, languageCode = this.props;
        //this.reload();
        this.setState({ languageCode: value });
        const languageCode = this.state.languageCode;
        this.props.translateStory({ storybookID, languageCode });

        console.log(storybookID, languageCode);
    }

    reload = () => {
        this.setState({
            storybookID: [],
            pageNo: [],
            media: [],
            content: [],
        });

        //console.log(this.state.content);
        //this.componentDidMount();
    }

    readText(item) {
        Tts.stop();
        Tts.speak(item, { iosVoiceId: 'com.apple.ttsbundle.Moira-compact' });
        //Tts.speak(item, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.5, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
    };


    render() {
        return (
            <View style={styles.container}>
                <Dropdown
              
                    label='Select languege: '
                    data={items}
                    onChangeText={(value) => this.getStoryFunction(this.props.storyBook[0].storybookID, value)}
                    containerStyle={{ height: 50, width: 100 }}
                />
                <View>
                    <Image style={{ width: 100, height: 100 }}
                        source={{ uri: 'data:image/png;base64,' + this.props.storyBook[this.state.count].media }} />
                </View>
                <Text>{this.props.storyBook[this.state.count].content}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.DecreaseCount} />
                    <Text>{this.props.storyBook[this.state.count].pageNo}/{this.props.storyBook.length}</Text>
                    <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.IncrementCount} />
                </View>
                <Button onPress={() => this.readText(this.props.storyBook[this.state.count].content)} style={{ width: 50, height: 20 }} >
                    Speak
                </Button>
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

const mapStateToProps = state => {
    const { storyBook } = state.story;
  
    return { storyBook };
};

export default connect(mapStateToProps, { translateStory })(StoryBook);