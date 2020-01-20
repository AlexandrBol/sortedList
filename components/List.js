import React, {Component} from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import axios from 'axios';

import toAlphabetList from '../utils/AlphabetedData';
import {GenderFilter, Search, AgeFrom, AgeTo} from '../utils/Filters';
import SearchBar from './SearchBar';
import Item from './Item';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            unformedData: [],
            filteredData: null,
            genderFilter: null,
            ageFromFilter: null,
            ageToFilter: null,
            search: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    shouldComponentUpdate(nextState) {
        if (this.state.usersData !== nextState.usersData) {
            return true;
        }
    }

    getData = () => {
        axios.get('https://gorest.co.in/public-api/users?_format=json&access-token=SbJwN-XTehfZ_TgbvlEjA9f7cFkdhOQHRule')
            .then(function (response) {
                this.setState({unformedData: response.data.result}, this.formData);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    formData = (data) => {
        const unformedData = this.state.unformedData;
        let formedData = toAlphabetList(data ? data : unformedData);
        this.setState({usersData: formedData.delData});
    };

    resetFilter = () => {
        this.setState({filteredData: null});
        this.formData(this.state.unformedData);
    };

    removeItemFromList = (id) => {
        let arr = this.state.unformedData;
        let removeIndex = arr.map(function (item) {
            return item.id;
        }).indexOf(id);
        arr.splice(removeIndex, 1);
        this.setState({unformedData: arr}, this.formData);
    };

    SectionHeader = (key) => {
        return (
            <View style={styles.SectionHeaderView}>
                <Text style={styles.SectionHeaderText}>{key}</Text>
            </View>
        );
    };

    FilterByGender = (data) => {
        this.setState({genderFilter: data}, () => this.FilterData());
    };


    ageFromFilter = (data) => {
        this.setState({ageFromFilter: data}, () => this.FilterData());

    };

    ageToFilter = (data) => {
        this.setState({ageToFilter: data}, () => this.FilterData());

    };

    Search = (data) => {
        this.setState({search: data}, () => this.FilterData());
    };

    FilterData = () => {
        console.log('FilterData FilterData');
        let arr = this.state.unformedData.slice();
        if (this.state.ageFromFilter) {
            arr = AgeFrom(arr, this.state.ageFromFilter).slice();
        }
        if (this.state.ageToFilter) {
            arr = AgeTo(arr, this.state.ageToFilter).slice();
        }
        if (this.state.genderFilter) {
            console.log('FilterData  >>> genderFilter');
            arr = GenderFilter(arr, this.state.genderFilter).slice();
        }
        if (this.state.search) {
            console.log('FilterData  >>> serch');
            arr = Search(arr, this.state.search).slice();
        }
        let formedData = toAlphabetList(arr);
        console.log('arr');
        setTimeout(() => this.setState({usersData: formedData.delData}), 400);
    };

    render() {
        return (
            <View>
                <SearchBar
                    resetFilter={() => this.resetFilter()}
                    FilterByGender={(gender) => this.FilterByGender(gender)}
                    ageToFilter={(ageTo) => this.ageToFilter(ageTo)}
                    ageFromFilter={(ageFrom) => this.ageFromFilter(ageFrom)}
                    Search={(search) => this.Search(search)}
                />
                <SectionList
                    sections={this.state.usersData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) =>
                        <Item
                            item={item}
                            removeItemFromList={(id) => this.removeItemFromList(id)}
                        />
                    }
                    renderSectionHeader={({section: {key}}) => (
                        this.SectionHeader(key)
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    SectionHeaderView: {
        marginLeft: 10,
    },
    SectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
