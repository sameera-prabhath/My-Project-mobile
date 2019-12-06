import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Modal, TouchableHighlight } from 'react-native';
import CartItems from './CartItems.component';
import CustomerForm from './CustomerForm.component';


class CheckoutItems extends Component {

  state = {
    themeColors: '',
    modalVisible: false,
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
    }
  };

  /////////////////////////////////////////////////////////////////////////

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }
  ///////////////////////////////////////////////////////////////////////////

  getTotal() {
    let total = 0;
    const { cartItems } = this.props;

    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].price
    }

    return <Text style={{
      textAlign: 'center',
      color: 'red',
      fontSize: 22,
      fontWeight: '900'
    }}>Total: Rs. {(total).toFixed(2)}</Text>
  }

  render() {
    const { cartItems, navigation, cartTotal } = this.props;

    return (
      <View style={styles.container}>

        {/* <View style={styles.annouc}>
          <Text style={styles.anncText}>Please confirm your order and checkout your cart</Text>
        </View> */}
        <View style={styles.ckitems}>

          <FlatList
            data={cartItems}
            renderItem={({ item, index }) =>
              <CartItems item={item} index={index} />
            }
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 0.3, backgroundColor: '#34495e90' }} />}
          />
          <Text style={{
            textAlign: 'center',
            color: 'red',
            fontSize: 22,
            fontWeight: '900'
          }}>Total: Rs. {cartTotal} </Text>

        </View>



        {/* <View style={styles.custForm}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomerForm navigation={navigation} cartItems={cartItems} />
          </ScrollView>
        </View> */}

        <View style={{ marginTop: 0, height: '100%', backgroundColor: '#ddd' }}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            onBackdropPress={() => this.setModalVisible(false)}
          >
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: '1%', height: '10%', width: '100%' }}>
              <View style={{ margin: 10 }}>

                <View style={{ alignItems: 'center' }}>
                  <CustomerForm navigation={navigation} cartItems={cartItems} />
                </View>
              </View>
            </ScrollView>
          </Modal>

          <TouchableHighlight
            style={!(cartItems.length) ? styles.modelButtonDisabled : {
              shadowColor: '#000',
              shadowOpacity: 50,
              elevation: 5,
              height: 45,
              backgroundColor: this.state.themeColors.color,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 20,
              width: 140,
              borderRadius: 30,
              alignSelf: 'center'
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Peoceed</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  custForm: {
    flex: 1
  },
  ckitems: {
    height: 400,
    backgroundColor: '#ddd'
  },
  annouc: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#34495e90',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'red'
  },
  anncText: {
    textAlign: 'center',
    color: '#fff'
  },
  totText: {
    textAlign: 'center',
    color: 'red'
  },
  modelButtonDisabled: {
    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,
    height: 45,
    backgroundColor: "gray",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: 140,
    borderRadius: 30,
    alignSelf: 'center'
  },
});


export default CheckoutItems;


