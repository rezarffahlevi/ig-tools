import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";
import TopBar from '../../components/TopBar';
import AsyncStorage from "@react-native-community/async-storage";
import { CONSTANT } from '../../helpers/constant';

const Settings = ({ navigation, route }) => {
  const props = route.params;

  const onLogout = async () => {
    await AsyncStorage.multiRemove([CONSTANT.KEY_SESSION, CONSTANT.KEY_SESSION_ID]);
    props.setIsLogin(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />
        <TopBar title="Settings">
          {/* <Icon
                    name="account-settings"
                    size={24}
                    color={colors.itemInactive}
                    style={{ position: "absolute", right: 10 }}
                /> */}
        </TopBar>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}>

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
              onLogout();
            }}
          >
            <Icon
              name="logout"
              size={30}
              color={colors.white}
            />
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10
            }}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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

export default Settings;
