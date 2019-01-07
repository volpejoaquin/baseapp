import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class UserSelectList extends React.Component {
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <List>
        <ListItem
          roundAvatar
          title={
            <View style={styles.titleView}>
              <Text style={styles.titleText}>5 months ago</Text>
            </View>
          }
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.subtitleText}>5 months ago</Text>
            </View>
          }
          avatar={require('../../../../assets/images/avatar1.jpg')}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 5,
    paddingTop: 5
  },
  titleText: {
    paddingLeft: 5
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 5
  },
  subtitleText: {
    paddingLeft: 5,
    color: 'grey'
  }
});
