import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../assets/colors/color";

import userData from "../assets/mockData/user";
import { AuthContext } from "../model/authData";

const height = Dimensions.get("window").height;

const ProfileScreen = ({ navigation, route }) => {
  const [curUser, setCurUser] = useContext(AuthContext);

  const logoutHandler = () => {
    setCurUser(undefined);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Text style={styles.title}>Signed in as</Text>
        <Text style={styles.nameText}>{curUser.name}</Text>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.editProfileButtonWrapper}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButtonWrapper}
            onPress={logoutHandler}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileWrapper: {
    marginHorizontal: 20,
    marginTop: height * 0.3,
  },
  title: {
    fontFamily: "LatoRegular",
    fontSize: 30,
    color: colors.black,
  },
  nameText: {
    marginTop: 5,
    fontFamily: "LatoBold",
    fontSize: 40,
    color: colors.black,
  },
  buttonsWrapper: {
    // Drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 45,
  },
  editProfileButtonWrapper: {
    backgroundColor: colors.green,
    alignItems: "center",
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  logoutButtonWrapper: {
    marginTop: 10,
    backgroundColor: colors.red,
    alignItems: "center",
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonText: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: colors.white,
  },
});

export default ProfileScreen;
