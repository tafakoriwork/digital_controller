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
import { I18nManager } from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {
  var date1 = new Date('July 21, 2022 01:30:00');
  var now = new Date();

  if (date1.getTime() < now.getTime()) {
    alert('نسخه دمو غیرفعال شد');
    return
  }
  const [pass, setPass] = useState(null);
  const [pass1, setPass1] = useState(null);
  
  const setPassApp = async value => {
    try {
      await AsyncStorage.setItem('@pass', value);
    } catch (e) {}
  };

  const getPassApp = async () => {
    try {
      const value = await AsyncStorage.getItem('@pass');
      if (!value) {
        setPassApp('1234');
        setPass1('1234');
        globals.password2 = '1234'
      } else setPass1(value);
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
    try { 
      I18nManager.allowRTL(false);
  } 
  catch (e) {
      console.log(e);
  }
    if (pass1 == null) {
      getSim();
      getPassApp();
    } globals.password2 = pass1;
  }, [pass, pass1]);

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
