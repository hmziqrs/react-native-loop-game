import { createAppContainer } from 'react-navigation';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import routes from './routes';

const Navigator = createNativeStackNavigator(routes, {
  initialRouteName: 'home',
  headerMode: 'none',
});

export default createAppContainer(Navigator);
