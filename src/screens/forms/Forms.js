import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";
import TopBar from '../../components/TopBar';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from "@react-native-community/async-storage";
import { CONSTANT } from '../../helpers/constant';
import { fetchApi, postApi, fetchCheckAccount } from '../../services/Api';

const Forms = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('');
    const [link, setLink] = useState('');
    const [jumlah, setJumlah] = useState('');
    const { params } = route;

    useEffect(() => {
        setType(params.type);
    }, [])

    const onSubmit = async () => {
        if (link == '') {
            Alert.alert('Perhatian', 'Link wajib diisi!');
            return;
        }
        else if (jumlah == '') {
            Alert.alert('Perhatian', 'Pilih jumlah poin terlebih dahulu!');
            return;
        }
        try {
            setIsLoading(true);

            let user = JSON.parse(await AsyncStorage.getItem(CONSTANT.KEY_SESSION));
            let sessionId = await AsyncStorage.getItem(CONSTANT.KEY_SESSION_ID);
    
            const params = {
                method: type,
                username: user.username,
                sessionid: sessionId,
                link: link,
                jumlah: jumlah
            }
    
            const response = await postApi(params, params);
            setIsLoading(false);
            // console.log('response fitur', response);
            if (response.data.result) {
                Alert.alert('Berhasil', response.data.message, [
                    {
                        text: "OK", onPress: () => navigation.pop()
                    }]);
            }
            else {
                Alert.alert('Gagal', response.data.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.log('error fitur', error);
            Alert.alert('Error', 'Something went wrong!')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.background}
                    barStyle="light-content"
                />
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}>

                    {/* <View style={{ paddingVertical: 5 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.text,
                            paddingVertical: 10
                        }}>Username</Text>
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
                            placeholder="Username"
                            placeholderTextColor={colors.lightGrey}
                        // onChangeText={text => setOtp(text)}
                        // value={otp}
                        />
                    </View> */}
                    <View style={{ paddingVertical: 5 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.text,
                            paddingVertical: 10
                        }}>Link</Text>
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
                            placeholder="Link"
                            placeholderTextColor={colors.lightGrey}
                            onChangeText={text => setLink(text)}
                            value={link}
                        />
                    </View>

                    <View style={{ paddingVertical: 5 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.text,
                            paddingVertical: 10
                        }}>Jumlah</Text>
                        <Picker
                            selectedValue={jumlah}
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
                            onValueChange={(itemValue, itemIndex) =>
                                setJumlah(itemValue)
                            }>
                            <Picker.Item label="Pilih jumlah poin" value="" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="10" value="10" />
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginTop: 25,
                            paddingVertical: 20,
                            paddingHorizontal: 15,
                            marginRight: 8,
                            borderColor: colors.background,
                            // borderWidth: 1,
                            backgroundColor: colors.primary,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            onSubmit();
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: colors.text,
                        }}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View>
            }

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
        color: colors.white,
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

export default Forms;
