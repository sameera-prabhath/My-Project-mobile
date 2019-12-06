import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import getTheme from '../styles/theme.style';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class ProductTheme2 extends Component {

    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container}>


                <View style={{ width: 190, alignSelf: 'center', backgroundColor: '#ddd' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Image
                            source={{ uri: `${item.imgs[0]}` }}
                            style={{ width: 180, height: 170, marginLeft: 0, borderRadius: 10 }}
                        >

                        </Image>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '80%', justifyContent: 'space-around', flexDirection: 'row', marginHorizontal: '0%' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                                _id: item._id
                            })}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 20, width: 180 }}>{item.productName}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#c44', width: 180 }}>Rs.{(item.price).toFixed(2)}</Text>


                        <View style={{ backgroundColor: 'black', width: 120, marginLeft: 15, marginBottom: 3 }}>
                            <TouchableOpacity onPress={this.addToCart} style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                                <Text style={{ color: '#fff', padding: 3 }}>Add To Cart</Text>

                            </TouchableOpacity>
                        </View>

                        <View style={{ backgroundColor: '#12d', height: 1, marginTop: 5, width: '165%' }}></View>


                    </View>

                </View>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 180,
        backgroundColor: '#eee',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        width: "100%"
    },
    addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: 'pink'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    }

});
export default ProductTheme2;



