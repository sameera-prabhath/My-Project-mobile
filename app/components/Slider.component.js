// import React, { Component } from 'react';
// import { StyleSheet, View, Platform, } from 'react-native';
// import Slideshow from 'react-native-slideshow';
// import PropTypes from 'prop-types';
// import axios from "axios";
// import property from '../../config'
// // import { SliderBox } from 'react-native-image-slider-box';

// const apiGetSliderProps = `${property.BASE_URL}getsimg`;


// export default class Slider extends Component {
//     constructor() {
//         super();
//         this.state = {
//             position: 1,
//             interval: null,
//             dataArray: [],
//             dataProps: [],
//             dataSource: [
//                 {
//                     title: 'Title 1',
//                     caption: 'Caption 1',
//                     url: 'https://source.unsplash.com/1024x768/?water',
//                 }, {
//                     title: 'Title 2',
//                     caption: 'Caption 2',
//                     url: 'https://source.unsplash.com/1024x768/?nature',
//                 }, {
//                     title: 'Title 3',
//                     caption: 'Caption 3',
//                     url: 'https://source.unsplash.com/1024x768/?girl',
//                 },
//             ],
//         };
//     }
//     componentWillMount() {
//         this.setState({
//             interval: setInterval(() => {
//                 this.setState({
//                     position: this.state.position === this.state.dataArray.length ? 0 : this.state.position + 1
//                 });
//             }, 3000)
//         });

//         this.renderPropsFromServer().then(res => {
//             this.renderSliderProps(res);
//         })

//     }

//     componentWillUnmount() {
//         clearInterval(this.state.interval);

//         this.renderPropsFromServer().then(res => {
//             this.renderSliderProps(res);
//         })
//     }

//     ////////////////////////////////////////////////////////////

//     renderPropsFromServer = async () => {
//         const res = await axios.get(apiGetSliderProps);
//         return res.data
//     }

//     renderSliderProps = (res) => {

//         const dataArrays = []
//         // alert(JSON.stringify(res) + 'there are renderSliderProps')                 
//         this.setState({ dataProps: res })
//         const data = this.state.dataProps
//         // alert(JSON.stringify(data))

//         for (i = 0; i < data.length; i++) {
//             const newObj = {                                                            // Change your required detail here
//                 url: `${property.BASE_URL}imgs/${this.state.dataProps[i].img}`,
//                 title: this.state.dataProps[i].title,
//                 caption: this.state.dataProps[i].description
//             }
//             dataArrays.push(newObj);
//             // alert(JSON.stringify(dataArrays)+"ssssssssssssss")
//         }
//         this.setState({ dataArray: dataArrays })
//     }

//     /////////////////////////////////////////////////////////////////

//     render() {
//         // const images = sliderProps.imagesArray;
//         return (
//             <View style={styles.MainContainer}>
//                 <Slideshow
//                     dataSource={this.state.dataSource}
//                     position={this.state.position}
//                     onPositionChanged={position => this.setState({ position })}

//                 />
//                 {/* <SliderBox
//                     images={this.state.dataArray}
//                     onCurrentImagePressed={index =>
//                         console.warn(`image ${index} pressed`)
//                     }
//                 /> */}
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     MainContainer: {
//         flex: 1,
//         alignItems: 'center',
//         paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
//         backgroundColor: '#FFF8E1',
//         height: 100
//     }
// });







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import axios from "axios";
import property from '../../config'
import { Slider } from 'react-native-elements';

const apiGetSliderProps = `${property.BASE_URL}getsimg`;



export default class Sliders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            interval: null,
            dataArray: [],
            dataProps: [],

        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    index: this.state.index === this.state.dataArray.length ? 0 : this.state.index + 1
                });
            }, 3000)
        });

        this.renderPropsFromServer().then(res => {
            this.renderSliderProps(res);
        })

    }

    componentWillUnmount() {
        clearInterval(this.state.interval);

        this.renderPropsFromServer().then(res => {
            this.renderSliderProps(res);
        })
    }

    renderIndex = () => {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    index: this.state.index === this.state.dataArray.length ? 0 : this.state.index + 1
                });
            }, 3000)

        });
    }
    ////////////////////////////////////////////////////////////

    renderPropsFromServer = async () => {
        const res = await axios.get(apiGetSliderProps);
        return res.data
    }

    renderSliderProps = (res) => {

        const dataArrays = []
        this.setState({ dataProps: res })
        const data = this.state.dataProps

        for (i = 0; i < data.length; i++) {
            // const newObj = {                                                            // Change your required detail here
            //     url: `${property.BASE_URL}imgs/${this.state.dataProps[i].img}`,
            //     // title: this.state.dataProps[i].title,
            //     // caption: this.state.dataProps[i].description
            // }
            dataArrays.push(`${property.BASE_URL}imgs/${this.state.dataProps[i].img}`);
        }
        this.setState({ dataArray: dataArrays })
    }



    render() {
        return (
            <View style={styles.container}>
                <SliderBox
                    images={this.state.dataArray}
                    sliderBoxHeight={150}
                    index={this.state.index}
                    onPositionChanged={position => this.setState({ position })}
                    onCurrentImagePressed={index =>
                        this.renderIndex()
                    }
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    circleLoop
                />
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#239'
    }
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


