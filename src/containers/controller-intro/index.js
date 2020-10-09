import { Text, View , Animated, TouchableOpacity, Image} from "react-native";
import React , { useRef, useEffect, useState } from "react";
import LottieView from 'lottie-react-native';

const IntroController = function IntroController({ navigation }) {
    const animBg = useRef(null);
    const animCake = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [animationDone, setAnimationDone] = useState(false);
    useEffect(() => {
        if(animationDone){
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    delay: 1500,
                    duration: 2000,
                    useNativeDriver:true,
                }
            ).start();
        }
    }, [animationDone]);
    return (
        <View style={{
            position:'absolute',
            width: '100%',
            height: '100%',
            backgroundColor:'#ffffff',
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
                    backgroundColor:'#ffffff',
                }}
                resizeMode={'cover'}
                source={require('../../../assets/anim/intro-bg.json')}
                onAnimationFinish={(isCanceled)=>{
                    if(!isCanceled){
                        animBg.current.play(50,250);
                        if(!animationDone){
                            setAnimationDone(true);
                        }
                    }
                }}
                autoPlay
                loop={false}
            />
            <View
            style={{
                position:'absolute',
                bottom:35
            }}>
                <View style={{flexDirection:'row', alignItems:'center', paddingBottom:3}}>
                    <Image
                        style={{width:20, height:20}}
                        source={require('../../../assets/images/headphone.png')}
                    ></Image>
                    <Text style={{ color: "#666c6f", fontSize:16, paddingLeft:5}}>Better With Headphones <Text style={{fontWeight:'bold'}}>ON</Text></Text>
                </View>
                <Text style={{
                    fontSize: 12,
                    color: "#666F72",
                    fontWeight:'200',
                    alignSelf: "center",
                }}>Copyright by dheina 2020</Text>
            </View>
            <View style={{
                position: 'absolute',
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <LottieView
                    ref={animCake}
                    style={{
                        width: 320,
                        height: 180,
                    }}
                    source={require('../../../assets/anim/intro-cake.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={(isCanceled)=>{
                        if(!isCanceled){
                            animCake.current.play(125,500);
                        }
                    }}
                />
                <View style={{height:20}}/>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{navigation.navigate('scene1');}}
                        style={{
                            backgroundColor: "#7FCEF2",
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 34
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: "#fff",
                            alignSelf: "center",
                        }}>Enter</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

export default IntroController;
