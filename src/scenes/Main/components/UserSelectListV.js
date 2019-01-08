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
  ListItem,
  Avatar
} from 'react-native-elements';
import PropTypes from 'prop-types';

class UserSelectListV extends React.Component {
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
      <ListItem
        onPress={() => this._handleOnPress(item)}
        title={
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{item.first_name + ' ' + item.last_name}</Text>
          </View>
        }
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.subtitleText}>{item.username}</Text>
          </View>
        }
        avatar={
          <Avatar
            rounded
            source={item.avatar_url && {uri: item.avatar_url}}
            title={item.first_name[0]}
          />
        }
        rightIcon={{
          style: this._isSelected(item.id) ? styles.rightIconChecked : styles.rightIconUnchecked,
          name: 'check-circle'
        }}
      />
    );
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <List>
        <FlatList
          containerStyle={styles.containerList}
          data={this.props.items}
          extraData={this.state}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  containerList: {
    padding: 0,
    margin: 0
  },
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
  },
  rightIconUnchecked: {
    color: 'lightgrey'
  },
  rightIconChecked: {
    color: 'green'
  }
});

export default UserSelectListV;
