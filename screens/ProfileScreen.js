import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, TouchableHighlight } from "react-native";
import { Body, Container, Header, Icon, Left, Right, Text, Title, } from "native-base";
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"
import property from '../config'
import PreviousOrderScreen from './orders/PreviousOrderScreen'
import Icons from 'react-native-vector-icons/dist/FontAwesome'
import validate from "../utility/validation"

const apiGetThemes = `${property.BASE_URL}getTheme`;
const apiSendToken = `${property.BASE_URL}ecomuserprofile`;
const apiPostEdit = `${property.BASE_URL}editcus`;


class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: [],
      fullName: "",
      email: "",
      gender: '',
      themeColors: '',
      modalVisible1: false,
      modalVisible2: false,
      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
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
        },
        name: {
          value: "",
          valid: false,
          validationRules: {
            req: true
          },
          touched: false

        },
      }
    };
  }

  componentDidMount() {

    this.getToken().then(res => this.sendTokenToServer(res))

    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      // alert(JSON.stringify(data))
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });
  }

  //////////////////////////////////////////////////////////////////////////////////

  getToken = async () => {
    const Token = await AsyncStorage.getItem('token')
    this.setState({ Token: Token })           //    work
    return Token
  };


  sendTokenToServer = (token) => {

    const Token = 'Bearer ' + token;
    //  alert(Token)
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': Token
    }


    axios.get(apiSendToken, { headers: headers }).then((response) => {

      const data = response.data.Customer
      this.setState({ userDetails: data })
    })
      .catch((error) => {
        console.log("axios error:", error);
      });
  }


  ////////////////////////////////////////////////////////////////////////////////////////


  setModalVisible1(visible) {
    this.setState({ modalVisible1: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }


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

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  saveName = (token) => {
    const Token = 'Bearer ' + token;
    //  alert(Token)
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': Token
    }


    axios
      .post(apiPostEdit, {
        name: this.state.controls.name.value,
        email: this.state.userDetails.email

      }, { headers: headers })
      .then(res => {
        if (res.status === 200) {
          // alert('namesssssssss')
          this.getToken().then(res => this.sendTokenToServer(res))
        } else {
          alert("Error")
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      });


  }



  saveEmail = (token) => {
    const Token = 'Bearer ' + token;
    //  alert(Token)
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': Token
    }

    axios
      .post(apiPostEdit, {
        name: this.state.userDetails.name,
        email: this.state.controls.resetEmail.value

      }, { headers: headers })
      .then(res => {
        if (res.status === 200) {
          // alert('emailsssssssss')
          this.getToken().then(res => this.sendTokenToServer(res))
        } else {
          alert("Error")
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      });

  }



  ///////////////////////////////////////////////////////////////////////////////////////////////


  renderNameModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible1}
        onRequestClose={() => {
          this.setModalVisible1(!this.state.modalVisible1);
        }}
        onBackdropPress={() => this.setModalVisible1(!this.state.modalVisible1)}
      >
        <View style={{ marginTop: '2%', backgroundColor: '#ccc', height: 'auto', }}>
          <View style={{ margin: 10 }}>

            <Text>Enter New Name</Text>
            <View style={{ alignItems: 'center', }}>
              <TextInput style={[styles.modelInputContainer, !this.state.controls.name.valid && this.state.controls.name.touched ? styles.inputInvalid : null]}
                value={this.state.controls.name.value}
                onChangeText={(val) => this.updateInputState('name', val)}
                placeholder={this.state.userDetails.name}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
              />

              <Text style={!this.state.controls.name.valid && this.state.controls.name.touched ? styles.invalidResetEmail : styles.invalidResetEmailFalse} >Enter Name</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableHighlight
                underlayColor='#e3d8dd'
                disabled={!(this.state.controls.name.valid)}
                style={!(this.state.controls.name.valid) ? styles.modelButtonDisabled : {
                  shadowColor: '#000',
                  shadowOpacity: 50,
                  elevation: 5,
                  height: 45,
                  backgroundColor: this.state.themeColors.color,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30,
                  marginTop: 30,
                  width: 160,
                  borderRadius: 30,
                }}
                onPress={() => { this.getToken().then(res => this.saveName(res)), this.setModalVisible1(false) }}
              >
                <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible1(!this.state.modalVisible1);
                }}
                style={styles.modelButtonDisabled}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal >
    )
  }


  renderEmailModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible2}
        onRequestClose={() => {
          this.setModalVisible2(!this.state.modalVisible2);
        }}
        onBackdropPress={() => this.setModalVisible2(!this.state.modalVisible2)}
      >
        <View style={{ marginTop: '2%', backgroundColor: '#ccc', height: 'auto', }}>
          <View style={{ margin: 10 }}>

            <Text>Enter Email Address</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={[styles.modelInputContainer, !this.state.controls.resetEmail.valid && this.state.controls.resetEmail.touched ? styles.inputInvalid : null]}
                value={this.state.controls.resetEmail.value}
                onChangeText={(val) => this.updateInputState('resetEmail', val)}
                placeholder={this.state.userDetails.email}
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
                  backgroundColor: this.state.themeColors.color,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30,
                  marginTop: 30,
                  width: 160,
                  borderRadius: 30,
                }}
                onPress={() => { this.getToken().then(res => this.saveEmail(res)), this.setModalVisible2(false) }}
              >
                <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible2(!this.state.modalVisible2);
                }}
                style={styles.modelButtonDisabled}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    )
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////

  renderHeaderIcon = () => {

    const { navigation } = this.props

    if (this.state.themeColors.theme === 'theme1') {
      return (
        <Icon name="arrow-back" style={{ color: 'white' }}
          onPress={() => navigation.navigate('Dashboard1')} />
      )
    }
    else if (this.state.themeColors.theme === 'theme2') {
      return (
        <Icon name="arrow-back" style={{ color: 'white' }}
          onPress={() => navigation.navigate('Dashboard2')} />
      )
    }
    else if (this.state.themeColors.theme === 'theme3') {
      return (
        <Icon name="arrow-back" style={{ color: 'white' }}
          onPress={() => navigation.navigate('Dashboard3')} />
      )
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { navigation } = this.props
    return (
      <Container>

        <Header style={{ backgroundColor: this.state.themeColors.color }}>
          <Left>
            {this.renderHeaderIcon()}
          </Left>
          <Body>
            <Title> User Profile </Title>
          </Body>
          <Right>
          </Right>
        </Header>



        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.fullView}>

            <View style={styles.imageView}>
              <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('EditProPic')}
              >
                <Image
                  style={styles.image}
                  source={require("../app/assets/images/profile.png")}
                />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', width: '100%', marginLeft: 10, }}>
                <Text style={styles.textName}> {this.state.userDetails.name} </Text>
                <Icons
                  style={{ marginTop: 10, marginLeft: 10 }}
                  name='pencil'
                  size={18}
                  onPress={() => { this.setModalVisible1(true) }}
                />
              </View>
              {this.renderNameModal()}


              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={styles.textEmail}> {this.state.userDetails.email}</Text>
                <Icons
                  style={{ marginTop: 10, marginLeft: 20 }}
                  name='pencil'
                  size={18}
                  onPress={() => { this.setModalVisible2(true) }}
                />
              </View>
              {this.renderEmailModal()}

            </View>

            <View style={styles.barView}>
              <Text style={styles.barViewText}> previous order Details </Text>
            </View>
          </View>
          <PreviousOrderScreen navigation={navigation} Token={this.state.Token}></PreviousOrderScreen>

        </ScrollView>
      </Container>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({

  infomation: {
    flexDirection: 'row',
    width: '95%',
    paddingVertical: 20,
    fontSize: 16,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: 'space-evenly',
    margin: 10,
    // borderColor: "#ccc",

  },
  textName: {
    marginVertical: 5,
    marginLeft: 75,
    fontSize: 22,
    fontWeight: '400'
  },
  textEmail: {
    marginVertical: 15,
    fontSize: 15,
    fontWeight: '300'
  },
  imageView: {
    width: "100%",
    borderWidth: 10,
    borderColor: '#ddd',
    backgroundColor: "#ddd",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 15
  },
  image: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 150,
    alignSelf: 'center',
    width: 220,
    height: 220,
  },
  fullView: {
    alignItems: "center",
    flex: 1
  },
  barViewText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '800'
  },
  barView: {
    width: '99%',
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: '#77d',
    paddingTop: 8,
    marginHorizontal: 5
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
  invalidResetEmail:
  {
    fontSize: 12,
    color: 'red'
  },
  invalidResetEmailFalse: {

    color: "#ccc",
    fontSize: 12
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
});






















// import React, { Component } from "react";
// import { View, Image, FlatList,TouchableOpacity } from "react-native";
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Text, ListItem, Left, Body, Right, Title, Card, CardItem } from "native-base";

