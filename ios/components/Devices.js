import React, {useEffect} from 'react';
import {
  Dimensions,
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
  faEdit,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';

const Devices = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const requestCameraPermission = async () => {
    console.log('runm');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Cool Photo Devices Camera Permission',
          message:
            'Cool Photo Devices needs access to your camera ' +
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
            <Text style={styles.text}>افزودن دستگاه جدید</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#aaa8',
            marginTop: 22,
            marginHorizontal: 25,
          }}></View>
        <View style={styles.devices}>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceControlls}>
              <FontAwesomeIcon icon={faTrash} color={"#ff6347"}/>
              <FontAwesomeIcon icon={faEdit} color={"#78ceeb"}/>
            </View>
            <Text style={styles.text2}>تست</Text>
          </View>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceControlls}>
              <FontAwesomeIcon icon={faTrash} color={"#ff6347"}/>
              <FontAwesomeIcon icon={faEdit} color={"#78ceeb"}/>
            </View>
            <Text style={styles.text2}>asd</Text>
          </View>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceControlls}>
              <FontAwesomeIcon icon={faTrash} color={"#ff6347"}/>
              <FontAwesomeIcon icon={faEdit} color={"#78ceeb"}/>
            </View>
            <Text style={styles.text2}>asd</Text>
          </View>
         
        </View>
        <TouchableOpacity style={styles.newDevice} onPress={() => navigation.navigate('addDevice')}>
          <Text style={styles.text2}>
            افزودن دستگاه جدید
          </Text>
          <FontAwesomeIcon icon={faPlus} color={"#2AB461"}/>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Vazir-Light', fontSize: 20},
  text2: {fontFamily: 'Vazir-Light', fontSize: 14},
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
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#dfdfdf80',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  deviceControlls:{
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  devices: {
    flexDirection: 'column',
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    flex: 3,
  },
  containerBox: {
    backgroundColor: '#eee',
    maxHeight: 80,
    marginHorizontal: 50,
    marginTop: 25,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
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
  newDevice: {
    position: 'absolute',
    width: 160,
    height: 40,
    backgroundColor: '#efefef',
    borderWidth: 2,
    borderColor: '#2AB461',
    bottom: 40,
    left: Dimensions.get('window').width/2 - 80,
    borderRadius: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: '#aaa',
    alignItems: 'center',
    padding: 5,
  }
});

export default Devices;
