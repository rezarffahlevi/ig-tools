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
    Alert
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";
import TopBar from '../../components/TopBar';

const OTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');

    useEffect(() => {

    }, [])

    const onPressOTP = () => {
        Keyboard.dismiss();
        setIsLoading(true);
        handleOTP()
    }

    async function handleOTP() {
        const params = {
            method: 'login',
            username,
            password
        }

        try {
            const response = await AuthenticationService.fetchApi(params);
            console.log('res', response);
            setIsLoading(false);
            if('checkpoint_url' in response.result)
            {
                navigation.push('OTP');
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

    const disabled = otp == '';
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
                        style={{ height: 70, width: 250, resizeMode: 'contain', marginBottom: 15 }}
                    />
                    <Text style={{
                        color: colors.text,
                        paddingVertical: 20
                    }}>Please check the code we sent you</Text>
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
                            placeholder="OTP Code"
                            placeholderTextColor={colors.lightGrey}
                            onChangeText={text => setOtp(text)}
                            value={otp}
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
                            onPress={onPressOTP}
                        >
                            <Text style={{
                                color: colors.text
                            }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

export default OTP;
