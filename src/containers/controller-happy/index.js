import {Text, View, TouchableOpacity, Animated} from "react-native";
import React , { useRef, useEffect } from "react";
import LottieView from 'lottie-react-native';

const HappyController = function IntroController({ navigation }) {
    const animBg = useRef(null);
    const animEleena= useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    delay: 1500,
                    useNativeDriver:true,
                }
            ).start();
    }, [fadeAnim]);
    return (
        <View style={{
            position:'absolute',
            width: '100%',
            height: '100%',
            backgroundColor:'#DCF4FF',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <LottieView
                ref={animBg}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent:'center',
                    alignItems: 'center',
                    backgroundColor:'#DCF4FF',
                }}
                resizeMode={'cover'}
                source={require('../../../assets/anim/happy-bg.json')}
                autoPlay
                loop={true}
            />
            <View
                style={{
                    position: 'absolute',
                    justifyContent:'center',
                    alignItems: 'center'
                }}>
                <LottieView
                    ref={animBg}
                    style={{
                        width: 300,
                        height: 230,
                    }}
                    resizeMode={'contain'}
                    source={require('../../../assets/anim/happy-text.json')}
                    autoPlay
                    loop={true}
                />
                <LottieView
                    ref={animEleena}
                    style={{
                        width: 260,
                    }}
                    resizeMode={'contain'}
                    source={require('../../../assets/anim/happy-eleena.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={(isCanceled)=>{
                        if(!isCanceled){
                            animEleena.current.play(54,125);
                        }
                    }}
                />
                <View style={{height:20}}></View>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{navigation.navigate('credit');}}
                        style={{
                            backgroundColor: "#E2848F",
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 34
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: "#fff",
                            alignSelf: "center",
                        }}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Text style={{
                    paddingTop:30,
                    fontSize:16,
                    width:240,
                    textAlign:'center',
                    fontWeight:'300',
                    color:'#ffffff'
                }}>
                    I hope all your birthday wishes and dreams come true
                </Text>
            </View>
        </View>
    );
}

export default HappyController;
