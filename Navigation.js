import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from "./src/theme";
import UIHelper from "./src/helpers/UIHelper"

import Home from './src/screens/home/Home';
import Favorite from './src/screens/favorite/Favorite';

const BAR_HEIGHT = UIHelper.isIphoneX() ? 78 : 58

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () =>
{
    useEffect(() => {
    
    }, [])
    
    return(
        <Main/>
    )
}

const Main = ({  }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    style: {
                        backgroundColor: colors.tabBar,
                        padding: 2,
                        height: BAR_HEIGHT,
                        borderTopColor: colors.background,
                        // borderTopWidth: 0,
                        // backgroundColor: '#FCF6EE'
                    },
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.itemInactive,
                    labelStyle: {
                        fontSize: 11,
                        marginBottom:5
                    }
                }}
            >
                <Tab.Screen name="Home" component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon name={ focused ? 'home' : 'home-outline'}  size={25} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen name="Favorite" component={Favorite}
                    options={{
                        tabBarLabel: 'Favorite',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon name={focused ? 'heart' : 'heart-outline'} size={25} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;