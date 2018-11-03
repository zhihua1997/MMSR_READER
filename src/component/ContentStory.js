import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableNativeFeedback } from 'react-native';
import Top from './Top';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";

const data = [
    { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'}, { key: 'F'}, { key: 'G'}, { key: 'H'},
    { key: 'I'}, { key: 'J'}
];

const formatData = ( data, numColumns) => {
    const numberOfFullRow = Math.floor( data.length / numColumns);

    let numberOfElementLastRow = data.length - (numberOfFullRow * numColumns);
    while (numberOfElementLastRow !== numColumns){
        data.push({ key:'blank-$'+ numberOfElementLastRow, empty: true });
        numberOfElementLastRow = numberOfElementLastRow + 1;
    }
    
    return data;
};

const numColumns = 3;
class ContentStory extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            stateData: formatData(data, numColumns),
            error: null,
            query: "",
            fullData: formatData(data, numColumns),
        };
    }
    handleSearch = text => {
        const formatQuery = text.toLowerCase();
        const stateData = this.state.fullData;

        this.setState({ formatQuery, stateData });
    }

    renderHeader = () => {
        return <SearchBar
        round
        lightTheme
        containerStyle={styles.search}
        //ref="search"
        //textInputRef="searchText"
        onChangeText={this.handleSearch}
        placeholder='Search by Truck Name...'
    />
    }
    

    renderItem = ({ item }) => {
        if (item.empty === true){
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.key}</Text>
            </View>
        );
    }

    render(){
        return (
            
            <FlatList
                 data={this.state.stateData}
                style= {styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
                ListHeaderComponent={this.renderHeader}
                onPress={() => Actions.introduce({ title: 'data' })}
            />
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns,
    },
    itemText: {
        color: '#FFF',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
})

export default ContentStory; 