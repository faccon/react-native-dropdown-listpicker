import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {DropMenu} from './src/component/dropdown';
import Icon from 'react-native-vector-icons/Entypo';
import {styles} from './src/styles';
import {SearchBar} from './src/component/SearchBar';
import {ItemProps} from 'rn-dropdown-picker';
import {DropdownComp} from './src/component/dropdowenComp';

const data = [
  {
    label: 'Nature',
    value: [
      {label: 'Gym1', value: 'HomeWorkOut'},
      {label: 'Food2', value: 'GermanFood'},
    ],
  },
  {
    label: 'Lifestyle',
    value: [
      {label: 'Gym', value: 'HomeWorkOut'},
      {label: 'Food', value: 'GermanFood'},
    ],
  },
  {
    label: 'Lifele',
    value: 'jdk',
  },
];

const BadgeBgColor = ['#F5F4F3'];
const ListHeaderIcon = <Icon name="dot-single" size={30} color="black" />;
const ListRightIcon = <Icon name="shopping-cart" size={20} color="black" />;
const SubLevelLeftIcon = <Icon name="list" size={15} color="black" />;

export default function App() {
  return (
    <View style={{flex: 1, paddingVertical: 30}}>
      <DropdownComp
        showMultipleAsBadge={false}
        radius={20}
        borderless={true}
        onSelected={(e: string[]) => {
          return null;
        }}
        data={data}
        badgeBackgroundColor={BadgeBgColor}
        listItemLeftIconComp={ListHeaderIcon}
        ListItemSelectedIconComp={ListRightIcon}
        searchable={true}
        dropdownIndicator="arrow"
        mode="UNDERLAY"
      />
    </View>
  );
}
