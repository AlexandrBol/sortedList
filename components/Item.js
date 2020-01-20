import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import calculateAge from '../utils/CalculateAge';


export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onItemPress = (item) => {
        let msg = 'Вы действительно хотите пригласить на свидание пользователя с id = ' + item.id;
        Alert.alert(
            '',
            msg,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log(this.props.removeItemFromList(item.id))},
            ],
            {cancelable: false},
        );
    };

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.onItemPress(this.props.item)}
                style={styles.ItemContainerStyle}
            >
                <View style={styles.ItemIconContainer}>
                    <Text style={{fontSize: 25}}>{'#' + this.props.item.id}</Text>
                </View>
                <View style={styles.ItemDataContainer}>
                    <Text
                        style={[this.props.item.status === 'active' ? {color: '#00000f'} : {color: '#575757'}, styles.ItemName]}
                    >
                        {this.props.item.first_name + ' ' + this.props.item.last_name}
                    </Text>
                    <Text styles={styles.ItemData}>
                        {calculateAge(this.props.item.dob) + ' ' + 'year old'}
                    </Text>
                    <Text styles={styles.ItemData}>
                        {this.props.item.gender}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    ItemContainerStyle: {
        marginLeft: 30,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        flex: 1,
    },
    ItemName: {
        fontSize: 15,
    },
    ItemData: {
        fontSize: 12,
    },
    ItemIconContainer: {
        backgroundColor: '#c5fcff',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemDataContainer: {
        marginLeft: 10,
    },
});
