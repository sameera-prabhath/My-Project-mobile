

import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Container, Text, } from 'native-base';
import axios from "axios"
import property from '../../config'
import OrderFlatList from './OrderFlatListScreen'
import { ScrollView } from 'react-native-gesture-handler';

const apiSendToken = `${property.BASE_URL}getordersbyuserid`

class PreviousOrderScreen extends Component {


    constructor(props) {
        super(props);

    }
    state = {
        orderList: ''
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount = () => {
        // alert(" token from props  " + JSON.stringify(this.props.Token)) 
        if (this.props.Token !== null)
            this.sendTokenToServer(this.props.Token)
    }

    componentDidUpdate = () => {
        const { Token } = this.props
        // alert(" token from props  " + JSON.stringify(Token))
        this.sendTokenToServer(Token)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    getToken = async () => {
        // alert('mithum Anuhassss')
        const Token = await AsyncStorage.getItem('token')
        this.setState({ Token: Token })
        // alert(Token + ' inside set token function')
        return Token
    };


    sendTokenToServer = (token) => {
        // alert(" token from props  " + JSON.stringify(this.props.Token))          //  both ways working
        // alert(' send to token' + JSON.stringify(token))
        const Token = 'Bearer ' + token;
        //  alert(Token)
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': Token
        }


        axios.get(apiSendToken, { headers: headers }).then((response) => {
            const data = response.data
            // alert(JSON.stringify(data) + ' ssssssssssssss')
            this.setState({ orderList: data })
        })
            .catch((error) => {
                console.log("axios error:", error);
            });
    }


    ///////////////////////////////////////////////////////////////////////////////////////////

    render() {
        const { navigation } = this.props;
        return (
            <Container style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: '#ccf', }}>
                    <Text style={styles.tableText}>Date </Text>
                    <Text style={styles.tableText}>status  </Text>

                </View>
                <View style={{ height: 0.5, backgroundColor: '#fff', }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.orderList}
                        renderItem={({ item }) =>
                            <OrderFlatList navigation={navigation} item={item} />
                        }
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#fff', }} />}
                    />
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        backgroundColor: '#ccf',
        margin: 2
    },
    tableText: { fontSize: 20, fontWeight: '400', color: 'black', margin: 6, },
    tableBody: { flexDirection: 'row', justifyContent: 'space-around' }

});


export default PreviousOrderScreen;
