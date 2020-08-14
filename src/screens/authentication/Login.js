import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator,
    Keyboard
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";
import TopBar from '../../components/TopBar';

import { AuthenticationService } from '../../services/AuthenticationService';

const Login = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {


    }, [])

    const onPressLogin = () => {
        Keyboard.dismiss();
        setIsLoading(true);
        handleLogin()
    }

    async function handleLogin() {
        const params = {
            method: 'login',
            username,
            password
        }

        try {
            const response = await AuthenticationService.fetchApi(params);
            console.log('response login', response);
            setIsLoading(false);
            if('checkpoint_url' in response.result)
            {
                fetchCheckPoint();
                // navigation.push('OTP');
            }
            else
            {
                Alert.alert('Failed', 'Incorrect username or password!')
            }
        } catch(error){
            console.log('error login', error);
            Alert.alert('Error', 'Something went wrong!')
        }
    }

    async function fetchCheckPoint() {
        const params = {
            method: 'checkpoint',
        }

        try {
            const response = await AuthenticationService.fetchApi(params);
            console.log('response checkpoint', response);
            setIsLoading(false);
            // if('checkpoint_url' in response.result)
            // {
            //     navigation.push('OTP');
            // }
            // else
            // {
            //     Alert.alert('Failed', 'Incorrect username or password!')
            // }
        } catch(error){
            console.log('error login', error);
            Alert.alert('Error', 'Something went wrong!')
        }
    }

    const disabled = username == '' || password == '';
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.background}
                    barStyle="light-content"
                />
                {/* <ScrollView
                    style={{ width: "100%", flex: 1 }}
                    // contentContainerStyle={{ paddingBottom: PLAYER_HEIGHT }}
                    showsVerticalScrollIndicator={false}> */}
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 15
                }}>
                    <Image source={require('../../assets/icons/logo-ig.png')}
                        style={{ height: 70, width: 250, resizeMode: 'contain', marginBottom: 35 }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 5
                        // flex: 1,
                    }}>
                        <TextInput
                            style={{
                                flex: 1,
                                height: 50,
                                paddingHorizontal: 15,
                                borderColor: colors.lightGrey,
                                borderWidth: 1,
                                backgroundColor: colors.tabBar,
                                color: colors.text,
                                borderRadius: 5
                            }}
                            placeholder="Phone number, username or email"
                            placeholderTextColor={colors.lightGrey}
                            onChangeText={text => setUsername(text)}
                            value={username}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 5
                        // flex: 1,
                    }}>
                        <TextInput
                            style={{
                                flex: 1,
                                height: 50,
                                paddingHorizontal: 15,
                                borderColor: colors.lightGrey,
                                borderWidth: 1,
                                backgroundColor: colors.tabBar,
                                color: colors.text,
                                borderRadius: 5
                            }}
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor={colors.lightGrey}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 5
                        // flex: 1,
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                paddingHorizontal: 15,
                                marginTop: 35,
                                borderColor: colors.background,
                                // borderWidth: 1,
                                backgroundColor: disabled ? colors.inactive : colors.primary,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            disabled={disabled}
                            onPress={onPressLogin}
                        >
                            <Text style={{
                                color: colors.text
                            }}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {isLoading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color={colors.primary}/>
                    </View>
                }
                {/* </ScrollView> */}
            </View>

        </SafeAreaView>
    )
}

const MARGIN_BOTTOM = 38

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(86, 101, 115, 0.7)',
    },
    rowScrollContainer: { flexDirection: "row", marginLeft: 9 },
    centeredText: {
        alignSelf: "center",
        color: colors.text,
        fontWeight: "bold",
    },
    headerText: {
        fontSize: 18.5,
    },
    content: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginHorizontal: 15,
        marginBottom: MARGIN_BOTTOM,
    },
    albumText: {
        width: "94%",
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "normal",
        color: colors.grey,
        top: 10,
        fontSize: 13,
    },
})

const albumDimensions = {
    ROW_SCROLLVIEW_HEIGHT: 180,
    ALBUM_DIMEN_RECENT: 166 - MARGIN_BOTTOM,
    ALBUM_DIMEN_FEATURED: 156,
}

export default Login;
