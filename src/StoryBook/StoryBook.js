import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Animated, Alert, Modal } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
//import Speech from 'react-native-speech';
//import Tts from 'react-native-tts';


class StoryBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            pageNo: [],
            media: [],
            content: [],
            count: 0,
            starCount: 0,
            showMe: false,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("story_token").then(token => {
            const Alldata = JSON.parse(token);
            console.log(Alldata);
            const len = Alldata.length;
            var pageNo = [];
            var media = [];
            var content = [];

            for (let i = 0; i < len; i++) {
                pageNo = Alldata[i].pageNo;
                media = Alldata[i].media;
                content = Alldata[i].content;

                this.state.pageNo.push(pageNo);
                this.state.media.push(media);
                this.state.content.push(content);

            }
            this.setState({
                data: Alldata,
                loading: token !== null,
            });
            //console.log(this.state.data);
        });

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

    

    render() {
        return (
            <View style={styles.container}>
<<<<<<< HEAD
            <View>
                <Image style={{width: 100, height: 100}} 
                source={{uri:'data:image/png;base64,'+ this.state.media[this.state.count] }}/>
            </View>
            <Text>{this.state.content[this.state.count]}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={ this.DecreaseCount} />
                   <Text>{this.state.pageNo[this.state.count]}/{this.state.pageNo.length}</Text>
                 <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={ this.IncrementCount}/>
=======
                    <View>
                        <Image style={{ width: 100, height: 100 }}
                            source={{ uri: 'data:image/png;base64,' + this.state.media[this.state.count] }} />
                    </View>
                    <Text>{this.state.content[this.state.count]}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon name="chevron-left" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.DecreaseCount} />
                        <Text>{this.state.pageNo[this.state.count]}</Text>
                        <Icon name="chevron-right" size={30} color="#000" style={{ marginRight: 10 }} onPress={this.IncrementCount} />
                    </View>
                <Modal visible={this.state.showMe} onRequestClose={() => console.warn("this is a close request")} >
                <View>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    <Button style={styles.feedbackBtn} onPress={this.closeFeedback}>Okay</Button>
>>>>>>> c45c249918feb6b13f7bee021160754afe0426f4
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

export default StoryBook;