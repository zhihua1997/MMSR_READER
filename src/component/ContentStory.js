import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableNativeFeedback, AsyncStorage, TouchableOpacity } from 'react-native';
import Top from './Top';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";
import { Thumbnail, Container, Content } from 'native-base';
import { Input } from '../tools';
import { getStoryContent } from "../actions";
import { connect } from 'react-redux';
import { strings } from '../localization'

/*const data = [
    { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'}, { key: 'F'}, { key: 'G'}, { key: 'H'},
    { key: 'I'}, { key: 'J'}
];*/

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
const num = 0
class ContentStory extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            title:[],
            /*stateData: formatData(data, numColumns),
            error: null,
            query: "",
            fullData: formatData(data, numColumns),*/
        };
    }

    

    componentDidMount() {
        AsyncStorage.getItem("storybook_token").then(token =>{
            const Alldata = JSON.parse(token);
            //console.log(strings.default);
            console.log(Alldata);
            const len = Alldata.length; 
            var result = [];
            for (let i=0; i < len; i++) {
              result = Alldata[i].storybookID;
              console.log(result);
              this.state.title.push(result);
            }
            this.setState({
                data: formatData(Alldata, numColumns),
                loading: token !== null,
            });
            //console.log(this.state.data);
        });

    }

    getContentFunction(storybookID, languageCode) {
        //const { storybookID } = this.props;
        //console.log(this.props.storybookID);
        //storybookID, languageCode = this.props;

        this.props.getStoryContent({ storybookID, languageCode });

        console.log(storybookID, languageCode);
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
        //console.log(item.coverPage);
        
        if (item.empty === true){
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        return ( 
        <TouchableOpacity onPress={()=>this.getContentFunction(item.storybookID, strings.default)} style={styles.item}>
        <Text value={this.props.storybookID}>{item.storybookID}</Text>
            <View style={styles.item}>
                <Image style={{width: 66, height: 58}} 
                source={{uri:'data:image/png;base64,'+ item.coverPage }}/>
               <Text style={styles.itemText}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        );
    }

   /* renderTitle() {
        return this.state.title.map((title, i) => 
            <Text key={i} style={styles.itemText}>{title}</Text>
        );
    }*/

    render(){
        return (
            
            <FlatList
                 data={this.state.data}
                style= {styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
                //ListHeaderComponent={this.renderHeader}
                //onPress={() => Actions.introduce({ title: 'data' })}
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

export default connect(null, { getStoryContent })(ContentStory); 