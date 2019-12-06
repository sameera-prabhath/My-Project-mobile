import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage"
import OrderSummary from '../components/OrderSummary.component';
import Cart from '../components/Cart.component';
import axios from "axios"
import property from '../../config'


const apiInsertOrder = `${property.BASE_URL}addOrder`;
const apiGetThemes = `${property.BASE_URL}getTheme`;


class Receipt extends Component {

    state = {
        themeColors: ''
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Purchase Details',
            headerRight: <Cart navigation={navigation} />
        }
    }


    componentDidMount = () => {
        axios.get(apiGetThemes).then(res => {
            const data = res.data;
            this.setState({ themeColors: data })
        }).catch((error) => {
            console.error(`Error reddda is : ${error}`);
        });


        this.getToken().then(res => {
            this.sendOrderToBackend(res)
            // alert('token = ' + res)
        }
        )
    }
    /////////////////////////////////////////////////////////////////////////////////////////////


    getToken = async () => {
        const Token = await AsyncStorage.getItem('token')
        return Token
    };


    sendOrderToBackend = (token) => {
        const { items, customer } = this.props

        const Token = 'Bearer ' + token;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': Token
        }

        axios.post(apiInsertOrder, {
            customername: customer.name,
            email: customer.email,
            telephone: customer.phone,
            deliveraddress: customer.street,
            orderitems: items,

        }, { headers: headers })
            .then(res => {
                if (res.status === 200) {
                    // alert('order passed successfully')
                } else {
                    alert("Error : order didnt pass to server")
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            });

    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////



    getTotal() {
        let total = 0;
        const { items } = this.props;

        for (let i = 0; i < items.length; i++) {
            total = total + items[i].price * items[i].quantity
        }

        return <Text style={{
            textAlign: 'center',
            color: 'red',
            fontWeight: '900',
            fontSize: 20
        }}>Total : Rs. {(total).toFixed(2)}</Text>
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////


    renderHeaderIcon = () => {

        if (this.state.themeColors.theme === 'theme1') {
            return (
                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard1')} />
            )
        }
        else if (this.state.themeColors.theme === 'theme2') {
            return (
                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard2')} />
            )
        }
        else if (this.state.themeColors.theme === 'theme3') {
            return (
                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard3')} />
            )
        }
    }
    renderTextAction = () => {
        if (this.state.themeColors.theme === 'theme1') {
            return (
                this.props.navigation.navigate('Dashboard1')
            )
        }
        else if (this.state.themeColors.theme === 'theme2') {
            return (
                this.props.navigation.navigate('Dashboard2')
            )
        }
        else if (this.state.themeColors.theme === 'theme3') {
            return (
                this.props.navigation.navigate('Dashboard3')

            )
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////

    render() {

        const { customer, items, navigation } = this.props;

        return (

            <Container>
                <Header style={{ backgroundColor: this.state.themeColors.color }}>
                    <Left>
                        {this.renderHeaderIcon()}
                    </Left>
                    <Body>
                        <Title>Purchase Details</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={() => this.renderTextAction()}>
                            <Text>ok</Text>
                        </Button>
                    </Right>
                </Header>



                <View style={styles.container}>
                    <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

                    <View style={styles.billings}>
                        <View style={{
                            backgroundColor: '#aaf',
                            shadowColor: '#000',
                            shadowOpacity: 50,
                            height: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginBottom: 10,
                            width: 380,
                        }}>
                            <Text style={{ color: 'white' }}>Billing details</Text></View>
                        <Text style={styles.text}> Customer Name : {customer.name}</Text>
                        <Text style={styles.text}> Phone : {customer.phone}</Text>
                        <Text style={styles.text}> Address : {customer.street}</Text>
                    </View>


                    <View style={styles.orderSumm}>
                        <View style={{
                            backgroundColor: '#aaf',
                            shadowColor: '#000',
                            shadowOpacity: 50,
                            height: 35,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginBottom: 10,
                            marginTop: 30,
                            width: 380,
                        }}>
                            <Text style={{ color: 'white' }}>Order summary</Text>
                        </View>
                        <FlatList
                            data={items}
                            renderItem={({ item }) =>

                                <OrderSummary item={item} />
                            }
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />}
                        />

                        {this.getTotal()}

                    </View>
                </View>


            </Container>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headings: {
        backgroundColor: '#34495e90',
        padding: 12,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderSumm: {
        flex: 1,
        margin: 10
    },
    billtext: {
        padding: 6,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'pink',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    text: {
        marginLeft: 40,
        marginVertical: 5
    },
    billings: {
        height: 150,
        // margin: 10
    },
    totText: {
        textAlign: 'center',
        color: 'red'
    }
});

const mapStateToProps = (state) => ({
    customer: state.order.order.customer,
    items: state.order.order.items
})
export default connect(mapStateToProps)(Receipt);

















