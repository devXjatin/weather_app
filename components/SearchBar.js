import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchBar({ fetchWeatherData}) {
  const [cityName, setCityName] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.textInput}
        placeholder="Enter City Name"
        value={cityName}
        onChangeText={(text) => {
          setCityName(text);
        }}
      />
      <EvilIcons style={styles.icon}name="search" size={34} color="black" 
      onPress={()=>{
          fetchWeatherData(cityName)
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get('screen').width-20,
    borderWidth: 1.5,
    paddingVertical:10,
    borderRadius: 25,
    marginHorizontal:10,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
    padding:12,
  },

  textInput:{
      fontSize: 18,
      textTransform: 'capitalize',
      height: '100%',
      
  },
  icon:{
  }
});
