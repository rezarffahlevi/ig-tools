import React, { useState, useEffect, useCallback } from "react";
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
import AsyncStorage from '@react-native-community/async-storage'
import { colors, fontsFamilys } from "../../theme";
import TopBar from '../../components/TopBar';
import { CONSTANT } from '../../helpers/constant'
import { fetchApi, postApi } from '../../services/Api';

const Login = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});

    const props = route.params;

    useEffect(() => {
        // console.log(navigation, route)
        

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
            const response = await fetchApi(params);
            const result = response.data.result;
            // console.log('response login', response);
            if(result.authenticated)
            {
                let session = {
                    username,
                    ig_did: response.data.ig_did,
                    useragent: response.data.useragent,
                    csrftoken: response.data.csrftoken,
                    mid: response.data.mid,
                    ipuser: response.data.ipuser,
                    choice: 0,
                }
                await AsyncStorage.setItem(CONSTANT.KEY_SESSION_ID, response.data.sessionid);
                await AsyncStorage.setItem(CONSTANT.KEY_SESSION, JSON.stringify(session));
                props.setIsLogin(true);
            }
            else if('checkpoint_url' in result)
            {
                let session = {
                    checkpoint_url: result.checkpoint_url,
                    username,
                    ig_did: response.data.ig_did,
                    useragent: response.data.useragent,
                    csrftoken: response.data.csrftoken,
                    mid: response.data.mid,
                    ipuser: response.data.ipuser,
                    choice: 0,
                }
                fetchCheckPoint(session);
                await AsyncStorage.setItem(CONSTANT.KEY_SESSION, JSON.stringify(session));
            }
            else
            {
                Alert.alert('Failed', 'Incorrect username or password!')
                setIsLoading(false);
            }
        } catch(error){
            setIsLoading(false);
            console.log('error login', error);
            Alert.alert('Error', 'Something went wrong!')
        }
    }

    async function fetchCheckPoint(session) {
        const method = {
            method: 'checkpoint'
        }
        try {
            const response = await postApi(method, session);
            // console.log('response checkpoint', response);
            if(response)
            {
                setIsLoading(false);
                navigation.push('OTP');
            }
            else
            {
                Alert.alert('Failed', 'Incorrect username or password!')
            }
        } catch(error){
            console.log('error checkpoint', error);
            Alert.alert('Error', 'Something went wrong!')
        }
    }


    const disabled = username == '' || password == '';
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                {/* <StatusBar
                    backgroundColor={colors.background}
                    barStyle="light-content"
                /> */}
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
                    <Image source={require('../../assets/icons/logo-black.png')}
                        style={{ height: 80, width: 250, resizeMode: 'contain', marginBottom: 35 }}
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
                                backgroundColor: colors.background,
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
                                backgroundColor: colors.background,
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
                                color: colors.textReverse,
                                fontFamily: fontsFamilys.bold,
                                fontSize: 21
                            }}>LOGIN</Text>
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
