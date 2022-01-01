declare module 'rn-dropdown-picker' {
  import {TextStyle, ViewStyle} from 'react-native';

  interface DMProps {
    showMultipleAsBadge: boolean;
    data: ItemProps[];
    badgeBackgroundColor: string[];
    onSelected: (item: string[]) => void;
    mode?: mode;
  }

  type mode = 'MODAL' | 'UNDERLAY';

  interface DMStyleProps {
    DropdownListStyle?: ViewStyle;
    ListItemStyle?: ViewStyle;
    ListLabelStyle?: TextStyle;
    markedIconStyle?: TextStyle;
    selectedItemBadgeStyle?: ViewStyle;
    selectedItemBadgeLabelStyle?: TextStyle;
    selectedItemBadgeCloseIconStyle?: TextStyle;
    selectedtextStyle?: TextStyle;
  }

  interface ItemProps {
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
  }

  type ListItemProps = ItemProps & ListItemStyleProps;

  interface DAprops {
    radius: number;
    borderless: boolean;
  }

  type DPMProps = DMProps & DAprops & DMStyleProps;
}
