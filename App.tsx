import React from 'react';
import {View} from 'react-native';
import {DropMenu} from './src/component/dropdown';

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
];

const BadgeBgColor = ['#D3EFD3', '#D3EFEC'];

export default function App() {
  return (
    <View style={{flex: 1, paddingVertical: 30}}>
      <DropMenu
        showMultipleAsBadge={false}
        data={data}
        badgeBackgroundColor={BadgeBgColor}
        onSelected={(e: string[]) => {
          console.log(e);
        }}
        radius={20}
        borderless={true}
      />
    </View>
  );
}
