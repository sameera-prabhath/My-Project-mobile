import React from "react";
import { View, Text, ScrollView, FlatList, Alert, StyleSheet, Picker, TextInput, TouchableHighlight } from "react-native";
import axios from "react-native-axios";
import validate from "../utility/validation"
import property from '../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;
const apiPostRegistorCustomer = `${property.BASE_URL}regcus`;
const apiPostSendMail = `${property.BASE_URL}signupemailmgs`;


export default class Signup extends React.Component {
  static navigationOptions = {
    drawerLabel: "Signup",
  };


  static navigationOptions = () => {
    return {

      headerTitle: 'SIGNUP',

      headerTitleStyle: { textAlign: 'center', marginLeft: -30, flexGrow: 1, alignSelf: 'center', },

    }
  }


  state = {
    errmsg: null,
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
      gender: {
        value: "",
        valid: false,
        validationRules: {
          req: true
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
  };



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
    });
  };
  /////////////////////////////////////////////////////////////////////////////////////////

  signUp = () => {

    axios
      .post(apiPostRegistorCustomer, {
        name: this.state.controls.name.value,
        email: this.state.controls.email.value,
        gender: this.state.controls.gender.value,
        password: this.state.controls.password.value

      })
      .then(res => {
        if (res.status === 200) {
          this.sendtSuccessMessage()
          this.props.navigation.navigate('LoginScreen')
          // Alert.alert(
          //   "Done",
          //   "Create Successfully"
          // )
        }
        if (res.status === 201) {

          Alert.alert(
            "Oops",
            res.data.msg
          )
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  sendtSuccessMessage = () => {
    // alert("sign up")
    axios.post(apiPostSendMail, {
      email: this.state.controls.email.value
    })
      .then(res => {
        Alert.alert(
          'Create Account',
          JSON.stringify(res.data.message),
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },

          ],
          { cancelable: true },
        );

      })
      .catch(err => {
        console.log();
        throw err;
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <View style={styles.container}>


        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.container}>



            <TextInput
              style={[styles.inputContainer, !this.state.controls.name.valid && this.state.controls.name.touched ? styles.inputInvalid : null]}

              onChangeText={(val) => this.updateInputState('name', val)}
              placeholder="Name"
              underlineColorAndroid='transparent'
            />
            <Text style={!this.state.controls.name.valid && this.state.controls.name.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Name Is Requred</Text>

            <TextInput
              style={[styles.inputContainer, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.inputInvalid : null]}
              value={this.state.controls.email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
            />
            <Text style={!this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Enter Valid Email Address</Text>



            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              borderBottomColor: '#F5FCFF',
              borderRadius: 10,

              width: 300,
              height: 45,
              marginTop: 12,
              alignItems: 'center',
              margin: 2,

              padding: 10
            }} >
              <View style={{
                borderBottomColor: '#F5FCFF',
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                width: 300,
                height: 45,
                marginLeft: -10,
                flexDirection: 'row',
                alignItems: 'center',

                padding: 10
              }}>
                <Picker
                  selectedValue={this.state.controls.gender.value}
                  onValueChange={(itemValue, itemIndex) => this.updateInputState('gender', itemValue)}
                  style={styles.pickerContainer}
                  value={this.state.controls.gender.value}
                >
                  <Picker.Item color='gray' label='Gender' />
                  <Picker.Item label='Male' value='male' />
                  <Picker.Item label='Female' value='female' />
                  <Picker.Item label='Other' value='other' />
                </Picker>
              </View>
            </View>
            <Text style={!this.state.controls.gender.valid && this.state.controls.gender.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Select The Gender</Text>


            <TextInput
              value={this.state.controls.password.value}
              onChangeText={(val) => this.updateInputState('password', val)}
              style={[styles.inputContainer, !this.state.controls.password.valid && this.state.controls.password.touched ? styles.inputInvalid : null]}
              placeholder="Password"
              secureTextEntry={true}

              underlineColorAndroid='transparent'
            />
            <Text style={!this.state.controls.password.valid && this.state.controls.password.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Enter Strong Password</Text>


            <TextInput
              value={this.state.controls.confirmPassword.value}
              onChangeText={(val) => this.updateInputState('confirmPassword', val)}
              style={[styles.inputContainer, !this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ? styles.inputInvalid : null]}
              placeholder="Re-Enter Password"
              secureTextEntry={true}

              underlineColorAndroid='transparent'

            />
            <Text style={!this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Confirm Password Dose not Match</Text>


            <TouchableHighlight underlayColor='#e3d8dd'
              disabled={!(this.state.controls.name.valid && this.state.controls.email.valid && this.state.controls.gender.valid && this.state.controls.password.valid && this.state.controls.confirmPassword.valid)}
              style={!(this.state.controls.name.valid && this.state.controls.email.valid && this.state.controls.gender.valid && this.state.controls.password.valid && this.state.controls.confirmPassword.valid) ? styles.buttonDisable : styles.buttonContainer}
              onPress={() => { this.signUp() }}>

              <Text style={{ color: '#eee', fontSize: 18, fontWeight: '600' }}>Sign Up</Text>
            </TouchableHighlight>




            <TouchableHighlight underlayColor='#e3d8dd' style={styles.btnsm} onPress={() => this.props.navigation.navigate('LoginScreen')}  >
              <Text>Login</Text>
            </TouchableHighlight>


          </View>



        </ScrollView>
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

  btnsm: {
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 13,
    alignItems: 'center',
  },

  pickerContainer: {

    width: 150,
    height: 45,

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
  inputInvalid: {
    borderLeftColor: 'red',
    borderLeftWidth: 3,
  },
  invalidMsg: {
    fontSize: 12,
    color: 'red'
  },

  invalidMsgFalse: {
    color: "#EEEEEE",
    fontSize: 12
  }


});
