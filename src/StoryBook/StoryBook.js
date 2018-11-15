import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image, Button, Animated } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';

class StoryBook extends Component {
    state = {
        badgeScale: new Animated.Value(0),
        textValue: 0,
    }

    animateBadge(){
        this.state.badgeScale.setValue(0)
        const newTextValue = ++this.state.textValue
        this.setState({textValue: newTextValue })
        Animated.timing(this.state.badgeScale, {
            toValue: 1,
            duration: 500
        }).start()
    }
    
    render() {

        return(
            <View style={styles.container}>
                <View style={{width: 100, height: 100, backgroundColor:'red', borderRadius: 50}}>
                <Image style={{width: 100, height: 100, backgroundColor:'red', borderRadius: 50}}
                source={require('../Images/flower.png')}></Image>
                    <Animated.View style = {{position: 'absolute', width: 40, height: 40, backgroundColor:'black', borderRadius: 25,
                    justifyContent: 'center', alignItems: 'center',
                    borderColor: 'green',borderWidth: 1,
                    left: 0, top: 0,
                    tranform:[
                        {
                            scale: this.state.badgeScale
                        }
                    ]
                    }}>
                      <Text style={{backgroundColor:"transparent",color:'white',}}> {this.state.textValue}</Text>
                    </Animated.View>
                </View>
                <Button title='Add' onPress={() => this.animateBadge()}></Button>
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
    }
})

export default StoryBook;