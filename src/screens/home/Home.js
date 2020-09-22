import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert, Image, ImageBackground, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontsFamilys } from "../../theme";
import TopBar from '../../components/TopBar';
import AsyncStorage from "@react-native-community/async-storage";
import { CONSTANT } from '../../helpers/constant';
import { fetchApi, postApi, fetchCheckAccount } from '../../services/Api';
import Axios from "axios";

const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myPoin, setMyPoin] = useState(0);
  const [userInfo, setUserInfo] = useState({});

  const props = route.params;

  useEffect(() => {
    checkAccount();
    // setIsLoading(false);
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
      const getIg = await Axios.get(`https://instagram.com/${user.username}/?__a=1`);
      setUserInfo(getIg.data.graphql.user);
      // console.log('user', getIg.data.graphql.user);
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
      Alert.alert('Error', 'Something went wrong!');
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        {/* <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        /> */}
        <TopBar title="Home">
          {/* <Icon
            name="account-settings"
            size={24}
            color={colors.itemInactive}
            style={{ position: "absolute", right: 10 }}
          /> */}
        </TopBar>
        <ImageBackground source={require('../../assets/images/gray-bg.jpg')} style={{ flex: 1 }}>
          <ScrollView
            style={{ width: "100%", flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}>
            <Image source={{ uri: userInfo.profile_pic_url }} style={{ height: 100, width: 100, resizeMode: 'contain', borderRadius: 50, marginTop: 20 }} />
            <Text style={{
              color: colors.text,
              fontSize: 21,
              paddingTop: 10,
              fontFamily: fontsFamilys.bold,
            }}>{userInfo.full_name}</Text>
            <Text style={{
              color: colors.text,
              fontSize: 14,
              paddingTop: 2,
              fontFamily: fontsFamilys.regular,
            }}>@{userInfo.username}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1, width: Dimensions.get('window').width, marginTop: 20 }}>
              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Text style={{
                  color: colors.text,
                  fontSize: 18,
                  fontFamily: fontsFamilys.semiBold,
                  // fontWeight:'bold'
                }}>{myPoin}</Text>
                <Text style={{
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: fontsFamilys.regular,
                }}>MY POINTS</Text>
              </View>
              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Text style={{
                  color: colors.text,
                  fontSize: 18,
                  fontFamily: fontsFamilys.semiBold,
                  // fontWeight:'bold'
                }}>{userInfo?.edge_owner_to_timeline_media?.count}</Text>
                <Text style={{
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: fontsFamilys.regular,
                }}>POSTS</Text>
              </View>
              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Text style={{
                  color: colors.text,
                  fontSize: 18,
                  fontFamily: fontsFamilys.semiBold,
                  // fontWeight:'bold'
                }}>{userInfo?.edge_follow?.count}</Text>
                <Text style={{
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: fontsFamilys.regular,
                }}>FOLLOWING</Text>
              </View>
              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <Text style={{
                  color: colors.text,
                  fontSize: 18,
                  fontFamily: fontsFamilys.semiBold,
                  // fontWeight:'bold'
                }}>{userInfo?.edge_followed_by?.count}</Text>
                <Text style={{
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: fontsFamilys.regular,
                }}>FOLLOWERS</Text>
              </View>
            </View>

            <View style={{
              padding: 16,
              alignSelf: 'stretch',
              flex: 1,
              // marginTop: 15,
              // flex: 1,
            }}>
              <Text style={{
                color: colors.text,
                fontSize: 18,
                fontFamily: fontsFamilys.semiBold,
                alignSelf: 'flex-start',
              }}>FEATURE</Text>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderColor: colors.background,
                  // borderWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  marginVertical: 5,
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onPress={() => {
                  navigation.push('FormFitur', {
                    type: 'follow',
                    checkAccount
                  });
                }}
              >
                <View style={{
                  flexDirection: 'row', alignItems: 'center',
                }}>
                  <Icon
                    name="account-multiple-plus"
                    size={30}
                    color={colors.textReverse}
                  />
                  <Text style={{
                    fontSize: 16,
                    fontFamily: fontsFamilys.bold,
                    color: colors.textReverse,
                    paddingHorizontal: 16
                  }}>FOLLOWS</Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={30}
                  color={colors.textReverse}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderColor: colors.background,
                  // borderWidth: 1,
                  paddingVertical: 16,
                  marginVertical: 5,
                  paddingHorizontal: 16,
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onPress={() => {
                  navigation.push('FormFitur', {
                    type: 'likes',
                    checkAccount
                  });
                }}
              >
                <View style={{
                  flexDirection: 'row', alignItems: 'center'
                }}>
                  <Icon
                    name="heart"
                    size={30}
                    color={colors.textReverse}
                  />
                  <Text style={{
                    fontSize: 16,
                    fontFamily: fontsFamilys.bold,
                    color: colors.textReverse,
                    paddingHorizontal: 16
                  }}>LIKES</Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={30}
                  color={colors.textReverse}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
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
