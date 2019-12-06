import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import axios from "axios"
import property from '../../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;

/////////////////////////////////////////////////////////////              image array not working
class ViewOrderScreen extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        orderDetails: '',
        themeColors: ''
    }

    ///////////////////////////////////////////////////////////////////////////


    componentDidMount() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`${property.BASE_URL}order/${_id}`)
            .then(res => {
                const orderDetails = res.data;
                this.setState({ orderDetails });
            })

        axios.get(apiGetThemes).then(res => {
            const data = res.data;
            this.setState({ themeColors: data })
        }).catch((error) => {
            console.error(`Error reddda is : ${error}`);
        });

    }

    componentDidUpdate() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`${property.BASE_URL}order/${_id}`)
            .then(res => {
                const orderDetails = res.data;
                this.setState({ orderDetails });
                // alert(JSON.stringify(this.state.orderDetails.orderitems))
            })
    }

    //////////////////////////////////////////////////////////////////////////

    renderHeaderIcon = () => {

        if (this.state.themeColors.theme === 'theme1') {
            return (
                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Profile')} />
            )
        }
    }

    /////////////////////////////////////////////////////////////////////////////

    render() {
        // const SampleNameArray = this.state.orderDetails.orderitems
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#eee' }} showsVerticalScrollIndicator={false}>
                <Container>
                    <Header style={{ backgroundColor: this.state.themeColors.color }}>
                        <Left>
                            <Icon
                                name="arrow-back"
                                style={{ color: 'white' }}
                                onPress={() => this.props.navigation.navigate('Profile')}
                            />
                        </Left>
                        <Body>
                            <Title>Order Details</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>

                    <View style={{ flex: 1, flexDirection: 'column', }}>
                        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>Order Id : {this.state.orderDetails.orderid}</Text>
                            <Text style={styles.description}>Order Status : {this.state.orderDetails.orderstatus}</Text>
                            
                            <Text style={styles.header}> Product List </Text>

                            <FlatList
                                data={this.state.orderDetails.orderitems}
                                renderItem={({ item }) =>
                                    <View style={{ justifyContent: 'space-around', height: 80, marginLeft: 20 }}>

                                        <Text> Name : {item.productName}</Text>
                                        <Text> Price : {item.price}</Text>
                                        <Text> Quantity : {item.quantity}</Text>
                                    </View>
                                }
                                keyExtractor={(item) => item.id}
                                ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: '#fff', }} />}
                            />
                        </View>

                    </View>
                </Container>
            </ScrollView>
        );
    }
}

export default ViewOrderScreen


const styles = StyleSheet.create({
    description: {
        backgroundColor: '#ccf',
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
    descriptionView: {
        backgroundColor: '#ddf',
        borderWidth: 2,
        borderColor: '#bbb',
        flexDirection: 'column',
        margin: 5,
        height: 'auto',
    },
    header: {
        backgroundColor: '#77d',
        borderWidth: 2,
        borderColor: '#888',
        flexDirection: 'column',
        height: 'auto',
        paddingVertical: 8,
        paddingLeft: '33%',
        alignItems: 'center',
        width: '100%'
    }
});


