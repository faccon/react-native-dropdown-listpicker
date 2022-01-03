import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
  LayoutChangeEvent,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {DPMProps, ItemProps, ListItemProps} from 'rn-dropdown-picker';
import {DOWN_ARROW, PLACEHOLDER, PLUS, WIDTH} from '../constants';
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
  scrollable,
  renderItemsBelowPicker,
  listItemLeftIconComp,
  ListItemSelectedIconComp,
  sublistItemLeftIconComp,
  dropdownIndicator,
}: DPMProps) {
  const [value] = useState<string>(PLACEHOLDER);
  const itemsRef = useRef<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openSelction, setOpenSelction] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [fLmargin, setFLmargin] = useState<number | undefined>();
  const [sBH, setSBH] = useState<number | undefined>();
  const [pickerVH, setpickerVH] = useState<number | undefined>();
  const [searchValue, setsearchValue] = useState<string>('');
  const filteredData = useRef<ItemProps[]>([]);
  const b = useRef<number>();

  useEffect(() => {
    var reload = refresh;
  }, [refresh]);

  function searchList(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    let text = e.nativeEvent.text;
    setsearchValue(text);
    let filter: ItemProps[] = [];
    data.find(e => {
      // Search only labels
      if (typeof e.value == 'object') {
        e.value.map(item => {
          if (item.label.toLowerCase().includes(text.toLowerCase())) {
            // filteredData.current.push(item.label);
            filter.push({
              label: e.label,
              value: [{label: item.label, value: item.value}],
            });
          }
        });
      } else if (typeof e.value == 'string') {
        if (e.label.toLowerCase().includes(text.toLowerCase())) {
          filter.push({label: e.label, value: e.value});
        }
      }
    });
    filteredData.current = text.length == 0 ? [] : filter;
    setRefreshList(!refreshList);
  }

  function ListItemSelectedIcon() {
    switch (typeof ListItemSelectedIconComp) {
      case 'object':
        return ListItemSelectedIconComp;
      default:
        return <Text style={[{...styles.ITCMark, ...markedIconStyle}]}>✓</Text>;
    }
  }

  const onLayout = (event: LayoutChangeEvent, key: string) => {
    const {height} = event.nativeEvent.layout;
    switch (key) {
      case 'RBB':
        setFLmargin(Math.ceil(height));
        break;
      case 'RWOB':
        setpickerVH(height);
        break;
      case 'SB':
        setSBH(height);
        break;
      default:
        break;
    }
  };

  function ItemComponentContent({label, value, style, level}: ListItemProps) {
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
  function RenderSeletedItemAsBadge() {
    switch (showMultipleAsBadge) {
      case true:
        return (
          <ScrollView
            style={styles.RSIBScrollView}
            horizontal
            scrollEnabled={scrollable}
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
  function hideSelection() {
    setOpenSelction(false);
  }
  function RenderBadgeBelow() {
    return (
      <View>
        <ScrollView
          onLayout={e => onLayout(e, 'RBB')}
          style={{
            paddingVertical: 2,
            opacity: fLmargin < 10 || !openSelction ? 0 : 1,
            // maxHeight: 40, // Optional
          }}>
          <View style={styles.DDPBadgeBelowPicker}>
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
  const flatListDefStyle = {
    ...DropdownListStyle,
    opacity: open ? 1 : 0,
    marginTop: fLmargin < 10 || !openSelction ? undefined : fLmargin,
  };
  function handleOWB() {
    setOpen(!open);
    if (!open) {
      setOpenSelction(true);
    }
  }
  function searchBar() {
    return (
      <View
        style={{
          // width: '50%',
          height: 45,
          borderRadius: 5,
          borderWidth: 0.5,
          // borderColor: 'gray',
          alignSelf: 'center',
          marginVertical: 5,
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}>
        <TextInput
          style={{flex: 1, width: '100%', color: 'black'}}
          placeholder="Search"
          placeholderTextColor="black"
          value={searchValue}
          onChange={e => searchList(e)}
        />
      </View>
    );
  }
  function RenderDMWithBadge() {
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

        {/* If render Items below is true */}
        {renderItemsBelowPicker ? <RenderBadgeBelow /> : null}

        <FlatList
          style={[styles.DDFLStyle, {...DropdownListStyle}]}
          contentContainerStyle={[{...styles.DDConStyle, ...ListItemStyle}]}
          data={filteredData.current.length == 0 ? data : filteredData.current}
          renderItem={({item, index}: ListRenderItemInfo<ItemProps>) => (
            <ItemComponent root={index} label={item.label} value={item.value} />
          )}
          keyExtractor={(item: ItemProps) => item.label}
          extraData={refreshList}
        />
      </View>
    );
  }

  function RenderDMWOBadge() {
    return (
      <View>
        <TouchableOpacity
          onLayout={e => onLayout(e, 'RWOB')}
          activeOpacity={0.8}
          style={styles.DDPContainer}
          onPress={handleOWB}>
          {itemsRef.current.length > 0 ? (
            <RenderSeletedItemAsBadge />
          ) : (
            <Text style={styles.PLACEHOLDER}>{value}</Text>
          )}
          <View style={styles.DDPressable}>
            {dropdownIndicator == 'arrow' ? (
              <Text style={styles.DDDArrow}>{DOWN_ARROW}</Text>
            ) : (
              <Text style={styles.DDDPlus}>{PLUS}</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* If render Items below is true */}
        {renderItemsBelowPicker ? <RenderBadgeBelow /> : null}

        <FlatList
          ListHeaderComponent={searchBar()}
          style={[styles.DDFLStyle, {...flatListDefStyle}]}
          contentContainerStyle={[{...styles.DDConStyle, ...ListItemStyle}]}
          data={filteredData.current.length == 0 ? data : filteredData.current}
          renderItem={({item, index}: ListRenderItemInfo<ItemProps>) => (
            <ItemComponent root={index} label={item.label} value={item.value} />
          )}
          keyExtractor={(item: ItemProps) => item.label}
          extraData={refreshList}
        />
      </View>
    );
  }
  switch (showMultipleAsBadge) {
    case false:
      return <RenderDMWOBadge />;
    default:
      return <RenderDMWithBadge />;
  }
}
