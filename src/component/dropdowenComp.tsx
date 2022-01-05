import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DPMProps, ItemProps, ListItemProps} from 'rn-dropdown-picker';
import {
  DM_HEIGHT,
  DOWN_ARROW,
  HEIGHT,
  PLACEHOLDER,
  PLUS,
  SB_HEIGHT,
  WIDTH,
} from '../constants';
import {MainList, styles, SubList1} from '../styles';
import {SearchBar} from './SearchBar';

export function DropdownComp({
  badgeBackgroundColor,
  borderless,
  data,
  onSelected,
  radius,
  showMultipleAsBadge,
  DropdownListStyle,
  //   ListItemStyle,
  ListLabelStyle,
  markedIconStyle,
  selectedItemBadgeStyle,
  selectedItemBadgeLabelStyle,
  selectedItemBadgeCloseIconStyle,
  selectedtextStyle,
  //   mode,
  scrollable,
  listItemLeftIconComp,
  ListItemSelectedIconComp,
  sublistItemLeftIconComp,
  dropdownIndicator,
  searchable,
}: DPMProps) {
  const [filteredData, setfilteredData] = useState<ItemProps[]>();

  const itemsRef = useRef<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openSelction, setOpenSelction] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [value] = useState<string>(PLACEHOLDER);

  const flatListDefStyle = {
    ...DropdownListStyle,
    opacity: open ? 1 : 0,
  };
  function ListItemSelectedIcon() {
    switch (typeof ListItemSelectedIconComp) {
      case 'object':
        return ListItemSelectedIconComp;
      default:
        return <Text style={[{...styles.ITCMark, ...markedIconStyle}]}>✓</Text>;
    }
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
  function handleListItemClick(label: string) {
    checkifInArray(label);
    setOpenSelction(!showMultipleAsBadge ? true : false);
  }
  function ItemComponentContent({label, style, level}: ListItemProps) {
    switch (level) {
      case 'sub':
        return (
          <TouchableOpacity
            style={style}
            onPress={() => handleListItemClick(label)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {sublistItemLeftIconComp ? sublistItemLeftIconComp : null}
              <Text style={[{...styles.ITCLabel, ...ListLabelStyle}]}>
                {label}
              </Text>
            </View>
            {itemsRef.current.includes(label) ? <ListItemSelectedIcon /> : null}
          </TouchableOpacity>
        );

      default:
        return (
          <TouchableOpacity
            style={style}
            onPress={() => handleListItemClick(label)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {listItemLeftIconComp ? listItemLeftIconComp : null}
              <Text style={[{...styles.ITCLabel, ...ListLabelStyle}]}>
                {label}
              </Text>
            </View>
            {itemsRef.current.includes(label) ? <ListItemSelectedIcon /> : null}
          </TouchableOpacity>
        );
    }
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
                level="sub"
              />
            ))
          : null}
      </View>
    );
  }
  function hideSelection() {
    setOpenSelction(false);
  }
  function RenderSeletedItem() {
    switch (showMultipleAsBadge) {
      case true:
        return (
          <ScrollView
            style={styles.RSIBScrollView}
            horizontal
            scrollEnabled={scrollable}
            showsHorizontalScrollIndicator={false}>
            {itemsRef.current.map(_ => (
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
  function RenderBadgeBelow() {
    return (
      <View>
        <ScrollView
          style={{
            opacity: itemsRef.current.length == 0 || !openSelction ? 0 : 1,
            height: !openSelction ? 0 : undefined,
          }}>
          <View style={styles.DDPBadgeBelowPicker}>
            {itemsRef.current.map(_ => (
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
          </View>
          {itemsRef.current.length > 0 ? (
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                paddingHorizontal: 40,
                paddingVertical: 3,
              }}
              onPress={hideSelection}>
              <Text style={{fontSize: 18, color: 'white'}}>Hide selection</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.DDPContainer}>
        {itemsRef.current.length > 0 ? (
          <RenderSeletedItem />
        ) : (
          <Text style={styles.PLACEHOLDER}>{value}</Text>
        )}
        <Pressable
          style={styles.DDPressable}
          onPress={() => setOpen(!open)}
          android_ripple={{radius, borderless}}>
          {dropdownIndicator == 'arrow' ? (
            <Text style={styles.DDDArrow}>{DOWN_ARROW}</Text>
          ) : (
            <Text style={styles.DDDPlus}>{PLUS}</Text>
          )}
        </Pressable>
      </View>

      {!showMultipleAsBadge ? <RenderBadgeBelow /> : null}

      {searchable && open ? (
        <SearchBar data={data} setfilteredData={setfilteredData} />
      ) : null}

      {open ? (
        <FlatList
          contentContainerStyle={[{...styles.DDConStyle, ...flatListDefStyle}]}
          data={filteredData == undefined ? data : filteredData}
          renderItem={({item, index}: ListRenderItemInfo<ItemProps>) => (
            <ItemComponent root={index} label={item.label} value={item.value} />
          )}
          keyExtractor={(item: ItemProps, index) => index.toString()}
          scrollEnabled
        />
      ) : null}
    </View>
  );
}
