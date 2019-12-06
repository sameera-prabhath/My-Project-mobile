import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from 'react-redux';

export class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(1)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cartItems !== this.props.cartItems) {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        Animated.timing(this.state.opacity,
            {
                toValue: 0,
                duration: 50
            }).start(() => {
                setTimeout(() => {
                    this.endAnimation()
                }, 50);
            })
    }
    endAnimation() {
        Animated.timing(this.state.opacity,
            {
                toValue: 1,
                duration: 50
            }).start()
    }
    onPress = () => {
        this.props.navigation.navigate('Checkout');
    }
    render() {
        const { cartItems } = this.props;
        let animatedStyle = { opacity: this.state.opacity }
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <TouchableOpacity onPress={this.onPress}>
                    <View style={{
                        position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: 'rgba(95,197,123,0.8)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }} >  {(cartItems).length}</Text>
                    </View>
                    <Icon color="white" name="shopping-cart" size={30} />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },

})

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
});

export default connect(mapStateToProps)(Cart);























// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
//     Animated
// } from 'react-native';
// import { connect } from 'react-redux';

// export class Cart extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             opacity: new Animated.Value(1)
//         };
//     }
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.cartItems !== this.props.cartItems) {
//             this.startAnimation();
//         }
//     }
//     startAnimation() {
//         Animated.timing(this.state.opacity,
//             {
//                 toValue: 0,
//                 duration: 500
//             }).start(() => {
//                 setTimeout(() => {
//                     this.endAnimation()
//                 }, 100);
//             })
//     }
//     endAnimation() {
//         Animated.timing(this.state.opacity,
//             {
//                 toValue: 1,
//                 duration: 0
//             }).start()
//     }
//     onPress = () => {
//         this.props.navigation.navigate('Checkout');
//     }
//     render() {
//         const { cartItems } = this.props;
//         let animatedStyle = { opacity: this.state.opacity }
//         return (
//             <Animated.View style={[styles.container, animatedStyle]}>
//                 <TouchableOpacity onPress={this.onPress} style={{ flexDirection: 'row' }}>
//                     <Logo />
//                     <Text style={styles.cart}>  {(cartItems).length}</Text>

//                 </TouchableOpacity>
//             </Animated.View>
//         );
//     }
// }
// const mapStateToProps = (state) => ({
//     cartItems: state.cart.cart
// });
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         marginTop: 10,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     cart: {
//         color: 'black',
//         fontSize: 14,
//         marginTop: 0,
//         width:12
//     }
// })
// export default connect(
//     mapStateToProps
// )(Cart);
