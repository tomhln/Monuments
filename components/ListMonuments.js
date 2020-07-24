import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Overlay, Text } from 'react-native-elements';

import MapView from 'react-native-maps';

// import colors
import { COLORS } from '../assets/colors.js'

// import fonts
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const fetchFonts = () => {
  return Font.loadAsync({
  'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });
};

export default function ListMonuments({monuments, location}) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dataOverlay, setDataOverlay] = useState([]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  function moreData(monument) {
    setDataOverlay(monument)
    setIsVisible(true)
  }

  function Title() {
    return(
      <Text h3>{dataOverlay.fields.tico}</Text>
    )
  }

  function Adresse() {
    return(
      <Text style={{ marginTop: 5}}>{dataOverlay.fields.adrs}</Text>
    )
  }

  function History() {
    return(
      <Text style={{ marginTop: 5}}>{dataOverlay.fields.hist}</Text>
    )
  }

  function Carte() {
    return(
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: dataOverlay.geometry.coordinates[1],
          longitude: dataOverlay.geometry.coordinates[0],
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: dataOverlay.fields.coordonnees_ban[0],
            longitude: dataOverlay.fields.coordonnees_ban[1]
          }}
          title={dataOverlay.fields.tico}
          description={dataOverlay.fields.adrs}
          pinColor={COLORS.mainGreen}
        />
        { location != false &&
        <MapView.Marker
          coordinate={{
            latitude: location[0].lat.lat,
            longitude: location[0].long.long
          }}
          title="Moi"
        />
        }
      </MapView>
    )
  }

  return(
    <View style={{ flex: 1, width: '100%'}}>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        width='auto'
        height='auto'
      >
        <Title></Title>
        <Adresse></Adresse>
        <History></History>
        <Carte></Carte>
      </Overlay>

      <ScrollView>
       {
        monuments.map((monument, i) => (
          <ListItem button
            onPress={() => moreData(monument) }
            key={i}
            title={monument.fields.tico}
            subtitle={monument.fields.adrs}
            titleStyle={styles.textFont}
            subtitleStyle={[styles.textFont, { marginTop: 2, fontStyle: 'italic' }]}
            bottomDivider
          />
        ))
      }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  textFont: {
    fontFamily: "montserrat-regular"
  },
});
