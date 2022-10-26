import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import AuthScreen from "./screens/AuthScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import ModifyListingScreen from "./screens/ModifyListingScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "@use-expo/font";

import colors from "./assets/colors/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import User from "./model/user";
import { AuthContext } from "./model/authData";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Initiate Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="store" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="history" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// Initiate Custom Font
const customFonts = {
  LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
  LatoRegularItalic: require("./assets/fonts/Lato-Italic.ttf"),
  LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
  LatoLight: require("./assets/fonts/Lato-Light.ttf"),
  LatoLightItalic: require("./assets/fonts/Lato-LightItalic.ttf"),
};

const App = () => {
  const [isLoaded] = useFonts(customFonts);
  const [curUser, setCurUser] = useState<User>();

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthContext.Provider value={[curUser, setCurUser]}>
      <NavigationContainer>
        <Stack.Navigator>
          {!curUser ? (
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrderDetailScreen"
                component={OrderDetailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ModifyListing"
                component={ModifyListingScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: -1,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabIcon: {
    height: 25,
  },
});
export default App;
