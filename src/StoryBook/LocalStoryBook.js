import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Animated, Alert, Modal, Picker } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { translateContent } from '../actions/DownloadAction';
//import Speech from 'react-native-speech';
//import Tts from 'react-native-tts';
import Tts from "react-native-tts";
import { Dropdown } from 'react-native-material-dropdown';

const items = [{ value: "EN" }, { value: "BM" }, { value: "ZH" }];

class LocalStoryBook extends Component {
    constructor(props) {
        super(props);

        const language = this.props.downLoad[0].languageCode;
        const lan = language.substring(0, 2);
        this.state = {
            loading: false,
            languageCode: lan,
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



    componentDidlMount() {
        console.log("componentWillMount");
        //console.log(this.props.downLoad[0].storybookID);
        const languageCode = this.state.languageCode;
        const storybookID = this.props.downLoad[0].storybookID;
        const storybook = {
            languageCode,
            storybookID
        };
        this.props.translateContent({ storybook });
    }

    /*componentWillReceiveProps(nextProps) {
        //debugger;
        //console.log(nextProps.downloadedStorybook[0].languageCode);
        if (this.props.downLoad.length !== 0) {
          if (
            this.props.downLoad[0].languageCode ===
            nextProps.downLoad[0].languageCode
          ) {
            console.log("same props, not need update");
          } else {
            const languageCode = this.state.languageCode;
            const storybookID = this.props.downLoad[0].storybookID;
            const storybook = {
                languageCode,
                storybookID
            };
            this.props.translateContent({ storybook });
          }
        }
      }*/



    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
      
    }

    closeFeedback = () => {
        console.log(this.state.starCount);
        this.setState({
            showMe: false
        })
    }
    cancelFeedback = () => {
        this.setState({
            showMe: false
        });
    }

    IncrementCount = () => {
        const len = this.props.downLoad.length - 1;
        if (this.state.count < len) {
            this.setState({ count: this.state.count + 1 });
        }
        else {
            this.setState({
                showMe: true
            })
            //Alert.alert("This is the last Page");
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

        this.setState({ languageCode: value });
        const languageCode = this.state.languageCode;
        const storybook = {
            languageCode,
            storybookID
        };
        this.props.translateContent({ storybook });

        //console.log(storybookID, languageCode);
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
                    onChangeText={(value) => this.getStoryFunction(this.props.downLoad[0].storybookID, value)}
                    containerStyle={{ height: 50, width: 200, marginBottom: 10 }}
                />
                <View>
                    <Image style={{ width: 350, height: 300 }}
                        source={{ uri: 'data:image/png;base64,' + this.props.downLoad[this.state.count].media }} />
                </View>
                <Text style={{fontSize: 20  }}>{this.props.downLoad[this.state.count].content}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.DecreaseCount} />
                    <Text style={{fontSize: 15  }}>{this.props.downLoad[this.state.count].pageNo}/{this.props.downLoad.length}</Text>
                    <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.IncrementCount} />
                </View>
                <View style={styles.buttonSize}>
                <Button onPress={() => this.readText(this.props.downLoad[this.state.count].content)} style={{ width: 50, height: 20 }} >
                    Speak
                </Button>
                </View>
                <Modal visible={this.state.showMe} transparent onRequestClose={() => console.warn("this is a close request")} >
                    <View style={styles.feedback}>
                    <View style={{ marginTop: 200 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        </View>
                         <View style={styles.feedbackbtn}>
                            <Button style={styles.feedbackBtn} onPress={this.closeFeedback}>Submit</Button>
                            <Button style={styles.feedbackBtn} onPress={this.cancelFeedback}>Cancel</Button>
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
    buttonSize: {
        //backgroundColor: '#D3D3D3',
        marginBottom: 60,
        width: 220,
        height: 70,
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
    const { downLoad } = state.download;
  
    return { downLoad };
};

export default connect(mapStateToProps, { translateContent })(LocalStoryBook);