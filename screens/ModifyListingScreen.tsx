import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import colors from "../assets/colors/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Listing from "../model/listing";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../model/authData";
import ListingStatus from "../server/models/listingStatus";

const API_URL =
  Platform.OS === "ios" ? "http://192.168.1.104:3000" : "http://10.0.2.2:3000";

const ModifyListing = ({ route, navigation }) => {
  var listing: Listing = route.params.listing;
  var isEdit: boolean = route.params.isEdit;

  const [curUser, setCurUser] = useContext(AuthContext);

  // form state manager
  const [listingTitle, setListingTitle] = useState("");
  const [price, setPrice] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImagUri] = useState("");
  // if its undefined
  if (!isEdit) isEdit = false;

  // null check listing

  const submitAction = () => {
    const payload = {
      title: listingTitle,
      price: parseInt(price),
      shippingFee: parseInt(shippingFee),
      description: description,
      imageUrl: imageUri,
      listedSince: "Just Now",
      listingLocation: location,
      status: ListingStatus.LISTING,
      createdBy: {
        username: curUser.username,
        name: curUser.name,
      },
      interestedUsernames: [],
    };
    fetch(`${API_URL}/product/${isEdit ? "edit" : "insert"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status == 200) {
            Alert.alert("Success!", `Succesfully submitted`, [
              {
                text: "Ok",
                onPress: () => navigation.popToTop(),
              },
            ]);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <SafeAreaView style={styles.safeViewTop}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="chevron-left" size={32} color={colors.black} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Form area */}
        <View style={styles.formComponents}>
          <Text style={styles.formTitle}>
            {isEdit ? "Edit" : "New"} Listing
          </Text>

          {/* Form textboxes */}
          <View style={styles.listingTextbox}>
            <TextInput
              style={styles.listingText}
              placeholder="What are you selling?"
              defaultValue={isEdit ? listing.title : ""}
              maxLength={16}
              onChangeText={setListingTitle}
            />
          </View>
          <View style={styles.listingTextbox}>
            <TextInput
              style={styles.listingText}
              placeholder="For how much? ($35)"
              keyboardType="numeric"
              defaultValue={isEdit ? listing.price.toString() : ""}
              maxLength={4}
              onChangeText={setPrice}
            />
          </View>
          <View style={styles.listingTextbox}>
            <TextInput
              style={styles.listingText}
              placeholder="How much for shipping fee? (if any)"
              keyboardType="numeric"
              defaultValue={isEdit ? listing.shippingFee.toString() : ""}
              maxLength={2}
              onChangeText={setShippingFee}
            />
          </View>
          <View style={styles.listingTextbox}>
            <TextInput
              style={styles.listingText}
              placeholder="Where are you selling? (Chicago, IL)"
              defaultValue={isEdit ? listing.listingLocation : ""}
              maxLength={16}
              onChangeText={setLocation}
            />
          </View>
          {/* bigger form for description */}
          <View
            style={[
              styles.listingTextbox,
              {
                height: 120,
                justifyContent: "flex-start",
              },
            ]}
          >
            <TextInput
              style={styles.listingText}
              placeholder="Provide a brief description ..."
              defaultValue={isEdit ? listing.description : ""}
              maxLength={256}
              multiline={true}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.listingTextbox}>
            <TextInput
              style={styles.listingText}
              placeholder="Link to image URL"
              defaultValue={isEdit ? listing.imageUrl : ""}
              onChangeText={setImagUri}
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.buttonWrapper} onPress={submitAction}>
            <Text style={styles.buttonText}>
              {isEdit ? "Edit" : "Create"} Listing
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeViewTop: {
    backgroundColor: colors.white,
  },
  backIcon: {
    marginHorizontal: 20,
  },
  formComponents: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  formTitle: {
    fontFamily: "LatoBold",
    fontSize: 32,
    color: colors.black,
    marginBottom: 30,
  },
  listingTextbox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 37,
    marginVertical: 15,
    justifyContent: "center",

    // Drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  listingText: {
    marginHorizontal: 10,
    fontFamily: "LatoLight",
    fontSize: 15,
  },
  buttonWrapper: {
    marginVertical: 40,
    backgroundColor: colors.green,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "LatoBold",
    fontSize: 18,
    color: colors.white,
  },
});

export default ModifyListing;
