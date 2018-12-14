import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableNativeFeedback, AsyncStorage, TouchableOpacity } from 'react-native';
import Top from '../component/Top';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from "react-native-router-flux";
import { Thumbnail, Container, Content } from 'native-base';
import { Confirm, Button, Header }from '../tools';
import { getStoryContent, DownloadStoryBook } from "../actions";
import { connect } from 'react-redux';
import { strings } from '../localization';
import { downloadedContent, deleteStoryBook } from '../actions/DownloadAction'

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
class LocalStoryContent extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            data: [],
            storybookID: [],
            languageCode: "",
            refreshing: false,
            showModal: false,
            /*stateData: formatData(data, numColumns),
            error: null,
            query: "",
            fullData: formatData(data, numColumns),*/
        };
    }


    componentDidMount() {
        console.log("ComponentDidmount");
        AsyncStorage.getItem("download_token").then(token =>{
            const Alldata = JSON.parse(token);
            console.log(Alldata);
            const len = Alldata.length; 
            var result = [];
            for (let i=0; i < len; i++) {
              result = Alldata[i].storybookID;
              //console.log(result);
              this.state.storybookID.push(result);
            }
            this.setState({
                data: formatData(Alldata, numColumns),
                loading: token !== null,
                languageCode: strings.default,
            });
            //console.log(JSON.parse(token));
        });
        //console.log(this.props.downLoad);
        
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

    onSave(storybookID, languageCode2) {

        const { 
            languageCode,
        } = this.state;

        const storybook = {
            storybookID,
            languageCode,
            languageCode2,
        };

        this.props.downloadedContent({
            storybook
        });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        })
        this.componentDidMount();
        this.setState({
            refreshing: false,
        })
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
    onLongpress(storybookID){
        this.setState({ 
            showModal: !this.state.showModal,
            storybookID: storybookID,
        })

    }
    onAccept(storybookID) {
        console.log(storybookID, "Accept");
        this.props.deleteStoryBook({ storybookID });
        this.setState({ showModal: false });
      }
      
      onDecline() {
        this.setState({ showModal: false });
      }
    
    renderItem = ({ item }) => {
        //console.log(item.coverPage);
        
        if (item.empty === true){
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        return ( 
        <View style={styles.item}>
        <TouchableOpacity onPress={()=>this.onSave(item.storybookID, item.languageCode)} onLongPress={() => this.onLongpress(item.storybookID)} style={styles.item}>
        <Text value={this.props.storybookID}>{item.storybookID}</Text>
            <View style={styles.item}>
                <Image style={{width: 100, height: 90}} 
                source={{uri:'data:image/png;base64,'+ item.media }}/>
               <Text style={styles.itemText}>{item.title}</Text>
            </View>
        </TouchableOpacity>
         <Confirm
         visible={this.state.showModal}
         onAccept={()=> this.onAccept(storybookID)}
         onDecline={this.onDecline.bind(this)}
         >
         Are you sure to delete this storybook?
       </Confirm>
       </View>
        );
    }

   /* renderTitle() {
        return this.state.title.map((title, i) => 
            <Text key={i} style={styles.itemText}>{title}</Text>
        );
    }*/

    render(){
        return (
            <View style={{ height: "100%", width: "100%" }}>
            <Header headerText="Downloaded StoryBook"/>}/>
            <FlatList
                 data={this.state.data}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
                //ListHeaderComponent={this.renderHeader}
                //onPress={() => Actions.introduce({ title: 'data' })}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
            <Confirm
         visible={this.state.showModal}
         onAccept={()=> this.onAccept(this.state.storybookID)}
         onDecline={this.onDecline.bind(this)}
        >
         Are you sure to delete this storybook?
       </Confirm>
            </View>
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
        color: '#FFF',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
});

const mapStateToProps = state => {
    const { downLoad } = state.download;
  
    return { downLoad };
};

export default connect(mapStateToProps, { getStoryContent, DownloadStoryBook, downloadedContent, deleteStoryBook })(LocalStoryContent); 