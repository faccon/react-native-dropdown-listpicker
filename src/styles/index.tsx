import {StyleSheet} from 'react-native';
import {DM_HEIGHT, ITEM_ROW_HEOGHT, ROOT_WIDTH, WIDTH} from '../constants';

export const styles = StyleSheet.create({
  ITCTO: {
    justifyContent: 'space-between',
    height: ITEM_ROW_HEOGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ITCTO_2: {
    justifyContent: 'space-between',
    height: ITEM_ROW_HEOGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 20,
  },
  ITCLabel: {color: 'black', fontSize: 18},
  ITCMark: {color: 'green', fontSize: 18},
  RSIBTO: {
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  RSIBDot: {fontSize: 10, color: 'green', paddingEnd: 4},
  RSIBLabel: {fontSize: 20, color: 'black'},
  RSIBDelete: {fontSize: 15, color: 'red'},
  RSIBScrollView: {flex: 1, width: WIDTH * 2},
  RSIBOnlyTextExt: {fontSize: 18, color: 'white'},
  DDPContainer: {
    backgroundColor: 'black',
    alignSelf: 'center',
    height: DM_HEIGHT,
    width: ROOT_WIDTH,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 10,
  },
  PLACEHOLDER: {fontSize: 20, color: 'white'},
  DDPressable: {width: 60, alignItems: 'center', justifyContent: 'center'},
  DDDArrow: {fontSize: 10, color: 'white', fontWeight: 'bold'},
  DDFLStyle: {
    position: 'absolute',
    top: DM_HEIGHT,
    elevation: 1,
    zIndex: 1,
    width: '100%',
  },
  DDConStyle: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: ROOT_WIDTH,
    borderWidth: 0.5,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export const MainList = styles.ITCTO;
export const SubList1 = styles.ITCTO_2;
