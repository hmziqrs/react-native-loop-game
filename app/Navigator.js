import { createAppContainer } from 'react-navigation';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import routes from './routes';

const Navigator = createNativeStackNavigator(
  {
    home: routes.home,
    level: routes.level,
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
  },
);

export default createAppContainer(Navigator);
