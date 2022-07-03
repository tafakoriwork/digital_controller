/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {NativeModules} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faGasPump,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';

const Main = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const requestCameraPermission = async () => {
    console.log('runm');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Cool Photo Main Camera Permission',
          message:
            'Cool Photo Main needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NativeModules.TAFAKORISMS.sendMsg(
          '09357578808',
          "I'm the best developer ever",
          (err, name) => {
            console.log(err, name);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = value;
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>
      <Navbar />
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 25,
        }}>
        <View style={styles.containerBox}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={getData}
              style={[styles.buttonSwitch, {backgroundColor: '#2AB461'}]}>
              <FontAwesomeIcon icon={faPowerOff} size={60} color={'#eee'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => storeData('HELLO')}
              style={{
                marginVertical: 5,
              }}>
              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                روشن
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={[styles.buttonSwitch, {backgroundColor: '#B42A33'}]}>
              <FontAwesomeIcon icon={faPowerOff} size={60} color={'#eee'} />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Devices')}
              style={{
                marginVertical: 5,
              }}>
              <Text style={{fontFamily: 'Vazir-Medium', fontSize: 16}}>
                خاموش
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerButtonsColumn}>
          <View style={styles.containerButtonsRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>بررسی شارژ</Text>
            </TouchableOpacity>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>شارژ</Text>
            </View>
          </View>

          <View style={styles.containerButtonsRow}>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>sdsad</Text>
            </View>
            <View style={styles.containerButtonsBtnContainer}>
              <View style={styles.containerButtonsBtn}>
                <FontAwesomeIcon icon={faGasPump} size={26} color={'#2AB461'} />
              </View>
              <Text style={styles.text}>تست</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Vazir-Light', fontSize: 16},
  textBold: {fontFamily: 'Vazir-Medium', fontSize: 16},
  containerButtonsBtnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButtonsBtn: {
    borderWidth: 2,
    borderColor: '#2AB461',
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  containerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  containerButtonsColumn: {
    flexDirection: 'column',
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    flex: 3,
  },
  containerBox: {
    backgroundColor: '#eee',
    height: 150,
    marginHorizontal: 25,
    marginTop: 25,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    fontFamily: 'Vazir-Light',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSwitch: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#eee',
  },
});

export default Main;
