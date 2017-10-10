import React from 'react';
import { Icon } from 'react-native-elements';

export const HomeIcon = ({ tintColor }) => {
  return <Icon type="simple-line-icon" name="home" color={tintColor} size={21} />
};

export const StoryIcon = ({ tintColor }) => {
  return <Icon type="simple-line-icon" name="plus" color={tintColor} size={21} />
};

export const ProfileIcon = ({ tintColor }) => {
  return <Icon type="simple-line-icon" name="user" color={tintColor} size={21} />
};

// export const MapIcon = () => {
//   return <Icon type="simple-line-icon" name="map" size={23} color="grey" style={{ marginRight: 14 }} />
// };
//
// export const SettingIcon = () => {
//   return <Icon type='simple-line-icon' name="settings" size={23} color="grey" style={{ marginRight: 7 }} />
// };
//
// export const CalendarIcon = () => {
//   return <Icon type='simple-line-icon' name="calendar" size={15} color="grey" style={{ marginRight: 5 }} />
// };
//
// export const LocationIcon = () => {
//   return <Icon type='simple-line-icon' name="location-pin" size={15} color="grey" style={{ marginRight: 5}}/>
// };
