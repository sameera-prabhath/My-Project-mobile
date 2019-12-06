import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import { Spinner } from 'native-base';
import axios from "axios"
import property from '../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;
const apiGetLoadingTheme = `${property.BASE_URL}getloadpage`


class CheckAuth extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    theme: '',
    loadingTheme: ''

  }
  componentDidMount = () => {
    this.renderLoadingTheme();
    // this._bootstrapAsync();   //        this line should be remove             

    this.abc().then(res => {
      this.setState({ theme: res })
      this._bootstrapAsync();              //   uncomment to view loading screen
    })
  }

  static navigationOptions = () => {
    return {
      header: null,
    }
  }

  abc = async () => {
    const res = await axios.get(apiGetThemes);
    let data = res.data;
    return data.theme

  };

  renderLoadingTheme = () => {
    axios.get(apiGetLoadingTheme).then(res => {
      const data = res.data;
      this.setState({ loadingTheme: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });
  };


  _bootstrapAsync = async () => {

    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {

      if (this.state.theme == "theme1") {
        this.props.navigation.navigate('Dashboard1');
      }
      if (this.state.theme == "theme2") {
        this.props.navigation.navigate('Dashboard2');
      }
      if (this.state.theme == "theme3") {
        this.props.navigation.navigate('Dashboard3');
      }
    }

    else {
      await AsyncStorage.removeItem('token')
      this.props.navigation.navigate('LoginScreen');
    }

  }

  render() {
    return (
      <ImageBackground source={{ uri: `${property.BASE_URL}imgs/${this.state.loadingTheme.imgName}` }} style={{ width: '100%', height: '100%' }}>


        <View style={{ display: "flex", marginTop: 200, alignItems: "center", justifyContent: "center" }}>

          <Text style={{ fontSize: 40, color: this.state.loadingTheme.color, marginTop: -30, fontWeight: 'bold', padding: 30 }}> {this.state.loadingTheme.title}</Text>

          <Text style={{ marginTop: -30, }}></Text>
          <Spinner size='large' color='#252626' />

          <Text style={{ fontSize: 16, color: '#252626' }}

          >Loading</Text>
        </View>

      </ImageBackground>
    );
  }
}

export default CheckAuth;
