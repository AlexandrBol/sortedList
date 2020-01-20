import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilters: false,
            genderFilter: 'both',
            ageFrom: '',
            ageTo: '',
            search: '',
        };
    }

    onGenderSelect = (gender) => {
        this.setState({genderFilter: gender}, this.props.FilterByGender(gender));
    };

    genderSelect = () => {
        let gender = this.state.genderFilter;
        return (
            <View styles={{marginTop: 5}}>
                <Text>Gender:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity
                        onPress={() => this.onGenderSelect('male')}
                    >
                        <Text style={gender === 'male' && styles.bold}>male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onGenderSelect('female')}
                    >
                        <Text style={gender === 'female' && styles.bold}>female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onGenderSelect('both')}
                    >
                        <Text style={gender === 'both' && styles.bold}>both</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    onAgeToInput = (ageTo) => {
        this.setState({ageTo: ageTo});
        this.props.ageToFilter(ageTo);
    };

    Search = (search) => {
        this.setState({search: search});
        this.props.Search(search);
    };

    onAgeFromInput = (ageFrom) => {
        this.setState({ageFrom: ageFrom});
        this.props.ageFromFilter(ageFrom);
    };

    ageSelect = () => {
        return (
            <View>
                <Text>Age:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Text>From:</Text>
                    <TextInput
                        editable
                        maxLength={3}
                        style={styles.AgeInput}
                        multiline={false}
                        value={this.state.ageFrom}
                        onChangeText={ageFrom => this.onAgeFromInput(ageFrom)}
                    />
                    <Text>To:</Text>
                    <TextInput
                        editable
                        maxLength={3}
                        style={styles.AgeInput}
                        multiline={false}
                        value={this.state.ageTo}
                        onChangeText={ageTo => this.onAgeToInput(ageTo)}
                    />

                </View>
            </View>
        );
    };

    resetButton = () => {
        return (
            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => this.resetFilter()}
            >
                <Text>Reset</Text>
            </TouchableOpacity>
        );
    };

    resetFilter = () => {
        this.props.resetFilter();
        this.setState({genderFilter: 'both', ageFrom: '', ageTo: ''});
    };

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TextInput
                        editable
                        maxLength={40}
                        style={styles.textInput}
                        multiline={false}
                        value={this.state.search}
                        onChangeText={search => this.Search(search)}
                    />
                    <TouchableOpacity
                        style={styles.FilterBtnContainer}
                        onPress={() => this.setState({showFilters: !this.state.showFilters})}
                    >
                        <Text style={styles.FilterBtnText}>{this.state.showFilters ? 'Close' : 'Filter'}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.showFilters ? <View style={styles.FiltersContainer}>
                    {this.ageSelect()}
                    {this.genderSelect()}
                    {this.resetButton()}
                </View> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: '70%',
        height: 40,
        backgroundColor: '#e7e7e7',
        marginLeft: 30,
        borderRadius: 50,
        fontSize: 20,
        color: '#555555',
        paddingLeft: 10,
    },
    FilterBtnContainer: {
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FilterBtnText: {
        fontSize: 20,
    },
    FiltersContainer: {
        marginTop: 10,
        marginLeft: 20,
        justifyContent: 'center',
    },
    AgeInput: {
        width: 70,
        height: 40,
        backgroundColor: '#e7e7e7',
        marginLeft: 30,
        borderRadius: 50,
        fontSize: 20,
        color: '#555555',
        paddingLeft: 10,
    },
    resetButton: {
        width: 100,
        height: 30,
        color: '#555555',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: width / 2 - 70,
    },
});
