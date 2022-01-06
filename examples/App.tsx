import React from 'react';
import {View, Text} from 'react-native';
import CountryPicker from 'rn-country-dropdown-picker';

export default function App() {

  function handleSelection(e: any) {
    console.log(e);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CountryPicker selectedItem={handleSelection} />
    </View>
  );
}