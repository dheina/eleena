import React , {useEffect} from 'react';
import { BackHandler , Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import IntroController from "@app/containers/controller-intro";
import Scene1Controller from "@app/containers/controller-scene-1";
import HappyController from "@app/containers/controller-happy";
import CreditController from "@app/containers/controller-credit";
import SoundManager from '@utils/sound-manager';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default function App() {
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //
    //
    // }, []);
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();


    const backButtonPressed = () =>{
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });
        return true;
    }
    useEffect(() => {
        SoundManager.init();
        BackHandler.addEventListener('hardwareBackPress', backButtonPressed);
        return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, [])
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                console.log(`Scene : ${currentRouteName}`);
                if (previousRouteName !== currentRouteName) {
                    if(currentRouteName==='scene1'){
                        SoundManager.playRandom();
                    }else {
                        SoundManager.playKey(currentRouteName);
                    }
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='intro' component={IntroController}/>
                <Stack.Screen name='scene1' component={Scene1Controller}/>
                <Stack.Screen name='happy' component={HappyController}/>
                <Stack.Screen name='credit' component={CreditController}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
