import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Input, Divider } from 'react-native-elements';

// import components
import GpsCard from '../components/GpsCard.js';

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

export default function Home({navigate, navigateAroundMe, navigateSearch}) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [loc, setLoc] = useState([]);
  const [search, setSearch] = useState("");

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  function getLoc(loc) {
    setLoc(loc);
  }

  return(
    <View style={{ flex: 1, width: '100%' }}>
      <Header
        style={styles.header}
        backgroundColor={COLORS.mainGreen}
        leftComponent={{}}
        centerComponent={{ text: 'Monuments', style: { color: '#fff', fontFamily: 'montserrat-bold' } }}
        rightComponent={{}}
      />
      <GpsCard returnLoc={getLoc}/>

      <View style={{marginTop: 20, width: '90%', marginLeft: '5%'}}>

        <Button
          title="Autour de moi"
          buttonStyle={{ backgroundColor: COLORS.secondGreen, marginTop: 10 }}
          onPress={() => navigateAroundMe('AroundMe', loc)}
          titleStyle={{fontFamily: 'montserrat-regular'}}
        />

        <Divider style={{ backgroundColor: 'white', height: 50 }} />

        <Input
          value={search}
          onChangeText={(str) => setSearch(str)}
          placeholder="Rechercher dans une ville"
          type="text"
          placeholderStyle={{fontFamily: 'montserrat-regular'}}
        />

        <Button
          title="Rechercher"
          buttonStyle={{ backgroundColor: COLORS.secondGreen, marginTop: 10 }}
          onPress={() => navigateSearch('Search', search)}
          disabled={(search === '')}
          titleStyle={{fontFamily: 'montserrat-regular'}}
        />

      </View>
    </View>
  )
}


const styles = StyleSheet.create({

});
