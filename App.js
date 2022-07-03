import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './ios/components/Main';
import Setting from './ios/components/Setting';
import Devices from './ios/components/Devices';
import AddDevice from './ios/components/addDevice';
import Locker from './ios/components/Locker';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={Devices}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Devices" component={Devices} />
        <Stack.Screen name="Profile" component={Setting} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="addDevice" component={AddDevice} />
        <Stack.Screen name="Locker" component={Locker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
