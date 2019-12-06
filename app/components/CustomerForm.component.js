import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addOrder } from '../redux/actions/orderAction';
import { emptyCart } from '../../app/redux/actions/cartActions';
import axios from 'axios';
import property from '../../config'
import validate from "../../utility/validation"

const apiGetThemes = `${property.BASE_URL}getTheme`;

class CustomerForm extends Component {
    state = {
        themeColors: '',
        controls: {
            name: {
                value: "",
                valid: true,
                validationRules: {
                    req: true
                },
                touched: false

            },

            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false

            },
            phone: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 10
                },
                touched: false

            },
            street: {
                value: "",
                valid: false,
                validationRules: {
                    req: true
                },
                touched: false

            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password',
                    minLength: 4
                },
                touched: false

            }
        }
    }

    componentDidMount = () => {

        axios.get(apiGetThemes).then(res => {
            const data = res.data;
            this.setState({ themeColors: data })
        }).catch((error) => {
            console.error(`Error reddda is : ${error}`);
        });
    }


    /////////////////////////////////////////////////////////////////////////////////////

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        }
        );
    };

    ///////////////////////////////////////////////////////////////////////////////

    onPressButton = () => {
        const name = this.state.controls.name.value
        const email = this.state.controls.email.value
        const phone = this.state.controls.phone.value
        const street = this.state.controls.street.value

        alert('"' + name + '"' + ' back to view reciept')

        const { navigation, addOrder, emptyCart, cartItems } = this.props;

        let customer = { name: name, phone: phone, email: email, street: street }

        addOrder({ cartItems: cartItems, customer: customer });             //      PASS CARTITEM AND CUSTOMER TO RECEIPT

        /////////////////////////////////////////////////////      cart will clear after passing order

        emptyCart();

        navigation.navigate('Receipt');

    }


    renderButton() {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableHighlight underlayColor='#e3d8dd'
                    disabled={!(this.state.controls.name.valid && this.state.controls.phone.valid && this.state.controls.street.valid)}
                    style={!(this.state.controls.name.valid && this.state.controls.phone.valid && this.state.controls.street.valid) ? styles.buttonDisable : styles.buttonContainer}
                    onPress={() => { this.onPressButton() }}>

                    <Text style={{ color: '#eee', fontSize: 18, fontWeight: '600' }}>Continue</Text>
                </TouchableHighlight>
            </View>
        );
    }


    renderNameTextfield(options) {
        return (
            <View>
                <TextInput
                    style={[styles.inputContainer, !this.state.controls.name.valid && this.state.controls.name.touched ? styles.inputInvalid : null]}

                    onChangeText={(val) => this.updateInputState('name', val)}
                    placeholder="Name"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={!this.state.controls.name.valid && this.state.controls.name.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Name Is Requred</Text>
            </View>
        )
    }



    renderPhoneTextfield(options) {
        return (
            <View>
                <TextInput
                    style={[styles.inputContainer, !this.state.controls.phone.valid && this.state.controls.phone.touched ? styles.inputInvalid : null]}
                    keyboardType="numeric"
                    onChangeText={(val) => {
                        if (isNaN(val)) {
                            alert("not a num")
                        } else {
                            this.updateInputState('phone', val)
                        }
                    }}
                    ref={(input) => { this.secondTextInput = input; }}
                    placeholder="Phone Number"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={!this.state.controls.phone.valid && this.state.controls.phone.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Phone Number Is Requred</Text>
            </View>
        )
    }

    renderEmailTextfield(options) {
        return (
            <View>
                <TextInput
                    style={[styles.inputContainer, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.inputInvalid : null]}
                    value={this.state.controls.email.value}
                    onChangeText={(val) => this.updateInputState('email', val)}
                    ref={(input) => { this.thirdTextInput = input; }}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={!this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Enter Valid Email Address</Text>
            </View>
        )
    }


    renderStreetTextfield(options) {
        return (
            <View>
                <TextInput
                    style={[styles.inputContainer, !this.state.controls.street.valid && this.state.controls.street.touched ? styles.inputInvalid : null]}

                    onChangeText={(val) => this.updateInputState('street', val)}
                    ref={(input) => { this.fourthTextInput = input; }}
                    placeholder="Street"
                    underlineColorAndroid='transparent'
                />
                <Text style={!this.state.controls.street.valid && this.state.controls.street.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Address Is Requred</Text>
            </View>
        )
    }




    render() {
        return (
            <View style={styles.panel}>
                <View style={{ backgroundColor: '#ccc', width: '100%', height: 40, alignItems: 'center', paddingTop: 10, }}>
                    <Text style={{ fontWeight: '900', fontSize: 18, color: '#111' }}>Fill Your Details To proceed Checkout</Text>
                </View>
                {this.renderNameTextfield({ name: 'name', label: 'Your name' })}
                {this.renderPhoneTextfield({ name: 'phone', label: 'Your phone number', keyboard: 'phone-pad' })}
                {/* {this.renderEmailTextfield({ name: 'email', label: 'Your email address', keyboard: 'email-address' })} */}
                {this.renderStreetTextfield({ name: 'street', label: 'Your street' })}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        padding: 10,
        margin: 10,
        width: '100%'
    },
    textField: {
        height: 40,
        margin: 8,
        backgroundColor: '#fff'
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },

    inputInvalid: {
        borderLeftColor: 'red',
        borderLeftWidth: 3,
    },
    invalidMsg: {
        fontSize: 12,
        color: 'red'
    },

    invalidMsgFalse: {
        color: "#ccc",
        fontSize: 12
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 2,
        padding: 10
    },

    buttonContainer: {

        shadowColor: '#000',
        shadowOpacity: 50,
        elevation: 5,
        height: 45,
        backgroundColor: "red",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
        marginTop: 30,
        width: 160,
        borderRadius: 30,
    },
    buttonDisable: {
        shadowColor: '#000',
        shadowOpacity: 50,
        elevation: 5,
        height: 45,
        backgroundColor: "gray",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
        marginTop: 30,
        width: 160,
        borderRadius: 30,
    },
});
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, { addOrder, emptyCart })(CustomerForm);