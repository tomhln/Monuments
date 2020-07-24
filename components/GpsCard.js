import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import * as Location from 'expo-location';

// import colors
import { COLORS } from '../assets/colors.js'


export default function GpsCard({ returnLoc }) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [lat, setLat] = useState("N/A");
  const [long, setLong] = useState("N/A");
  // const [lat, setLat] = useState("49.1811");
  // const [long, setLong] = useState("-0.3712");
  const [city, setCity] = useState([{ nom: 'N/A'}]);
  const [loc, setLoc] = useState([]);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude)
      setLong(location.coords.longitude)

      if (lat != 'N/A' && long != 'N/A' && city[0].nom == 'N/A' ){
        try {
          let response = await fetch("https://geo.api.gouv.fr/communes?lat=" + lat + "&lon=" + long + "&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre");
          let json = await response.json();
          setCity(json);
          setLoc([{ lat: {lat}, long: {long}, city: {city} }])
          returnLoc([{ lat: {lat}, long: {long}, city: {json} }])
        } catch (error) {
          console.error(error);
        }
      }
    })();
  });


  return(
    <View>
      <Card title="Ma position">
        <Text>Latitude : {lat} </Text>
        <Text>Longitude : {long} </Text>
        <Text>Ville : {city[0]["nom"]} </Text>
      </Card>
    </View>
  )
}


const styles = StyleSheet.create({
  'btnContainer': {
    width: '90%',
    marginLeft: '5%'
  }
});
