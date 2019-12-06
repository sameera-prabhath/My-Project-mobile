import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import getTheme from '../styles/theme.style';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class ProductTheme3 extends Component {
    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container}>
                <View style={{ width: '100%', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                        style={{}}
                    >
                        <Image
                            source={{ uri: `${item.imgs[0]}` }}
                            style={{ width: 130, height: 165, margin: 10, borderRadius: 10, }}
                        >

                        </Image>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'black', width: 120, marginLeft: 0, marginBottom: 3 }}>
                        <TouchableOpacity onPress={this.addToCart} style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                            <Text style={{ color: '#fff' }}>Add To Cart</Text>

                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text1}>{item.productName}</Text>
                    <Text style={styles.text2}>Rs. {item.price}</Text>

                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 250,
        marginHorizontal: 3,
        backgroundColor: '#eee',
        borderRadius: 2,
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    text2: { color: '#f22', fontSize: 12, fontWeight: 'bold', marginLeft: 20 },
    text1: { fontSize: 14, fontWeight: '400', color: 'black', marginLeft: 5, }


});
export default ProductTheme3;



