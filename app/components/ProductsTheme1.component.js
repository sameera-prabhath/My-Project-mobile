
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class ProductTheme1 extends Component {

    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container}>


                <View style={{ marginHorizontal: 2, width: 124, backgroundColor: '#eee' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Image
                            source={{ uri: `${item.imgs}` }}
                            style={{ width: 120, height: 100, margin: 5, borderRadius: 10 }}
                        >

                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 190, marginHorizontal: 5, height: 200 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 6, width: 130, height: 60 }}>{item.productName}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, margin: 4, color: '#c44', width: 130, fontWeight: '600' }}>Rs.{item.price} </Text>
                    <View style={{ backgroundColor: '#bbb', height: 2, marginBottom: 10, marginTop: 5 }}></View>
                </View>
                <View style={{ alignItems: 'flex-end', width: 25 }}>
                    <TouchableOpacity
                        onPress={this.addToCart} //alert(item._id);
                        style={{ justifyContent: 'center', }}
                    >
                        <Icon                                                // add to cart icon here
                            style={{ width: 55, height: 50, alignItems: 'flex-end', alignSelf: 'stretch', marginLeft: 0, marginTop: 10 }}
                            name='cart-plus'
                            size={35}
                        />
                    </TouchableOpacity>
                </View>


            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 120,
        paddingVertical: 10,
        paddingLeft: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#ddd'
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    }

});
export default ProductTheme1;










