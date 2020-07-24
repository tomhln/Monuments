import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Text } from 'react-native-elements';

//import db
import DB from '../db.json'

// import colors
import { COLORS } from '../assets/colors.js'

// import components
import ListMonuments from '../components/ListMonuments.js'

export default function Search({search, navigate}) {

  const [monuments, setMonuments] = useState([]);
  const [page, setPage] = useState('List');
  const [title, setTitle] = useState('')

  useEffect(() => {
    const mons = DB.filter( monument => monument.fields.commune == search);
    setTitle(search + " (" + mons.length + ")")
    setMonuments(mons);
  }, []);

  return(
    <View style={{ flex: 1, width: '100%' }}>
      <Header
        style={styles.header}
        backgroundColor={COLORS.mainGreen}
        leftComponent={<Button
          title="<"
          buttonStyle={{ backgroundColor: COLORS.mainGreen }}
          onPress={() => navigate('Home')}
        />}
        centerComponent={{ text: title, style: { color: '#fff', fontFamily: 'montserrat-bold' } }}
        rightComponent={{}}
      />

      { page === 'List' && <ListMonuments monuments={monuments} location={false}/> }
    </View>
  )
}


const styles = StyleSheet.create({

});
