import React from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {NativeModules} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEdit,
  faTrash,
  faPlus,
  faMapPin,
  faSimCard,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';

const AddDevice = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const requestCameraPermission = async () => {
    console.log('runm');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Cool Photo AddDevice Camera Permission',
          message:
            'Cool Photo AddDevice needs access to your camera ' +
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
            <Text style={styles.text}>مشخصات دستگاه</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#aaa8',
            marginTop: 22,
            marginHorizontal: 25,
          }}></View>
        <View style={styles.AddDevice}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={"محل نصب دستگاه"}/>
            <FontAwesomeIcon icon={faMapPin} size={20} color={"#AFC3D3"}  style={{position: 'absolute', top: 15, left: 20,}}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={"شماره سیم کارت دستگاه"}/>
            <FontAwesomeIcon icon={faSimCard} size={18} color={"#AFC3D3"}  style={{position: 'absolute', top: 17, left: 20,}}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={"پسورد دستگاه"}/>
            <FontAwesomeIcon icon={faLock} size={18} color={"#AFC3D3"}  style={{position: 'absolute', top: 15, left: 20,}}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput multiline={true} style={[styles.input, {height: 200, textAlignVertical: 'top'}]} placeholder={"توضیحات دستگاه"} />
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row', justifyContent: 'space-between', backgroundColor: null}]}>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.textBold, {fontSize: 14,color: '#fff'}]}>ذخیره</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.navigate('Devices')}>
              <Text style={[styles.textBold, {fontSize: 14,color: '#fff'}]}>انصراف</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonCancel: {
    margin: 2,
    backgroundColor: '#ff6347',
    flex: 1,
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    borderWidth: 2,
    borderColor: '#ff555550'
  },
  button: {
    margin: 2,
    backgroundColor: '#3ACE78',
    flex: 1,
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    borderWidth: 2,
    borderColor: '#55ff5550'
  },
  text: {fontFamily: 'Vazir-Light', fontSize: 20},
  text2: {fontFamily: 'Vazir-Light', fontSize: 14},
  textBold: {fontFamily: 'Vazir-Medium', fontSize: 16},
  containerButtonsBtnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#dfdfdf90',
    borderRadius: 15,
    position: 'relative',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingStart:50,
    fontFamily: 'Vazir-Light',
    paddingEnd: 15,
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
  AddDevice: {
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

export default AddDevice;
