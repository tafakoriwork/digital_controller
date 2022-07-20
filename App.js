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
import Navbar from './ios/components/Navbar';
const Stack = createNativeStackNavigator();

const App = () => {
 
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
          headerRight: () => (<Navbar />)
          
        }}>
        {globals.isOpen ? (
          <>
            <Stack.Screen name="Devices" component={Devices} options={{title: 'دستگاه ها'}}/>
            <Stack.Screen name="Main" component={Main} options={{title: 'دزدگیر اماکن'}}/>
            <Stack.Screen name="addDevice" component={AddDevice} options={{title: 'افزودن دستگاه'}}/>
            <Stack.Screen name="editDevice" component={EditDevice} options={{title: 'ویرایش دستگاه'}}/>
            <Stack.Screen name="Locker" component={Locker} options={{headerShown: false}}/>
            <Stack.Screen name="AboutUs" component={AboutUs} options={{title: 'درباره ما'}}/>
            <Stack.Screen name="Setting" component={Setting} options={{title: 'تنظیمات'}}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Locker" component={Locker}  options={{headerShown: false}}/>
            <Stack.Screen name="Devices" component={Devices} options={{title: 'دستگاه ها'}}/>
            <Stack.Screen name="Main" component={Main} options={{title: 'دزدگیر اماکن'}}/>
            <Stack.Screen name="addDevice" component={AddDevice} options={{title: 'افزودن دستگاه'}}/>
            <Stack.Screen name="editDevice" component={EditDevice} options={{title: 'ویرایش دستگاه'}}/>
            <Stack.Screen name="AboutUs" component={AboutUs} options={{title: 'درباره ما'}}/>
            <Stack.Screen name="Setting" component={Setting} options={{title: 'تنظیمات'}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
