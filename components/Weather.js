import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import SearchBar from "./SearchBar";
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/index";

export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? "white" : "black";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
          <SearchBar fetchWeatherData={fetchWeatherData}/>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 52,
              textAlign:'center'
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            {main}
          </Text>
          {/* &#8451; is used for degree celsius symbol */}
          <Text style={{ ...styles.headerText, color: textColor }}>
            {temp} &#8451;
          </Text>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white",textAlign:'center' }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: "white",textAlign:'center' }}>{humidity} %</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white", textAlign:'center'}}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: "white", textAlign:'center'}}>{speed} m/s</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 30,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
});
