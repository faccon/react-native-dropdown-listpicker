import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import {DPMProps, ItemProps, ListItemProps} from 'rn-dropdown-picker';
import {DOWN_ARROW, ITEM_ROW_HEOGHT, PLACEHOLDER} from '../constants';
import {MainList, styles, SubList1} from '../styles';

export function DropMenu({
  badgeBackgroundColor,
  borderless,
  data,
  onSelected,
  radius,
  showMultipleAsBadge,
  DropdownListStyle,
  ListItemStyle,
  ListLabelStyle,
  markedIconStyle,
  selectedItemBadgeStyle,
  selectedItemBadgeLabelStyle,
  selectedItemBadgeCloseIconStyle,
  selectedtextStyle,
  mode,
}: DPMProps) {
  const [value] = useState<string>(PLACEHOLDER);
  const itemsRef = useRef<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    console.log('clean');
  }, [refresh]);

  function ItemComponentContent({label, value, style}: ListItemProps) {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => handleListItemClick(label)}>
        <Text style={[{...styles.ITCLabel, ...ListLabelStyle}]}>{label}</Text>
        {itemsRef.current.includes(label) ? (
          <Text style={[{...styles.ITCMark, ...markedIconStyle}]}>✓</Text>
        ) : null}
      </TouchableOpacity>
    );
  }
  function ItemComponent({label, value, root}: ListItemProps) {
    return (
      <View>
        <ItemComponentContent label={label} value={value} style={MainList} />
        {typeof value === 'object'
          ? value.map(_ => (
              <ItemComponentContent
                root={root}
                label={_.label}
                value={_.value}
                style={SubList1}
              />
            ))
          : null}
      </View>
    );
  }
  function RenderSeletedItemAsBadge() {
    switch (showMultipleAsBadge) {
      case true:
        return (
          <ScrollView
            style={styles.RSIBScrollView}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {itemsRef.current.map((_, index) => (
              <TouchableOpacity onPress={() => checkifInArray(_)}>
                <View
                  style={[
                    {...styles.RSIBTO, ...selectedItemBadgeStyle},
                    {
                      backgroundColor:
                        badgeBackgroundColor[
                          Math.floor(
                            Math.random() * badgeBackgroundColor.length,
                          )
                        ],
                    },
                  ]}>
                  <Text style={styles.RSIBDot}>{'\u2B24'}</Text>
                  <Text
                    style={[
                      {...styles.RSIBLabel, ...selectedItemBadgeLabelStyle},
                    ]}>
                    {_}
                  </Text>
                  <Text
                    style={[
                      {
                        ...styles.RSIBDelete,
                        ...selectedItemBadgeCloseIconStyle,
                      },
                    ]}>
                    {' '}
                    X{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case false:
        return (
          <Text
            style={[
              {...styles.RSIBOnlyTextExt, ...selectedtextStyle},
            ]}>{`${itemsRef.current.length} item(s) selected`}</Text>
        );
      default:
        return null;
    }
  }
  function handleListItemClick(label: string) {
    setOpen(!open);
    checkifInArray(label);
  }
  function checkifInArray(label: string) {
    if (itemsRef.current.includes(label)) {
      let index = itemsRef.current.indexOf(label);
      itemsRef.current.splice(index, 1);
      onSelected(itemsRef.current);
      setRefresh(!refresh);
    } else {
      itemsRef.current.push(label);
      onSelected(itemsRef.current);
      setRefresh(!refresh);
    }
  }

  return (
    <View>
      <View style={styles.DDPContainer}>
        {itemsRef.current.length > 0 ? (
          <RenderSeletedItemAsBadge />
        ) : (
          <Text style={styles.PLACEHOLDER}>{value}</Text>
        )}
        <Pressable
          style={styles.DDPressable}
          onPress={() => setOpen(!open)}
          android_ripple={{radius, borderless}}>
          <Text style={styles.DDDArrow}>{DOWN_ARROW}</Text>
        </Pressable>
      </View>
      <FlatList
        style={[
          styles.DDFLStyle,
          {...DropdownListStyle, opacity: open ? 1 : 0},
        ]}
        contentContainerStyle={[{...styles.DDConStyle, ...ListItemStyle}]}
        data={data}
        renderItem={({item, index}: ListRenderItemInfo<ItemProps>) => (
          <ItemComponent root={index} label={item.label} value={item.value} />
        )}
        keyExtractor={(item: ItemProps) => item.label}
      />
    </View>
  );
}
