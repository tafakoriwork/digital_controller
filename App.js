import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './ios/components/Main';
import Setting from './ios/components/Setting';
import Devices from './ios/components/Devices';
import AddDevice from './ios/components/addDevice';
import Locker from './ios/components/Locker';
import AboutUs from './ios/components/aboutUs';
import EditDevice from './ios/components/editDevice';
import {useEffect, useState} from 'react';
import globals from './ios/components/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  var date1 = new Date('July 11, 2022 01:30:00');
  var now = new Date();

  if (date1.getTime() < now.getTime()) {
    alert('نسخه دمو غیرفعال شد');
  }
  const [pass, setPass] = useState(null);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@pass', value);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@pass');
      if (!value) {
        storeData('1234');
        setPass('1234');
      } else setPass(value);
    } catch (e) {
      console.log(e);
    }
  };

  const getSim = async () => {
    try {
      const value = await AsyncStorage.getItem('@sim');
      if (value) globals.sim = Number(value);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (pass == null) {
      getData();
      getSim();
    } globals.password1 = pass;
  }, [pass]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {globals.isOpen ? (
          <>
            <Stack.Screen name="Devices" component={Devices} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="addDevice" component={AddDevice} />
            <Stack.Screen name="editDevice" component={EditDevice} />
            <Stack.Screen name="Locker" component={Locker} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Setting" component={Setting} />
          </>
        ) : (
          <>
            <Stack.Screen name="Locker" component={Locker} />
            <Stack.Screen name="Devices" component={Devices} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="addDevice" component={AddDevice} />
            <Stack.Screen name="editDevice" component={EditDevice} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Setting" component={Setting} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
