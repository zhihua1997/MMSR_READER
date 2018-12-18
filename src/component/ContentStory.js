import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableNativeFeedback, AsyncStorage, TouchableOpacity } from 'react-native';
import Top from './Top';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";
import { Thumbnail, Container, Content } from 'native-base';
import { Input } from '../tools';
import { getStoryContent, DownloadStoryBook } from "../actions";
import { connect } from 'react-redux';
import { strings } from '../localization'
import StarRating from 'react-native-star-rating';

/*const data = [
    { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'}, { key: 'F'}, { key: 'G'}, { key: 'H'},
    { key: 'I'}, { key: 'J'}
];*/

const formatData = ( data, numColumns, rateValue ) => {
    let count = 0;
    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < rateValue.length; j++){
            //console.log("for loop", data[i].storybookID, rateValue[j].storybookID)
            if (data[i].storybookID == rateValue[j].storybookID){
                data[i].star = rateValue[j].average;
                count++;
            }
            else if (count === 0) {
                data[i].star = 0;
            }
            
        }
    }

    console.log("formatDate", data)
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
            star: [],
            /*stateData: formatData(data, numColumns),
            error: null,
            query: "",
            fullData: formatData(data, numColumns),*/
        };
    }


    componentDidMount() {
        AsyncStorage.getItem("storybook_token").then(token =>{
            const Alldata = JSON.parse(token);
            const rateValue = this.props.Rate;
            //console.log(strings.default);
            console.log(Alldata, rateValue);
            const len = Alldata.length; 
            var result = [];
            for (let i=0; i < len; i++) {
              result = Alldata[i].storybookID;
              console.log(result);
              this.state.title.push(result);
            }
            this.setState({
                data: formatData(Alldata, numColumns, rateValue),
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
        this.props.DownloadStoryBook({ storybookID, languageCode });

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
            <View style={styles.item}>
                <Image style={{width: 95, height: 85}} 
                source={{uri:'data:image/png;base64,'+ item.coverPage }}/>
               <Text style={styles.itemText}>{item.title}</Text>
               <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={item.star}
                                //containerStyle={{width: 20, height:5, }}
                                starSize={10}
                                fullStarColor={"#FFFF00"}
                        />
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
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns,
    },
    itemText: {
        //color: '#FFF',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
})

const mapStateToProps = state => {
    const { Rate } = state.feedback;
    
    return { Rate };
};

export default connect(mapStateToProps, { getStoryContent, DownloadStoryBook })(ContentStory);