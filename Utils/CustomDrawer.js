
// import React, { Component } from 'react';
// import { NavigationActions } from 'react-navigation';
// import { Text, View, StyleSheet, ImageBackground } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import axios from 'axios'
// import AsyncStorage from "@react-native-community/async-storage"

// export default class drawerContentComponents extends Component {

//     state = {
//         fname: "",
//         lname: ""
//     }

//     navigateToScreen = (route) => (
//         () => {
//             const navigateAction = NavigationActions.navigate({
//                 routeName: route
//             });
//             this.props.navigation.dispatch(navigateAction);
//         })

//     componentDidMount() {
//         axios.get("/auth/user/me")
//             .then(res => {
//                 axios.get('/users/' + res.data.id).then(res => {
//                     console.log("Users : ")
//                     console.log(res.data)
//                     this.setState({ fname: res.data.fname, lname: res.data.lname ? res.data.lname : "" })
//                 }).catch(err => console.log(err))

//             })
//             .catch(err => { console.log(err); throw err });
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.headerContainer}>
//                     <Text style={styles.headerText}>{this.state.fname + " " + this.state.lname}Welcome</Text>
//                     {/* <ImageBackground source={{uri: "https://source.unsplash.com/featured/?morning,light"}} style={{flex: 1, width: 280,justifyContent: 'center'}} >
//                     <Text style={styles.headerText}>Pavindu Lakshan</Text>
//                 </ImageBackground> */}

//                 </View>
//                 <View style={styles.screenContainer}>
//                     <View style={[styles.screenStyle, (this.props.activeItemKey == 'Dashboard1') ? styles.activeBackgroundColor : null]}>
//                         <Icon name="home" size={30} style={{ width: 50 }} />
//                         <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'Dashboard1') ? styles.selectedTextStyle : null]}
//                             onPress={this.navigateToScreen('Dashboard1')}>Home</Text>
//                     </View>
//                     <View style={[styles.screenStyle, (this.props.activeItemKey == 'Profile') ? styles.activeBackgroundColor : null]}>
//                         <Icon name="user" size={30} style={{ width: 50 }} />
//                         <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'Profile') ? styles.selectedTextStyle : null]}
//                             onPress={this.navigateToScreen('Profile')}>Profile</Text>
//                     </View>

//                 </View>
//                 <View style={styles.LogOut}>
//                     <Icon name="home" size={30} style={{ width: 50 }} />
//                     <Text style={styles.screenTextStyle2} onPress={() => {

//                         AsyncStorage.removeItem('token')
//                         AsyncStorage.removeItem('loginUserId')
//                         this.props.navigation.navigate('LoginScreen');
//                     }}
//                     >Logout</Text>
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//     },
//     headerContainer: {
//         height: 100,
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignContent: "center",
//         backgroundColor: '#ab26'
//     },
//     headerText: {
//         paddingTop: 30,
//         fontSize: 30,
//         color: '#242320',
//     },
//     screenContainer: {
//         width: '100%'
//     },
//     screenStyle: {
//         height: 30,
//         padding: 25,
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%'
//     },
//     LogOut: {
//         //      borderTopColor:'black',
//         //      borderTopWidth:1,
//         marginTop: '130%',
//         height: 30,
//         padding: 25,
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%'

//     },
//     screenTextStyle: {
//         fontSize: 20,
//         marginLeft: 20,
//         textAlign: 'center'
//     },
//     screenTextStyle2: {
//         fontSize: 20,
//         marginLeft: 20,
//         textAlign: 'center',
//         fontWeight: 'bold',
//         color: 'black'
//     },
//     selectedTextStyle: {
//         fontWeight: 'bold',
//         color: 'black'
//     },
//     activeBackgroundColor: {
//         backgroundColor: 'red',
//     }
// });

