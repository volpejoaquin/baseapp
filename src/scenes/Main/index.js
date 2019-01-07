import React, { PropTypes } from 'react';
import { createAppContainer } from 'react-navigation';

import MainNavigator from './navigation/MainNavigator';

const Main = createAppContainer(MainNavigator);

export default Main;
