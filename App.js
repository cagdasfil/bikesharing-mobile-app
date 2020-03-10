import React from 'react';
import { Platform } from 'react-native';
import { Constants, Permissions, Notifications } from 'expo';
import Screen from './navigation/Screen';

export default class App extends React.Component {

  componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reminders', {
        name: 'Reminders',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }
  
  render() {
    return <Screen />;
  }
}