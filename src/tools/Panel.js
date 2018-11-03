import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

class Panel extends Component {

    constructor(props) {
        super(props);

        this.icons = {     
            'up': "chevron-up",
            'down': "chevron-down"
        };

        this.state = {       
            title: props.title,
            expanded: false,
            maxHeight: '',
            minHeight: ''
        };
    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
        let finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        
        this.setState({
            expanded: !this.state.expanded  
        });
    
        this.state.animation.setValue(initialValue);  
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        if (this.state.maxHeight === '') {
            this.setState({
                maxHeight: event.nativeEvent.layout.height
            });
        }
    }
    
    _setMinHeight(event){
        this.setState({
            minHeight: event.nativeEvent.layout.height,
            animation: new Animated.Value(event.nativeEvent.layout.height),
        });
    }

    render(){
        let icon = this.icons['down'];

        if (this.state.expanded){
            icon = this.icons['up'];
        }

   
        return (
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
            <View style={styles.container} >
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Icon
                            style={styles.buttonImage}
                            name={icon}
                        ></Icon>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        overflow:'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 10,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {

    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        width: 250,
        height: 200
    }
});

export { Panel };
