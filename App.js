import Constants from 'expo-constants'
import React, { useState, useEffect, Platform } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";


export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Delhi');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) {
        return (
            <View style={styles.notFoundContainer}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.notFoundText}>City Not Found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData= {fetchWeatherData}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    paddingTop: Constants.statusBarHeight,
  },
  notFoundText:{
      margin: 20,
      fontSize: 28,
  }
});
