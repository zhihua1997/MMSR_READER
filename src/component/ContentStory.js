import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableNativeFeedback, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
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
import { Dropdown } from 'react-native-material-dropdown';

/*const data = [
    { key: 'A'}, { key: 'B'}, { key: 'C'}, { key: 'D'}, { key: 'E'}, { key: 'F'}, { key: 'G'}, { key: 'H'},
    { key: 'I'}, { key: 'J'}
];*/

const items = [{ value: "Toddler"}, { value: "Preschooler"}, { value: "Gradeschooler"}, 
{ value: "SecondarySchooler"}];

const formatData = (data, numColumns, rateValue, ageGroup) => {
    let filterData = [];
    let count = 0;
    //var date = new Date().getDate();
    //var month = new Date().getMonth() + 1;

    //var userMonth = userDOB.substring(5, 7);
    //var userDay = userDOB.substring(8, 10);

    console.log("formatDate", data, rateValue, strings.toddler);

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < rateValue.length; j++) {
            //console.log("for loop", data[i].storybookID, rateValue[j].storybookID)
            if (data[i].storybookID == rateValue[j].storybookID) {
                data[i].star = rateValue[j].average;
                count++;
            }
            else if (count === 0) {
                data[i].star = 0;
            }
        }
        if (data[i].ageGroupCode == ageGroup) {
            filterData.push(data[i]);
        }

    }

    console.log("filterDate", filterData);

    const numberOfFullRow = Math.floor(filterData.length / numColumns);

    let numberOfElementLastRow = filterData.length - (numberOfFullRow * numColumns);
    while (numberOfElementLastRow !== numColumns) {
        filterData.push({ key: 'blank-$' + numberOfElementLastRow, empty: true });
        numberOfElementLastRow = numberOfElementLastRow + 1;
    }


    return filterData;
};

const numColumns = 3;
const num = 0
class ContentStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            title: [],
            star: [],
            ageGroup: "",
            /*stateData: formatData(data, numColumns),
            error: null,
            query: "",
            fullData: formatData(data, numColumns),*/
        };
    }


    componentWillMount() {
        var year = new Date().getFullYear();
        var userDOB = this.props.user.userDOB;
        var userYear = userDOB.substring(0, 4);
        var age = year - userYear;
        var ageGroup = this.state.ageGroup;

        console.log("Reducer", this.props.storyBook);

        if (ageGroup == "") {
            switch (true) {
                case age <= 3:
                    ageGroup = "Toddler";
                    break;
                case age > 3 && age <= 6:
                    ageGroup = "Preschooler";
                    break;
                case age > 6 && age <= 12:
                    ageGroup = "Gradeschooler";
                    break;
                case age > 12:
                    ageGroup = "SecondarySchooler";
                    break;
                default: ageGroup = "Hello";
            }
            this.setState({
                ageGroup: ageGroup,
            })
            console.log("ageGroup insert");
        }
        else {
            console.log("ageGroup Fail");
        }

        const Alldata = this.props.storyBook;
        const rateValue = this.props.Rate;

        //console.log(strings.default);
        console.log("Asyn Component", Alldata, rateValue, ageGroup);
        const len = Alldata.length;
        var result = [];
        for (let i = 0; i < len; i++) {
            result = Alldata[i].storybookID;
            console.log(result);
            this.state.title.push(result);
        }
        this.setState({
            data: formatData(Alldata, numColumns, rateValue, ageGroup),
        });
        //console.log(this.state.data);


    }

    getContentFunction(storybookID, languageCode) {
        //const { storybookID } = this.props;
        //console.log(this.props.storybookID);
        //storybookID, languageCode = this.props;

        this.props.getStoryContent({ storybookID, languageCode });
        this.props.DownloadStoryBook({ storybookID, languageCode });

        console.log(storybookID, languageCode);
    }

    changeAgeGroup(value) {
        this.setState({
            ageGroup: value,
        });
        this.componentWillMount();
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

    renderDropDown = () => {
        return <Dropdown
            label={strings.selectLanguage}
            data={items}
            onChangeText={(value) => this.changeAgeGroup(value)}
            containerStyle={{ height: 50, width: 200, marginBottom: 10 }}

        />
    }

    renderItem = ({ item }) => {
        //console.log(item.coverPage);

        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity onPress={() => this.getContentFunction(item.storybookID, strings.default)} style={styles.item}>
                <View style={styles.item}>
                    <Image style={{ width: 95, height: 85 }}
                        source={{ uri: 'data:image/png;base64,' + item.coverPage }} />
                    <Text style={styles.itemText}>{item.title}</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={parseFloat(item.star)}
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

    render() {
        return (
            <View >
                <View style={{ height: 40 }}>
                    <Dropdown
                        label={strings.selectAge}
                        data={items}
                        onChangeText={(value) => this.changeAgeGroup(value)}
                        containerStyle={{ height: 50, width: 200, marginBottom: 10 }}

                    />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        style={styles.container}
                        renderItem={this.renderItem}
                        numColumns={numColumns}
                    //ListHeaderComponent={this.renderDropDown}
                    //onPress={() => Actions.introduce({ title: 'data' })}
                    />
                </ScrollView>
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
        //color: '#FFF',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
})

const mapStateToProps = state => {
    const { Rate } = state.feedback;
    const { user } = state.auth;
    const { storyBook } = state.storybook;

    return { Rate, user, storyBook };
};

export default connect(mapStateToProps, { getStoryContent, DownloadStoryBook })(ContentStory);