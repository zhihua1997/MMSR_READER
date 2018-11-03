import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { SearchBar, ListItem, List } from 'react-native-elements';
import { getData } from '../api/index';
import _ from 'lodash';


const numColumns = 3;
class TryContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true });
        
        getData()
        .then(users => {
            this.setState({
                loading: false,
                data: users
            });
        })
        .catch(error => {
            this.setState({ error, loading: false });
        });
    };

    renderHeader = () => {
        return <SearchBar
        round
        lightTheme
        //containerStyle={styles.search}
        //ref="search"
        //textInputRef="searchText"
        onChangeText={this.handleSearch}
        placeholder='Search by Truck Name...'
    />
    };

    render(){
        return (
            <SafeAreaView>
                <List>
                <FlatList
                    data={this.state.data}
                    renderItem ={({ item }) => (
                        <View style={styles.item}>
                        <Text style={styles.itemText}>{item.key}</Text>
                    </View>
                    )}
                    ListHeaderComponent={this.renderHeader}
                   // style= {styles.container}
                    numColumns={numColumns}
                />
                </List>
            </SafeAreaView>
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

export default TryContent;