import { createAppContainer } from 'react-navigation';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import routes from './routes';

const Navigator = createNativeStackNavigator(routes, {
  headerMode: 'none',
  initialRouteName: 'home',
});

export default createAppContainer(Navigator);
