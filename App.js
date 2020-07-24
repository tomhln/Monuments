import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, SafeAreaView } from 'react-native';

// import colors
import { COLORS } from './assets/colors.js'

// import pages
import Home from './pages/Home.js';
import AroundMe from './pages/AroundMe.js';
import Search from './pages/Search.js';

export default function App() {

  const [page, setPage] = useState('Home');
  const [loc, setLoc] = useState([]);
  const [search, setSearch] = useState('')

  function navigatePage(page) {
    setPage(page);
  }

  function navigateAroundMe(page, loc) {
    setLoc(loc);
    setPage(page);
  }

  function navigateSearch(page, querySearch) {
    setSearch(querySearch);
    setPage(page);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.mainGreen} barStyle="auto" />
      { page === 'Home' && <Home navigate={navigatePage} navigateAroundMe={navigateAroundMe} navigateSearch={navigateSearch}/> }

      { page === 'AroundMe' && <AroundMe loc={loc} navigate={navigateAroundMe}/> }

      { page === 'Search' && <Search search={search} navigate={navigateSearch}/> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
