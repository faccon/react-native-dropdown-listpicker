import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {ItemProps, SBprops} from 'rn-dropdown-picker';
import {SB_HEIGHT} from '../constants';

export function SearchBar({data, setfilteredData}: SBprops) {
  const [searchValue, setsearchValue] = useState<string>('');

  function searchList(text: string) {
    setsearchValue(text);
    const filterd: ItemProps[] = [];
    data.filter(item => {
      if (typeof item.value == 'object') {
        item.value.map(cont => {
          if (cont.label.toLowerCase().includes(text.toLowerCase())) {
            filterd.push({
              label: item.label,
              value: [{label: cont.label, value: cont.value}],
            });
          } else if (item.label.toLowerCase().includes(text.toLowerCase())) {
            filterd.push({
              label: item.label,
              value: item.value,
            });
          }
        });
      } else if (
        typeof item.value == 'string' &&
        item.label.toLowerCase().includes(text.toLowerCase())
      ) {
        filterd.push({label: item.label, value: item.value});
      }
    });
    setfilteredData(filterd);
  }

  return (
    <View
      style={{
        width: '90%',
        height: SB_HEIGHT,
        alignSelf: 'center',
        borderWidth: 0.5,
        backgroundColor: 'white',
      }}>
      <TextInput
        style={{flex: 1, width: '100%', color: 'black', fontSize: 19}}
        placeholder="Search"
        placeholderTextColor="black"
        value={searchValue}
        onChangeText={searchList}
      />
    </View>
  );
}
