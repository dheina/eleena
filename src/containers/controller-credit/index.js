import {Text, View, TouchableOpacity, Image, Animated} from "react-native";
import React , {useRef, useState, useEffect} from "react";
import LottieView from 'lottie-react-native';

const CreditController = ({navigation})=>{
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
            backgroundColor:'#4A556A',
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
                }}
                resizeMode={'cover'}
                source={require('../../../assets/anim/ending-bg.json')}
                onAnimationFinish={(isCanceled)=>{
                    if(!isCanceled){
                        animBg.current.play(125,500);
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
                <Text style={{
                    fontSize: 16,
                    color: "#A9BAD8",
                    fontWeight:'300',
                    alignSelf: "center",
                }}>Made with <Text style={{color:'#B94F4F'}}>♥</Text> in Kuala Lumpur</Text>
                <Text style={{
                    fontSize: 12,
                    color: "#8D9EBA",
                    fontWeight:'200',
                    alignSelf: "center",
                }}>Copyright by dheina 2020</Text>
            </View>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    position: 'absolute',
                    justifyContent:'center',
                    alignItems: 'center',
                    paddingTop:40,
                }}>
                <View style={{
                    backgroundColor: '#445065',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 24,
                }}>
                    <Text style={{
                        fontSize:16,
                        textAlign:'center',
                        fontWeight:'300',
                        color:'#D8DDE8',
                    }}>
                        Thanks for Watching
                    </Text>
                </View>
                <View style={{height:20}}></View>
                <Image
                    style={{width:200, height:111}}
                    source={require('../../../assets/images/the-end.png')}
                ></Image>
                <Text style={{
                    fontSize:14,
                    textAlign:'center',
                    fontWeight:'300',
                    color:'#B4C1D8',
                    paddingTop: 20,
                    paddingBottom:20,
                    paddingHorizontal: 30
                }}>
                    May your day be filled with joy, wonderful gifts and goodies Maryam.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{navigation.navigate('intro');}}
                    style={{
                        backgroundColor: "#D66CB1",
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 34
                    }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#fff",
                        alignSelf: "center",
                    }}>Back to Main</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default CreditController;
