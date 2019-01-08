import React from 'react';
import lodash from 'lodash';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// Components
import UserSelectListV from '../components/UserSelectListV';
import UserSelectListH from '../components/UserSelectListH';

// Dummy data
import DUMMY_USERS from '../dummy/DummyUsersList';
const items = lodash.clone(DUMMY_USERS),
  selectedItems = lodash.sampleSize(items, 0),
  selectedItemsIds = [];
selectedItems.map((selectedItem) => selectedItemsIds.push(selectedItem.id));

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);

    this._onSelect = this._onSelect.bind(this);

    this.state = {
      items,
      selectedItems,
      selectedItemsIds
    };
  }

  _onSelect({ item, selectedItemsIds}) {
    const selectedItems = lodash.clone(this.state.selectedItems);

    if (lodash.find(selectedItems, item)) {
      lodash.remove(selectedItems, item);
    } else {
      selectedItems.push(item);
    }

    this.setState({ selectedItems, selectedItemsIds });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.containerView}>
        <UserSelectListH
          items={ this.state.selectedItems }
          selectedItemsIds={ this.state.selectedItemsIds }
          onSelect={this._onSelect}/>
        <Text style={styles.rowHeadingText}>Users</Text>
        <UserSelectListV
          items={ this.state.items }
          selectedItemsIds={ this.state.selectedItemsIds }
          onSelect={this._onSelect}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column'
  },
  rowHeadingText: {
    backgroundColor: '#eee',
    padding: 5,
    fontSize: 15
  }
});
