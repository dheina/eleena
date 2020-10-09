import {Text, View, TouchableOpacity, Animated} from "react-native";
import React, {useRef, useEffect, useState} from "react";
import LottieView from 'lottie-react-native';

const Scene1Controller = function ({navigation}) {
    const animBg = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [animationDone, setAnimationDone] = useState(false);
    useEffect(() => {
        if(animationDone){
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
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
                source={require('../../../assets/anim/scene1-bg.json')}
                autoPlay
                loop={true}
            />
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
                }}
                resizeMode={'contain'}
                source={require('../../../assets/anim/scene1-anim.json')}
                onAnimationFinish={(isCanceled)=>{
                    if(!isCanceled){
                        animBg.current.play(2642,2874);
                        if(!animationDone){
                            setAnimationDone(true);
                        }
                    }
                }}
                autoPlay
                loop={false}
            />
            <Animated.View style={{
                opacity: fadeAnim,
                position: 'absolute',
                bottom:50,
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{navigation.navigate('happy');}}
                    style={{
                        backgroundColor: "#7897CB",
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 34,
                    }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#fff",
                        alignSelf: "center",
                    }}>Next</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default Scene1Controller;
