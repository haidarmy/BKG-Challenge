import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import RootStack from '@navigations/RootStack';
import store from '@redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
