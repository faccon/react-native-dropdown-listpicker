declare module 'react-native-dropdown-listpicker' {
  import {TextStyle, View, ViewStyle} from 'react-native';
  import {ComponentType} from 'react';

  interface DMProps {
    showMultipleAsBadge: boolean;
    data: ItemProps[];
    badgeBackgroundColor: string[];
    onSelected: (item: string[]) => void;
    mode?: mode
  }

  type mode = 'MODAL' | 'UNDERLAY';

  interface DMStyleProps {
    DropDownContainerStyle?: ViewStyle
    DropdownListStyle?: ViewStyle;
    ListStyle?: ViewStyle
    ListItemStyle?: ViewStyle;
    ListLabelStyle?: TextStyle;
    markedIconStyle?: TextStyle;
    selectedItemBadgeStyle?: ViewStyle;
    selectedItemBadgeLabelStyle?: TextStyle;
    selectedItemBadgeCloseIconStyle?: TextStyle;
    selectedtextStyle?: TextStyle;
    scrollable?: boolean;
    searchable?: boolean;
    listItemLeftIconComp?: JSX.Element | undefined;
    ListItemSelectedIconComp?: JSX.Element | undefined;
    sublistItemLeftIconComp?: JSX.Element | undefined;
    dropdownIndicator?: 'arrow' | 'plus';
    placeholder?: string
    HideSelectionTextStyle?: ViewStyle
  }

  export interface ItemProps {
    label: string;
    value: string | ItemProps[];
  }

  interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
  }

  interface ListItemStyleProps {
    style?: ViewStyle;
    root?: number | undefined;
    level?: string;
  }

  interface DAprops {
    radius: number;
    borderless: boolean;
  }
  export interface SBprops {
    data: ItemProps[];
    setfilteredData: React.Dispatch<
      React.SetStateAction<ItemProps[] | undefined>
    >;
  }

  export type ListItemProps = ItemProps & ListItemStyleProps;
  export type DPMProps = DMProps & DAprops & DMStyleProps;

  const DComProps: ComponentType<DPMProps>;
  export default DComProps;
}
