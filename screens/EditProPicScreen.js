import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text, Container, Header, Left, Body, Right, Title, Icon, } from "native-base";
import axios from "axios"
import property from '../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;
const apiSendToken = `${property.BASE_URL}ecomuserprofile`


class EditProPicScreen extends Component {
  state = {
    themeColors: '',
  }

  componentDidMount = () => {
    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });
  }




  //   renderHeaderIcon = () => {

  //     if (this.state.themeColors.theme === 'theme1') {
  //         return (

  //             <Icon name="arrow-back" style={{ color: 'white' }}
  //                 onPress={() => this.props.navigation.navigate('Dashboard')} />

  //         )
  //     }
  //     else if (this.state.themeColors.theme === 'theme2') {
  //         return (

  //             <Icon name="arrow-back" style={{ color: 'white' }}
  //                 onPress={() => this.props.navigation.navigate('Dashboard2')} />

  //         )
  //     }
  //     else if (this.state.themeColors.theme === 'theme3') {
  //         return (

  //             <Icon name="arrow-back" style={{ color: 'white' }}
  //                 onPress={() => this.props.navigation.navigate('Dashboard3')} />

  //         )
  //     }
  // }

  render() {
    return (
      <Container id="parentView" style={{ flex: 1 }}>
        <Header style={{ backgroundColor: this.state.themeColors.color }}>
          <Left>
            <Icon name="arrow-back" style={{ color: 'white' }}
              onPress={() => this.props.navigation.navigate('Profile')} />
          </Left>
          <Body>
            <Title> Brows Image </Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>name</Text>
          </View>
          <View>
            <TouchableOpacity
              // onPress={() => { this.addItemsToCart() }}
              style={{ justifyContent: 'center', paddingTop: 10, paddingRight: 15 }}
            >
              <Icon
                style={{
                  width: 50, height: 50, backgroundColor: 'white',
                  alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center'
                }}
                name='cart-plus'
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

  text: {
    marginVertical: 10,
    fontSize: 25,
    fontWeight: '600'
  },
  image: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 100,
    marginTop: 30,
    width: 200,
    height: 200,
  }
});




export default EditProPicScreen;
