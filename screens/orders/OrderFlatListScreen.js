
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Container, Text, } from 'native-base';
import ViewOrderScreen from './ViewOrderScreen'

class OrderFlatListScreen extends Component {

    render() {
        const { item, navigation } = this.props;
        return (

            <Container style={styles.container}>

                <View style={styles.tableBody}>
                    <View style={{ width: 200 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ViewOrderScreen', {
                                _id: item._id
                            })}
                            style={{ justifyContent: 'center', }}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', }}>{item.datetime}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 5, }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item.orderstatus}</Text>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#eef',
        // margin: 5,
        justifyContent: 'space-around'
    },
    tableText: { fontSize: 20, fontWeight: '400', color: 'black', margin: 6, },
    tableBody: { flexDirection: 'row', justifyContent: 'space-around' }

});

export default OrderFlatListScreen


