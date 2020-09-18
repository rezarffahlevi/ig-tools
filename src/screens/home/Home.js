import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";
import TopBar from '../../components/TopBar';
import AsyncStorage from "@react-native-community/async-storage";
import { CONSTANT } from '../../helpers/constant';
import { fetchApi, postApi, fetchCheckAccount } from '../../services/Api';

const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myPoin, setMyPoin] = useState(0);

  useEffect(() => {
    checkAccount();
  }, [])

  const checkAccount = async () => {
    try {
      setIsLoading(true);
      let user = JSON.parse(await AsyncStorage.getItem(CONSTANT.KEY_SESSION));
      let sessionId = await AsyncStorage.getItem(CONSTANT.KEY_SESSION_ID);

      const params = {
        method: 'getuser',
        username: user.username,
        sessionid: sessionId
      }

      const response = await fetchCheckAccount(params);
      setIsLoading(false);
      // console.log('response check', response.data);
      if (response.data.result) {
        // console.log(response.data.account);
        setMyPoin(response.data.poin);
      }
      else {
        Alert.alert('Failed', 'Session anda habis, silahkan login ulang', [{
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.multiRemove([CONSTANT.KEY_SESSION, CONSTANT.KEY_SESSION_ID]);
            props.setIsLogin(false);
          }
        }]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error check', error);
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
        <TopBar title="Home">
          {/* <Icon
            name="account-settings"
            size={24}
            color={colors.itemInactive}
            style={{ position: "absolute", right: 10 }}
          /> */}
        </TopBar>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <Text style={{
            color: colors.white,
            fontSize: 21,
            paddingTop: 25
          }}>My Point:</Text>
          <Text style={{
            color: colors.white,
            fontSize: 45
          }}>{myPoin}</Text>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginTop: 25,
            // flex: 1,
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
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
                navigation.push('FormFitur', {
                  type: 'follow',
                  checkAccount
                });
              }}
            >
              <Icon
                name="account"
                size={30}
                color={colors.white}
              />
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.text,
                marginTop: 10
              }}>Follows</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 15,
                marginLeft: 8,
                borderColor: colors.background,
                // borderWidth: 1,
                backgroundColor: colors.primary,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                navigation.push('FormFitur', {
                  type: 'likes',
                  checkAccount
                });
              }}
            >
              <Icon
                name="heart"
                size={30}
                color={colors.white}
              />
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.text,
                marginTop: 10
              }}>Likes</Text>
            </TouchableOpacity>
          </View>
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

export default Home;
