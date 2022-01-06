# react-native-dropdown-menu

Seacrchable and fully customizable Muti-purpose dropdown menu for react native 

<p float="left">
    <img src="https://github.com/faccon/react-native-dropdown-listpicker/raw/publish/src/vid1.gif" width="270" alt="Screenshot">
    <img src="https://github.com/faccon/react-native-dropdown-listpicker/raw/publish/src/vid2.gif" width="270" alt="Screenshot">
</p>


## Install package

```
npm i react-native-dropdown-listpicker
```


### Import Component

import DropdownMenu from 'react-native-dropdown-menu';


## Example

This component can be used as it is without any customization, just import and use

clone [Example](https://github.com/faccon/react-native-dropdown-listpicker/tree/publish/examples/)


## Props

| Props                         	  | Type              		  	| Description   
| --------------------------------- | ------------------------- | --------------------------------------- |
| ItemProps			                    | { label: string; value: string / ItemProps[] } | Display item as badge with scroll       |
| showMultipleAsBadge			          | boolean   			          | Display item as badge with scroll       |
| data          			              | ItemProps[] 		          | List data (support only upto 1 sub-level) | 
| mode?			                        | string                		| 'MODAL' | 'UNDERLAY'                    |
| badgeBackgroundColor?		          | string[]				          | color for badges                        |
| DropDownContainerStyle?	          | ViewStyle				          | Picker container style 	                |
| DropdownListStyle?			          | ViewStyle				          | drop down List container style          |
| ListStyle?	                      | ViewStyle				          | List container style 	                |
| ListLabelStyle?			              | TextStyle				          | List text style                         | 
| markedIconStyle?			            | TextStyle / ViewStyle  		| style for marked icon                   |
| selectedItemBadgeStyle?		        | ViewStyle				          | Badge style                             |
| selectedItemBadgeLabelStyle?		  | TextStyle	       		      | Badge item text style                   |
| selectedItemBadgeCloseIconStyle?	| TextStyle / ViewStyle			| Badge close icon text style             |
| selectedtextStyle			            | TextStyle			          	| style for selected text                 |
| scrollable?				                | boolean				            | enable/disbale scroll                   |
| searchable?				                | boolean				            | enable/disable search bar               |
| listItemLeftIconComp?			        | JSX.Element / undefined		| List left icon                          |             
| ListItemSelectedIconComp?	      	| JSX.Element / undefined		| checked icon for list item              |
| sublistItemLeftIconComp?		      | JSX.Element / undefined		| List left icon for sublist              |
| dropdownIndicator?			          | string				            | 'arrow' / 'plus'                        |
| onSelected			                  | (item: string[]) => void  | 'arrow' / 'plus'                        |
| placeholder?			                | string				            | placeholder for picker                  |
| HideSelectionTextStyle?			      | TextStyle				          | Hide selection button label style       |

## For Pull Issues
https://github.com/faccon/react-native-dropdown-listpicker/issues
