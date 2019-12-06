import React from "react";
import { Alert, View, StatusBar, StyleSheet, TextInput, TouchableHighlight, Modal, } from "react-native";
import validate from "../utility/validation"
import AsyncStorage from "@react-native-community/async-storage"
import { Body, Header, Left, Text, Title } from "native-base";
import axios from "react-native-axios";
import property from '../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;
const apiPostResetPassword = `${property.BASE_URL}resetpassword`;
// const apiSendToken = `${property.BASE_URL}ecomuserprofile`
const apiPostSingIn = `${property.BASE_URL}signin`;

let options = {
};

class LoginScreen extends React.Component {

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
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 4
        },
        touched: false
      },
      resetEmail: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      }
    }
  };


  static navigationOptions = () => {
    return {
      headerTitle: 'LOGIN',
      headerLeft: null,
      headerTitleStyle: {
        textAlign: 'center',
        // backgroundColor: 'red',      ///     this.state.themeColors.color
        flexGrow: 1,
        alignSelf: 'center',
      },

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

  renderNavigation = () => {
    // alert(this.state.themeColors.theme)   //  work

    if (this.state.themeColors.theme == "theme1") {
      this.props.navigation.navigate('Dashboard1');
    }
    if (this.state.themeColors.theme == "theme2") {
      this.props.navigation.navigate('Dashboard2');
    }
    if (this.state.themeColors.theme == "theme3") {
      this.props.navigation.navigate('Dashboard3');
    }
  }

  setToken = async token => {
    await AsyncStorage.setItem("token", token).then(async val => {
      const Token = await AsyncStorage.getItem('token')
      // alert(Token + ' inside set token function')
      // this.props.navigation.navigate('Dashboard1');   //  correct this navigation 
      this.renderNavigation()
    });
  };

  signIn = () => {

    axios.post(apiPostSingIn, {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value

    })
      .then(res => {
        if (res.status === 200) {
          this.setToken(res.data.token)
        }
        if (res.status === 201) {
          Alert.alert("Oops...", res.data.msg)
        }
      })
      .catch(err => {
        Alert.alert(
          "Network Error",
          'Something Went Wrong'
        )
        console.log();
        throw err;
      });
  };


  ///////////////////////////////////////////////////

  updateInputState = (key, value) => {
    let connectedValue = {};
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,

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
    });
  };
  //////////////////////////////////////////////////////////////////////    model functions

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sendEmail = () => {
    axios.post(apiPostResetPassword, {
      email: this.state.controls.resetEmail.value
    })
      .then(res => {
        // alert(JSON.stringify(res.data.message))
        Alert.alert(
          'Reset Password',
          JSON.stringify(res.data.message),
          [
            // { text: 'OK', onPress: () => console.log('OK Pressed') },
            { text: 'OK', onPress: () => this.setModalVisible(!this.state.modalVisible) },
          ],
          { cancelable: false },
        );
      })
      .catch(err => {
        console.log();
        throw err;
      });
  };
  /////////////////////////////////////////////////////////////////////

  render() {
    return (

      <View style={styles.con}>
        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />
        <View style={styles.container}>

          <TextInput style={[styles.inputContainer, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.inputInvalid : null]}
            value={this.state.controls.email.value}
            onChangeText={(val) => this.updateInputState('email', val)}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
          />
          <Text style={!this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Enter Valid Email Address</Text>


          <TextInput
            value={this.state.controls.password.value}
            onChangeText={(val) => this.updateInputState('password', val)}
            style={[styles.inputContainer, !this.state.controls.password.valid && this.state.controls.password.touched ? styles.inputInvalid : null]}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
          />


          <TouchableHighlight underlayColor='#e3d8dd'
            disabled={!(this.state.controls.email.valid && this.state.controls.password.valid)}
            style={!(this.state.controls.email.valid && this.state.controls.password.valid) ? {
              shadowColor: '#000',
              shadowOpacity: 50,
              elevation: 5,
              height: 45,
              backgroundColor: "gray",
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
              marginTop: 30,
              width: 160,
              borderRadius: 30,
            } : {
                shadowColor: '#000',
                shadowOpacity: 50,
                elevation: 5,
                height: 45,
                backgroundColor: this.state.themeColors.color, //////////////////////////////////////
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 30,
                width: 160,
                borderRadius: 30,
              }}

            onPress={() => { this.signIn() }}
          >
            <Text style={{ color: '#eee', fontSize: 20, fontWeight: '600' }}>Login</Text>
          </TouchableHighlight>



          <TouchableHighlight underlayColor='#e3d8dd' style={styles.btnsm} onPress={() => this.props.navigation.navigate('Signup')}  >
            <Text style={{ fontWeight: '500' }}>Create New Account</Text>
          </TouchableHighlight>

          {/* //////////////                Reset Password Model section           //////////////////////// */}

          <View style={{ marginTop: 5, }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              onBackdropPress={() => this.setModalVisible(!this.state.modalVisible)}
              style={{ backgroundColor: '#771' }}
            >
              <View style={{ marginTop: '0%', backgroundColor: '#ccc', height: '100%', }}>
                <View style={{ margin: 10 }}>

                  <Text>Enter Email Address</Text>
                  <View style={{ alignItems: 'center' }}>
                    <TextInput style={[styles.modelInputContainer, !this.state.controls.resetEmail.valid && this.state.controls.resetEmail.touched ? styles.inputInvalid : null]}
                      value={this.state.controls.resetEmail.value}
                      onChangeText={(val) => this.updateInputState('resetEmail', val)}
                      placeholder="Email"
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                    />

                    <Text style={!this.state.controls.resetEmail.valid && this.state.controls.resetEmail.touched ? styles.invalidResetEmail : styles.invalidResetEmailFalse} >Enter Valid Email Address</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight
                      underlayColor='#e3d8dd'
                      disabled={!(this.state.controls.resetEmail.valid)}
                      style={!(this.state.controls.resetEmail.valid) ? styles.modelButtonDisabled : {
                        shadowColor: '#000',
                        shadowOpacity: 50,
                        elevation: 5,
                        height: 45,
                        backgroundColor: this.state.themeColors.color, //////////////////////////////////////
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 30,
                        marginTop: 30,
                        width: 160,
                        borderRadius: 30,
                      }}
                      onPress={() => { this.sendEmail(); }}
                    >
                      <Text>Send</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      style={styles.modelButtonDisabled}>
                      <Text>Close</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableHighlight style={{ underlayColor: '#e3d8dd' }}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={{ fontSize: 14 }}>Fogot Password</Text>
            </TouchableHighlight>
          </View>


        </View>
      </View>




    );
  }
}
const styles = StyleSheet.create({
  icon: {
    margin: 5
  },
  con: {
    backgroundColor: '#EEEEEE',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },

  btnsm: {
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  btnReset: {
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold'
  },

  welcome: {

    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  welcome1: {

    margin: 40,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {

    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,
    height: 45,
    backgroundColor: 'blue', //////////////////////////////////////
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 200,
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
    marginBottom: 30,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
  },



  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  inputInvalid: {
    borderLeftColor: 'red',
    borderLeftWidth: 3,

  },

  invalidMsg:
  {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    color: 'red'
  },

  invalidMsgFalse: {

    color: "#EEEEEE",
    fontSize: 12
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
    marginBottom: 30,
    marginTop: 30,
    width: 140,
    borderRadius: 30,
    alignSelf: 'center'
  },
  modelInputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  invalidResetEmail:
  {
    fontSize: 12,
    // marginTop: -10,
    // marginBottom: 10,
    color: 'red'
  },

  invalidResetEmailFalse: {

    color: "#ccc",
    fontSize: 12
  },


});

export default LoginScreen;
