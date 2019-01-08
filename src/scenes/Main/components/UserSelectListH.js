import React from 'react';
import lodash from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  List,
  Avatar
} from 'react-native-elements';
import PropTypes from 'prop-types';

class UserSelectListH extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemsIds: PropTypes.array,
    onSelect: PropTypes.func
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      selectedItemsIds: nextProps.selectedItemsIds
    };
  }

  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this._handleOnPress = this._handleOnPress.bind(this);
    this._isSelected = this._isSelected.bind(this);

    this.state = {
      selectedItemsIds: []
    };
  }
  
  _handleOnPress(item) {
    const selectedItemsIds = lodash.clone(this.state.selectedItemsIds),
      itemId = item.id,
      itemIndex = selectedItemsIds.indexOf(itemId);

    if (this._isSelected(itemId)) {
      selectedItemsIds.splice(itemIndex, 1);
    } else {
      selectedItemsIds.push(itemId);
    }
    this.setState({ selectedItemsIds });

    if (this.props.onSelect) {
      this.props.onSelect( { item: item, selectedItemsIds });
    }
  }

  _keyExtractor = (item) => item.id;

  _isSelected = (itemId) => this.state.selectedItemsIds.indexOf(itemId) >= 0

  _renderRow({ item }) {
    return (
      <View
        style={styles.rowView}
        onPress={() => this._handleOnPress(item)}>
        <Avatar style={styles.avatar}
          rounded
          source={item.avatar_url && {uri: item.avatar_url}}
          title={item.first_name[0]}
        />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{item.first_name}</Text>
        </View>
      </View>
    );
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <List containerStyle={styles.containerList}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          data={this.props.items}
          extraData={this.state}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          horizontal={true}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  containerList: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 60
  },
  rowView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10
  },
  avatar: {
    paddingLeft: 0
  },
  titleView: {
    paddingLeft: 0,
    paddingTop: 5
  },
  titleText: {
    paddingLeft: 0
  }
});

export default UserSelectListH;