// class ProfileScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [
//         { name: "Preferences", header: false },
//         { name: "Account", header: false },
//         { name: "Help Center", header: false },
//       ],
//       userData: [],
//       stickyHeaderIndices: [],
//       fname: "",
//       lname: "",
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/auth/user/me")
//       .then(res => {
//         axios
//           .get("/users/" + res.data.id)
//           .then(res => {
//             console.log("Users : ");
//             console.log(res.data);
//             this.setState({
//               fname: res.data.fname,
//               lname: res.data.lname ? res.data.lname : "",
//             });
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => {
//         console.log(err);
//         throw err;
//       });
//   }

//   renderItem = ({ item }) => {
//     if (item.header) {
//       return (
//         <ListItem itemDivider>
//           <Left />
//           <Body style={{ marginRight: 40 }}>
//             <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//           </Body>
//           <Right />
//         </ListItem>
//       );
//     } else if (!item.header) {
//       return (
//         <ListItem style={{ marginLeft: 0 }}>
//           <Body>
//             <Text>{item.name}</Text>
//           </Body>
//         </ListItem>
//       );
//     }
//   };

//   render() {
//     return (
//       <View>
//         <View
//           style={{
//             width: "100%",
//             backgroundColor: "#ab0a80",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditProPic')}>
//           <Image
//             style={{
//               borderWidth: 5,
//               borderColor: "white",
//               borderRadius: 100,
//               margin: 10,
//               marginLeft: 10,
//               width: 80,
//               height: 80,
//             }}
//             source={{ uri: "https://www.gstatic.com/webp/gallery3/1.sm.png" }}
//           />
// </TouchableOpacity>
//           <Text style={{ fontSize: 30, color: "white" }}>
//             {this.state.fname + " " + this.state.lname}
//           </Text>
//         </View>
//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="contacts" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Contact</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="work" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Work</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="school" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Education</Text>
//             </Body>
//           </CardItem>
//         </Card>
//         {/* <FlatList
//                style={{marginTop: "40%"}}
//         data={this.state.data}
//         renderItem={this.renderItem}
//         keyExtractor={item => item.name}
//         stickyHeaderIndices={this.state.stickyHeaderIndices}
//       /> */}
//       </View>
//     );
//   }
// }

// export default ProfileScreen;
