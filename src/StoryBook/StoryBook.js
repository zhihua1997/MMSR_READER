import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Animated, Alert, Modal, ScrollView } from 'react-native';
import { Item, Picker } from 'native-base';
import { Button } from '../tools';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { translateStory, starFeedback } from '../actions';
//import Speech from 'react-native-speech';
//import Tts from 'react-native-tts';
import Tts from "react-native-tts";
import { Dropdown } from 'react-native-material-dropdown';
import { strings } from '../localization'


const items = [{ value: "EN", label: "English"}, { value: "BM", label: "Bahasa Malayu" }, { value: "ZH", label: "Chinese" }];

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

        let rateValue = this.state.starCount.toString();
        let userId = this.props.user.userId.toString();
        let storybookID = this.props.storyBook[0].storybookID.toString();
        this.setState({
            showMe: false
        });
        console.log(rateValue, userId, storybookID);
        this.props.starFeedback({ userId, storybookID, rateValue });

    }

    cancelFeedback = () => {
        this.setState({
            showMe: false
        });
    }

    IncrementCount = () => {
        const len = this.props.storyBook.length - 1;
        if (this.state.count < len) {
            this.setState({ count: this.state.count + 1 });
        }
        else {
            //Alert.alert("This is the last Page");
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

                    label={strings.selectLanguage}
                    data={items}
                    onChangeText={(value) => this.getStoryFunction(this.props.storyBook[0].storybookID, value)}
                    containerStyle={{ height: 50, width: 200, marginBottom: 10 }}
                />
                <View>
                    <Image style={{ width: 350, height: 300 }}
                        source={{ uri: 'data:image/png;base64,' + this.props.storyBook[this.state.count].media }} />
                </View>
                <Text style={{ fontSize: 20 }}>{this.props.storyBook[this.state.count].content}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.DecreaseCount} />
                    <Text style={{ fontSize: 15 }}>{this.props.storyBook[this.state.count].pageNo}/{this.props.storyBook.length}</Text>
                    <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.IncrementCount} />
                </View>
                <View style={styles.buttonSize}>
                    <Button onPress={() => this.readText(this.props.storyBook[this.state.count].content)} style={{ width: 50, height: 20 }} >
                        {strings.speak}
                </Button>
                <Button onPress={() => this.setState({ showMe: true })} style={{ width: 50, height: 20 }} >
                        {strings.feedBack}
                </Button>
                </View>
                
                <Modal visible={this.state.showMe} transparent onRequestClose={() => console.warn("this is a close request")} animationType="slide">
                    <View style={styles.feedback}>
                        <View style={{ marginTop: 200 }}>
                        <Text style={{ fontSize: 20, color: "white"}}>{strings.feedback}</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={"#FFFF00"}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}

                            />
                        </View>
                        <View style={styles.feedbackbtn}>
                            <Button style={styles.feedbackBtn} onPress={this.closeFeedback}>{strings.submit}</Button>
                            <Button style={styles.feedbackBtn} onPress={this.cancelFeedback}>{strings.cancel}</Button>
                        </View>
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
    feedback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    feedbackbtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 360,
        width: 220,
        height: 30,
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
    buttonSize: {
        //backgroundColor: '#D3D3D3',
        marginBottom: 60,
        width: 220,
        height: 110,
    },
    feedbackBtn: {
        width: 100,
        height: 100
    },
})

const mapStateToProps = state => {
    const { storyBook } = state.story;
    const { user } = state.auth;
    return { storyBook, user };
};

export default connect(mapStateToProps, { translateStory, starFeedback })(StoryBook);